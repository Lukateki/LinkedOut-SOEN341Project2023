from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions

from credentials.models import Candidate, CandidateConfig, Education, Employer, EmployerConfig, Experience
from .serializers import CandidateConfigSerializer, CandidateSerializer, EducationSerializer, EmployerConfigSerializer, EmployerSerializer, ExperienceSerializer, UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# Create your views here.
class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployerViewSet(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
    permission_classes = [permissions.IsAuthenticated]

class CandidateConfigViewSet(viewsets.ModelViewSet):
    queryset = CandidateConfig.objects.all()
    serializer_class = CandidateConfigSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployerConfigViewSet(viewsets.ModelViewSet):
    queryset = EmployerConfig.objects.all()
    serializer_class = EmployerConfigSerializer
    permission_classes = [permissions.IsAuthenticated]

class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

