import pytest
from LinkedOut.credentials.models import Recruiter
from LinkedOut.JobListings.models import Job as Job
from rest_framework.test import APIClient

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def recruiter():
    return Recruiter.objects.create(username='test recruiter',
                                    company='test company',
                                    about='test about',
                                    headquarters='test headquarters')

@pytest.fixture
def job1(recruiter):
    return Job.objects.create(title='Software Engineer',
                                recruiter = recruiter,
                                posting_url='test.com',
                                posting_date='2020-01-01',
                                expiry_date='2020-01-01',
                                city='test city',
                                job_type='test type',
                                description='Engineering machines to develop software')

@pytest.fixture
def job2(recruiter):
    return Job.objects.create(title='Machine Technician',
                                recruiter = recruiter,
                                posting_url='test2.com',
                                posting_date='2020-01-01',
                                expiry_date='2020-01-01',
                                city='test city',
                                job_type='test type',
                                description='Using Mechnanical Tools on Machines')
