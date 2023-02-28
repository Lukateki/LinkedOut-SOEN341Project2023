from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from JobListings.models import Job, Employer
from requests.auth import HTTPBasicAuth
from django.contrib.auth.models import User

from credentials.models import Applicant, Candidate

# Create your tests here.
class TestApplicant(APITestCase):
    base_url = reverse('applicant-list')

    def setUp(self):
        password = 'Password'

        user1 = User.objects.create_user(username='applicant1@linkedout.com', 
                                         email='applicant1@linkedout.com', 
                                         password=password,
                                         first_name='John',
                                         last_name='Doe')
        
        user2 = User.objects.create_user(username='applicant2@linkedout.com',
                                         email='applicant2@linkedout.com',
                                         password=password,
                                         first_name='Jane',
                                         last_name='Doe')
        
        # self.client.login(username=my_admin.username, password=password) # login authentication

        Applicant.objects.create(user_id=user1.id, reffered_pronouns = 'she/her', skills='Python', interests='Software Engineering')
        Applicant.objects.create(user_id=user2.id, reffered_pronouns = 'he/him', interests='Software Engineering')

    def test_get_a_candidate(self):
        url = self.base_url + '2/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['reffered_pronouns'], 'he/him')
        self.assertEqual(response.data['skills'], None)
        self.assertEqual(response.data['interests'], 'Software Engineering')
                         

    def test_get_all_candidates(self):
        url = self.base_url
        applicant_count = Applicant.objects.all().count()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), applicant_count)

    def test_create_candidate(self):
        url = self.base_url
        user_url = reverse('user-list')

        applicant_count = Applicant.objects.all().count() + 1
        applicant = {
            'skills': 'Java',}
        
        user = {"username": "applicant1@gmail.com",
        "password": "Password",
        "email": "applicant1@gmail.com",
        "first_name": "app",
        "last_name": "licant",}

        applicant = self.client.post(url, applicant)
        user = self.client.post(user_url, user)

        user_id = str(user.data['user_id'])
        applicant = self.client.patch(url + user_id + '/', {'id': user_id})

        print(applicant)

        self.assertEqual(user.status_code, status.HTTP_201_CREATED)
        self.assertEqual(applicant.status_code, status.HTTP_200_OK)
        self.assertEqual(Applicant.objects.count(), applicant_count)
        self.assertEqual(Applicant.objects.get(pk = applicant_count).skills, 'Java')
        self.assertEqual(Applicant.objects.get(pk = applicant_count).interests, None)
        