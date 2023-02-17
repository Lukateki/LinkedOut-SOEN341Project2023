from django.db import models


class Candidate(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
class Employer(models.Model):
    company = models.CharField(max_length=100)

    def __str__(self):
        return self.company
    

class CandidateConfig(models.Model):
    candidate = models.ForeignKey(Candidate, default=1, on_delete=models.CASCADE)
    preffered_pronouns = models.CharField(max_length=50, default="None")
    skills = models.CharField(max_length=1000)
    interests = models.CharField(max_length=1000)
    resume = models.BinaryField(max_length=None, null=True)#If there are errors uploading documents to this column, might need to set editable=True as a parameter
    current_employer = models.ForeignKey(Employer, default=-1, on_delete=models.CASCADE, null=True)


class Education(models.Model):
    candidate = models.ForeignKey(Candidate, default=1, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    minor = models.CharField(max_length=100, null=True)
    description = models.CharField
    skills = models.CharField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField(null=True)


class Experience(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.CharField
    skills = models.CharField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField(null=True)