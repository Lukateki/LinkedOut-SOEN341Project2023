from django.contrib.auth.models import User, Group
from rest_framework import serializers
from credentials.models import Applicant, Candidate, CandidateConfig, Education, Employer, EmployerConfig, Experience


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'
        
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class CandidateConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateConfig
        fields = '__all__'

class EmployerConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerConfig
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'