from django.db import models

# Create your models here.
class Job(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    posting_url = models.CharField(max_length=100)
    posting_date = models.DateField()
    expiry_date = models.DateField(null=True)
    city = models.CharField(max_length=100) # table for cities with province and country
    job_type = models.CharField(max_length=100)
    description = models.CharField(max_length=2560)

    def __str__(self):
        return self.title

