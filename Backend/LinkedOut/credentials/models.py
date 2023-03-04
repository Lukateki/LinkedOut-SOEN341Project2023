from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

class Applicant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, default="None")
    reffered_pronouns = models.CharField(max_length=50, default="None")
    skills = models.TextField(null=True)
    interests = models.TextField(null=True)
    resume = models.BinaryField(max_length=None, null=True)#If there are errors uploading documents to this column, might need to set editable=True as a parameter
    
    def __str__(self):
        return self.username

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, default="None")
    company = models.CharField(max_length=100)
    about = models.TextField(null=True)
    headquarters = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Education(models.Model):
    applicant = models.ForeignKey(Applicant, default=1, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    minor = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    skills = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.school

class Experience(models.Model):
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    # description = models.TextField()
    skills = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.company

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)