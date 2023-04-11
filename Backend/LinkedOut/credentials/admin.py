from django.contrib import admin
from .models import Applicant, Recruiter, Education, Experience
# Register your models here.
admin.site.register(Applicant)
admin.site.register(Recruiter)
admin.site.register(Education)
admin.site.register(Experience)
