from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response 

from LinkedOut.credentials.models import Applicant, Education, Experience, Recruiter
from LinkedOut.JobListings.models import Job
from .serializers import ApplicantSerializer, EducationSerializer, ExperienceSerializer, RecruiterSerializer, UserSerializer, GroupSerializer


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
