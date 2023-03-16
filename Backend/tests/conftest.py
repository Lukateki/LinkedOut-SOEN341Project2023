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
def job(recruiter):
    return Job.objects.create(title='test position',
                                recruiter = recruiter,
                                posting_url='test.com',
                                posting_date='2020-01-01',
                                expiry_date='2020-01-01',
                                city='test city',
                                job_type='test type',
                                description='test description')

@pytest.fixture
def job2(recruiter):
    return Job.objects.create(title='test position 2',
                                recruiter = recruiter,
                                posting_url='test2.com',
                                posting_date='2020-01-01',
                                expiry_date='2020-01-01',
                                city='test city',
                                job_type='test type',
                                description='test description')
