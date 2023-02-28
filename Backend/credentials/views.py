from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.response import Response

from credentials.models import Applicant, Candidate, CandidateConfig, Education, Employer, EmployerConfig, Experience, Recruiter
from .serializers import ApplicantSerializer, CandidateConfigSerializer, CandidateSerializer, EducationSerializer, EmployerConfigSerializer,\
      EmployerSerializer, ExperienceSerializer, RecruiterSerializer, UserSerializer, GroupSerializer


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
            return Response(data={'user_id': user.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    
class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CandidateConfigViewSet(viewsets.ModelViewSet):
    queryset = CandidateConfig.objects.all()
    serializer_class = CandidateConfigSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EmployerConfigViewSet(viewsets.ModelViewSet):
    queryset = EmployerConfig.objects.all()
    serializer_class = EmployerConfigSerializer
    # permission_classes = [permissions.IsAuthenticated]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    # permission_classes = [permissions.IsAuthenticated]

 