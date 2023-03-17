from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request

from LinkedOut.credentials.models import Applicant, Education, Experience, Recruiter
from .serializers import ApplicantSerializer, EducationSerializer, ExperienceSerializer, RecruiterSerializer, UserSerializer, GroupSerializer

from email.message import EmailMessage
import ssl
import smtplib
import re


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
 