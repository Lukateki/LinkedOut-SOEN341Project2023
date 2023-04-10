from rest_framework import serializers
from LinkedOut.credentials.serializers import RecruiterSerializer
from .models import Job, Application

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class JobFetcherSerializer(serializers.ModelSerializer):
    recruiter = RecruiterSerializer()
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'