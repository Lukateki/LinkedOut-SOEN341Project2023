from django.db import models

from LinkedOut.credentials.models import Recruiter, Applicant
from datetime import datetime

# Create your models here.
class Job(models.Model):
    title = models.CharField(max_length=100)
    recruiter = models.ForeignKey(Recruiter, default=1, on_delete=models.CASCADE)
    posting_url = models.TextField()
    posting_date = models.DateField()
    expiry_date = models.DateField(null=True)
    city = models.CharField(max_length=100) # table for cities with province and country
    job_type = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    application_date = models.DateField(default=datetime.now().date().__str__())
    application_accepted = models.BooleanField(null=True, default=None)
