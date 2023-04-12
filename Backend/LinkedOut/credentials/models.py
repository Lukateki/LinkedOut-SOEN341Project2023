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
    interests = models.TextField(default="", blank=True)
    resume = models.BinaryField(max_length=None, null=True)#If there are errors uploading documents to this column, might need to set editable=True as a parameter
    description = models.TextField(default="", blank=True)
    
    def __str__(self):
        return self.username
    
    def as_dict(self):
        return {
            "applicant_id": self.id,
            "user_id": self.user.id,
            "username": self.username,
            "reffered_pronouns": self.reffered_pronouns,
            "skills": self.skills,
            "interests": self.interests,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "email": self.user.email,
            "description": self.description,
        }

class Recruiter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=100, default="None")
    company = models.CharField(max_length=100)
    about = models.TextField(null=True)
    headquarters = models.CharField(max_length=100)
    established = models.CharField(max_length=100, null=True)
    award_one = models.CharField(max_length=100, null=True)
    award_two = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.username
    
    def as_dict(self):
        return {
            "recruiter_id": self.id,
            "user_id": self.user.id,
            "username": self.username,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "email": self.user.email,
            "company": self.company,
            "about": self.about,
            "headquarters": self.headquarters,  
            "established": self.established,
            "award_one": self.award_one,
            "award_two": self.award_two,
        }

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
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    description = models.TextField(default="", blank=True)
    skills = models.TextField(default="", blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.company

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)