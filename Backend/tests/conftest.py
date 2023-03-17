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
import pytest

from django.contrib.auth.models import User

@pytest.fixture()
def user_1(db):
    user = User.objects.create_user("test-user")
    return user

@pytest.fixture
def new_user_factory(db):
    def create_app_user(
        username: str,
        password: str = None,
        first_name: str = "firstname",
        last_name: str = "lastname",
        email: str = "test@test.com",
        is_staff: bool = False,
        is_superuser: bool = False,
        is_active: bool = True,
    ):
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
        )
        return user
    return create_app_user

@pytest.fixture
def new_user(db, new_user_factory):
    return new_user_factory("Test_user", "password", "MyName")