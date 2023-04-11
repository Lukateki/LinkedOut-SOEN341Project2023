from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .models import Job
from LinkedOut.credentials.models import Recruiter
from LinkedOut.credentials.serializers import RecruiterSerializer
from .serializers import JobSerializer, JobFetcherSerializer
from django.http import JsonResponse
from rest_framework.response import Response
import datetime

# Create your views here.
class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True)
    def get_job_recruiter(self, request, *args, **kwargs):
        target_job_id = request.query_params["job_id"]
        job = Job.objects.filter(id=target_job_id).first()
        response_data = None
        if job != None:
            recruiter = Recruiter.objects.filter(id=job.recruiter_id).first()
            serializer = RecruiterSerializer(recruiter)
            response_data = serializer.data
        return Response(data=response_data, status=200)

    def get_queryset(self):
        search_text = self.request.query_params.get("search")
        if search_text:
            keywords = search_text.split()
            #retrieving all entries containing the keywords
            entries = list()
            for keyword in keywords:
                titles = list(Job.objects.filter(title__contains= keyword).values())
                descriptions = list(Job.objects.filter(description__contains= keyword).values())
                entries += titles
                entries += descriptions
            
            #adding a search score with the entry in a tuple
            valid_entries = list()
            for entry in entries:
                search_points = 0
                for keyword in keywords:
                    if keyword.lower() in entry['title'].lower():
                        search_points += 2
                    if keyword.lower() in entry['description'].lower():
                        search_points += 1
                    valid_entries.append((search_points, entry))

            #sort the entries by their score in descending order
            valid_entries = sorted(valid_entries, key=lambda x : x[0], reverse=True)
            #put only the entries into a list
            sorted_entries = list()
            used_ids = []

            for entry in valid_entries:
                if entry[1]['id'] in used_ids:
                    continue
                used_ids.append(entry[1]['id'])
                sorted_entries.append(entry[1])
            
            #creating a list of Job instances using the sorted_entries values
            model_entries = list()
            for entry in sorted_entries:
                model_entries.append(Job(**entry))

            return model_entries
        
        #default return if search is empty or if search is not specified
        return Job.objects.all()

    @action(detail=True)
    def get_all_jobs(self, request, *args, **kwargs):
        jobs_queryset = Job.objects.filter(expiry_date__gte=datetime.date.today()).order_by("expiry_date")
        json_data = JobFetcherSerializer(jobs_queryset, many=True)
        return Response(data=json_data.data, status=200)