from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import action, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response 
from rest_framework.request import Request
from rest_framework.decorators import action, permission_classes
from rest_framework.authtoken.models import Token
from LinkedOut.JobListings.models import Job

from LinkedOut.credentials.models import Applicant, Education, Experience, Recruiter
from LinkedOut.JobListings.models import Application, Job
from .serializers import ApplicantSerializer, EducationSerializer, ExperienceSerializer, RecruiterSerializer, UserSerializer, GroupSerializer
from LinkedOut.JobListings.serializers import ApplicationSerializer, JobSerializer
from email.message import EmailMessage
import ssl
import smtplib
import re
import json


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
        
    def create(self, request, *args, **kwargs):
        username = request.data['email']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name, email=email)        
            return Response(data={'user_id': user.id}, status=201)
        else:
            return Response(data=serializer.errors, status=400)
        
    @action(detail=True)
    def retrieve_session_user(self, request, *args, **kwargs):
        header_auth_token = request.headers["authorization"];
        if header_auth_token != None:
            response_data = None;
            token = header_auth_token[7:];
            target_token_obj = Token.objects.filter(key=token).first()
            if target_token_obj != None:
                target_applicant = Applicant.objects.filter(user_id=target_token_obj.user.id).first();
                target_recruiter = Recruiter.objects.filter(user_id=target_token_obj.user.id).first();
                if target_applicant != None:
                    response_data = target_applicant.as_dict();
                    response_data["isApplicant"] = True;
                    response_data["isRecruiter"] = False;
                elif target_recruiter != None:
                    response_data = target_recruiter.as_dict();
                    response_data["isRecruiter"] = True;
                    response_data["isApplicant"] = False;
                    response_data["associated_jobs"] = Job.objects.filter(recruiter_id=response_data["recruiter_id"]).values("id");
                return Response(data=response_data, status=200);
        return Response(data={"status":"No Session User found"}, status=404)

    @action(detail=True)
    def retrieve_session_user(self, request, *args, **kwargs):
        header_auth_token = request.headers["authorization"];
        if header_auth_token != None:
            response_data = None;
            token = header_auth_token[7:];
            target_token_obj = Token.objects.filter(key=token).first()
            if target_token_obj != None:
                target_applicant = Applicant.objects.filter(user_id=target_token_obj.user.id).first();
                target_recruiter = Recruiter.objects.filter(user_id=target_token_obj.user.id).first();
                if target_applicant != None:
                    response_data = target_applicant.as_dict();
                    response_data["isApplicant"] = True;
                    response_data["isRecruiter"] = False;
                elif target_recruiter != None:
                    response_data = target_recruiter.as_dict();
                    response_data["isRecruiter"] = True;
                    response_data["isApplicant"] = False;
                    response_data["associated_jobs"] = Job.objects.filter(recruiter_id=response_data["recruiter_id"]).values("id");
                return Response(data=response_data, status=200);
        return Response(data={"status":"No Session User found"}, status=404)
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

# Create your views here.
class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
   
    @action(detail=True) # Applicant -> Experiences
    def get_experiences(self, request, *args, **kwargs):
        target_applicant_id = request.query_params['applicant_id']
        experience_id = Experience.objects.filter(applicant_id=target_applicant_id).values_list('id', flat=True)
        experiences = Experience.objects.filter(id__in=experience_id).order_by('-end_date')
        
        json_experiences = []
        for experience in experiences:
            json_experiences.append(ExperienceSerializer(experience).data)
        return Response(data=json_experiences, status=200)
    
    @action(detail=True) # Applicant -> Educations
    def get_educations(self, request, *args, **kwargs):
        target_applicant_id = request.query_params['applicant_id']
        education_id = Education.objects.filter(applicant_id=target_applicant_id).values_list('id', flat=True)
        educations = Education.objects.filter(id__in=education_id).order_by('-end_date')
        
        json_education = []
        for education in educations:
            json_education.append(EducationSerializer(education).data)
        return Response(data=json_education, status=200)
        
class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer

    @action(detail=True)
    def get_jobs(self, request, *args, **kwargs):
        target_recruiter_id = request.query_params['recruiter_id']
        job_id = Job.objects.filter(recruiter_id=target_recruiter_id).values_list('id', flat=True)
        jobs = Job.objects.filter(id__in=job_id).order_by('-posting_date')
        
        json_jobs = []
        for job in jobs:
            json_jobs.append(JobSerializer(job).data)
        return Response(data=json_jobs, status=200)

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ApplicationsViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    @action(detail=True) # Job -> Applicant
    def get_applicants(self, request, *args, **kwargs):
        target_job_id = request.query_params['job_id']
        applicants_id = Application.objects.filter(job_id=target_job_id).values_list('applicant_id', flat=True)
        applicants_dates = Application.objects.filter(job_id=target_job_id).values_list('application_date', flat=True)
        applicants_accepted = Application.objects.filter(job_id=target_job_id).values_list('application_accepted', flat=True)
        applicants_application_ids = Application.objects.filter(job_id=target_job_id).values_list('application_id', flat=True)
        applicants = Applicant.objects.filter(id__in=applicants_id)
        json_applicants = []
        i = 0;
        for applicant in applicants:
            applicant_dict = applicant.as_dict();
            applicant_dict['application_date'] = applicants_dates[i]
            applicant_dict['application_accepted'] = applicants_accepted[i]
            applicant_dict['application_id'] = applicants_application_ids[i]
            json_applicants.append(applicant_dict)
            i += 1
        return Response(data=json_applicants, status=200)
    
    @action(detail=True)
    def has_applied(self, request, *args, **kwargs):
        target_job_id = request.query_params['job_id'];
        applicant_id = request.query_params['applicant_id'];
        application = Application.objects.filter(job_id=target_job_id, applicant_id=applicant_id).first();
        if application == None:
            return Response(data={ "hasApplied": False }, status=200);
        return Response(data={ "hasApplied": True }, status=200);

class SendEmailView(APIView):

    def get(self, request: Request):
        email_regex = re.compile(r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+")
        query_params = request.query_params

        if not query_params['firstname']:
            return Response({"status":"Missing first name!"})
        first_name = query_params['firstname']
        
        if not query_params['lastname']:
            return Response({"status":"Missing last name!"})
        last_name = query_params['lastname']
        
        if not query_params['company']:
            return Response({"status": "Missing company name!"})
        company = query_params['company']

        if not query_params['subject']:
            return Response({"status": "Missing subject!"})
        subject = query_params['subject']

        if not query_params['message']:
            return Response({"status": "Missing Message!"})
        message = query_params['message']

        recipient = query_params['email']
        if re.fullmatch(email_regex, recipient):
            sender = 'linkedoutnotifications'
            password = 'lkcpvpfjtfwvnuwp'

            email = EmailMessage()
            email['From'] = sender
            email['To'] = recipient
            email['Subject'] = subject

            #       Allowing frontend to use these keywords to fetch the real value in their message query parameter
            #       ex:    Hello {firstname} {lastname}, You got a job!
            #       If the firstname and last name given was Jerry Smith, this would evaluate to:
            #       Hello Jerry Smith, You got a job!

            message = message.replace("{firstname}", first_name)
            message = message.replace("{lastname}", last_name)
            message = message.replace("{company}", company)
            message = message.replace("{subject}", subject)
            message = message.replace("{email}", recipient)

            email.set_content(message)

            context = ssl.create_default_context()

            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context= context) as smtp:
                smtp.login(sender, password)
                smtp.sendmail(sender, recipient, email.as_string())
            return Response({"status":"Successfully sent email!"})
        
        else:
            return Response({"status":"Recipient's email address does not have a valid email structure, or was not provided"})
        