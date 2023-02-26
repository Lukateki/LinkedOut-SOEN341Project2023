from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from JobListings.models import Job, Employer
from requests.auth import HTTPBasicAuth
from django.contrib.auth.models import User

from credentials.models import Candidate

# Create your tests here.
class TestCandidate(APITestCase):
    base_url = reverse('candidate-list')

    def setUp(self):
        password = 'Password'
        my_admin = User.objects.create_superuser('admin', 'admin@linkedout.com', password)
        self.client.login(username=my_admin.username, password=password) # login authentication

        Candidate.objects.create(first_name = "John", last_name = "Doe")
        Candidate.objects.create(first_name = "Larry", last_name = "Page")

    def test_get_a_candidate(self):
        url = self.base_url + '1/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'John')
        self.assertEqual(response.data['last_name'], 'Doe')

    def test_get_all_candidates(self):
        url = self.base_url
        candidate_count = Candidate.objects.all().count()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), candidate_count)

    def test_post_candidate(self):
        url = self.base_url
        candidate_count = Candidate.objects.all().count() + 1
        data = {
            'first_name': 'John',
            'last_name': 'Doe',}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Candidate.objects.count(), candidate_count)
        self.assertEqual(Candidate.objects.get(pk = candidate_count).first_name, 'John')
        self.assertEqual(Candidate.objects.get(pk = candidate_count).last_name, 'Doe')
        