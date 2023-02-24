# Create your tests here.
'''
Create a set of tests for a REST API endpoints for a job listing app at 127.0.0.1:8000/api/v1/jobs/
'''
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from JobListings.models import Job, Employer
from requests.auth import HTTPBasicAuth
from django.contrib.auth.models import User

class TestJob(APITestCase):
    base_url = reverse('job-list')

    def setUp(self):
        password = 'Password'
        my_admin = User.objects.create_superuser('admin', 'admin@linkedout.com', password)
        self.client.login(username=my_admin.username, password=password) # login authentication

        Employer.objects.create(company = "Google",)
        Job.objects.create(title = "Software Developer",
                            posting_url = "https://www.google.com/SWE",
                            posting_date = "2020-05-01",
                            city = "Toronto",
                            job_type = "Full Time",
                            employer_id = 1,
                            description = "This is a description")
        Job.objects.create(title = "UX Designer",
                            posting_url = "https://www.google.com/UXD",
                            posting_date = "2020-05-05",
                            city = "Toronto",
                            job_type = "Part Time",
                            employer_id = 1,
                            description = "This is a description again")

    def test_get_job(self):
        """
        Ensure we can get a job object.
        """
        url = self.base_url
        url = url + '1/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Software Developer')

    def test_get_all_job(self):
        """
        Ensure we can get all job object.
        """
        url = self.base_url
        response = self.client.get(url, auth = HTTPBasicAuth('admin', 'Password'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Job.objects.count())
        self.assertEqual(response.data[1]['title'], 'UX Designer')

    def test_post_job(self):
        """
        Ensure we can post a new job object.
        """
        url = self.base_url
        data = {
            "title": "Product Manager",
            "employer_id": 1,
            "posting_url": "https://www.google.com",
            "posting_date": "2020-05-09",
            "city": "Ottawa",
            "job_type": "Full Time",
            "description": "This is a description now again"
        }
        jobs_num = Job.objects.all().count() + 1
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Job.objects.count(), jobs_num)
        self.assertEqual(Job.objects.get(pk=jobs_num).title, 'Product Manager')
