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
from LinkedOut.JobListings.serializers import ApplicationSerializer
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
        headerAuthToken = request.headers["authorization"];
        if headerAuthToken != None:
            responseData = None;
            token = headerAuthToken[7:];
            targetTokenObj = Token.objects.filter(key=token).first()
            if targetTokenObj != None:
                targetApplicant = Applicant.objects.filter(user_id=targetTokenObj.user.id).first();
                targetRecruiter = Recruiter.objects.filter(user_id=targetTokenObj.user.id).first();
                if targetApplicant != None:
                    responseData = targetApplicant.as_dict();
                    responseData["isApplicant"] = True;
                    responseData["isRecruiter"] = False;
                elif targetRecruiter != None:
                    responseData = targetRecruiter.as_dict();
                    responseData["isRecruiter"] = True;
                    responseData["isApplicant"] = False;
                    responseData["associated_jobs"] = Job.objects.filter(recruiter_id=responseData["recruiter_id"]).values("id");
                return Response(data=responseData, status=200);
        return Response(data={"status":"No Session User found"}, status=404)

    @action(detail=True)
    def retrieve_session_user(self, request, *args, **kwargs):
        headerAuthToken = request.headers["authorization"];
        if headerAuthToken != None:
            responseData = None;
            token = headerAuthToken[7:];
            targetTokenObj = Token.objects.filter(key=token).first()
            if targetTokenObj != None:
                targetApplicant = Applicant.objects.filter(user_id=targetTokenObj.user.id).first();
                targetRecruiter = Recruiter.objects.filter(user_id=targetTokenObj.user.id).first();
                if targetApplicant != None:
                    responseData = targetApplicant.as_dict();
                    responseData["isApplicant"] = True;
                    responseData["isRecruiter"] = False;
                elif targetRecruiter != None:
                    responseData = targetRecruiter.as_dict();
                    responseData["isRecruiter"] = True;
                    responseData["isApplicant"] = False;
                    responseData["associated_jobs"] = Job.objects.filter(recruiter_id=responseData["recruiter_id"]).values("id");
                return Response(data=responseData, status=200);
        return Response(data={"status":"No Session User found"}, status=404)
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]

# Create your views here.
class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    # permission_classes = [permissions.IsAuthenticated]
   
    @action(detail=True) # Applicant -> Experiences
    def get_experiences(self, request, *args, **kwargs):
        target_applicant_id = request.query_params['applicant_id']
        experience_id = Experience.objects.filter(applicant_id=target_applicant_id).values_list('id', flat=True)
        experiences = Experience.objects.filter(id__in=experience_id)
        
        jsonExperiences = []
        for experience in experiences:
            jsonExperiences.append(ExperienceSerializer(experience).data)
        return Response(data=jsonExperiences, status=200)
        
class RecruiterViewSet(viewsets.ModelViewSet):
    queryset = Recruiter.objects.all()
    serializer_class = RecruiterSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ApplicationsViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=True) # Job -> Applicant
    def get_applicants(self, request, *args, **kwargs):
        target_job_id = request.query_params['job_id']
        applicants_id = Application.objects.filter(job_id=target_job_id).values_list('applicant_id', flat=True)
        applicants = Applicant.objects.filter(id__in=applicants_id)
        jsonApplicants = []
        for applicant in applicants:
            jsonApplicants.append(applicant.as_dict())
        return Response(data=jsonApplicants, status=200)

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

        recipient = query_params['email']
        if re.fullmatch(email_regex, recipient):
            sender = 'linkedoutnotifications'
            password = 'lkcpvpfjtfwvnuwp'

            email = EmailMessage()
            email['From'] = sender
            email['To'] = recipient
            email['Subject'] = "You got an Interview!"

            email.set_content(f"Hello {first_name} {last_name}\nYou got an interview from {company}! Head over to LinkedOut to respond!")

            context = ssl.create_default_context()

            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context= context) as smtp:
                smtp.login(sender, password)
                smtp.sendmail(sender, recipient, email.as_string())
            return Response({"status":"Successfully sent email!"})
        
        else:
            return Response({"status":"Recipient's email address does not have a valid email structure, or was not provided"})
 
