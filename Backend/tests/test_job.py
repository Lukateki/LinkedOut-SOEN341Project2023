from datetime import datetime
import pytest

from LinkedOut.JobListings.models import Job


class TestUserViewSet:

    endpoint = '/api/v1/jobs/'
    
    @pytest.mark.django_db
    def test_list(self, client, job1, job2):
        response = client.get(self.endpoint)
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert len(response_json) == Job.objects.count()

        assert response_json[0]['id'] == job1.id
        assert response_json[0]['title'] == job1.title
        assert response_json[0]['recruiter'] == job1.recruiter.id
        assert response_json[0]['posting_url'] == job1.posting_url
        assert response_json[0]['posting_date'] == job1.posting_date
        assert response_json[0]['expiry_date'] == job1.expiry_date
        assert response_json[0]['city'] == job1.city
        assert response_json[0]['job_type'] == job1.job_type
        assert response_json[0]['description'] == job1.description
        
        assert response_json[1]['id'] == job2.id
        assert response_json[1]['title'] == job2.title
        assert response_json[1]['recruiter'] == job2.recruiter.id
        assert response_json[1]['posting_url'] == job2.posting_url
        assert response_json[1]['posting_date'] == job2.posting_date
        assert response_json[1]['expiry_date'] == job2.expiry_date
        assert response_json[1]['city'] == job2.city
        assert response_json[1]['job_type'] == job2.job_type
        assert response_json[1]['description'] == job2.description

    @pytest.mark.django_db
    def test_retrieve(self, client, job1):
        response = client.get(self.endpoint + str(job1.id) + '/')
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert response_json['id'] == job1.id
        assert response_json['title'] == job1.title
        assert response_json['recruiter'] == job1.recruiter.id
        assert response_json['posting_url'] == job1.posting_url
        assert response_json['posting_date'] == job1.posting_date
        assert response_json['expiry_date'] == job1.expiry_date
        assert response_json['city'] == job1.city
        assert response_json['job_type'] == job1.job_type
        assert response_json['description'] == job1.description

    @pytest.mark.django_db
    def test_create(self, client, recruiter):
        data = {
            'title': 'Computer Job',
            'recruiter': recruiter.id,
            'posting_url': 'https://www.google.com',
            'posting_date': '2020-01-01',
            'expiry_date': '2020-01-02',
            'city': 'Test City',
            'job_type': 'Full Time',
            'description': 'Test Description'
        }

        response = client.post(self.endpoint, data=data)
        print(response.content)
        assert response.status_code == 201

        response_json = response.json()
        assert response_json != None

        assert response_json['title'] == data['title']
        assert response_json['recruiter'] == data['recruiter']
        assert response_json['posting_url'] == data['posting_url']
        assert response_json['posting_date'] == data['posting_date']
        assert response_json['expiry_date'] == data['expiry_date']
        assert response_json['city'] == data['city']
        assert response_json['job_type'] == data['job_type']
        assert response_json['description'] == data['description']

        assert Job.objects.count() == 1

        job = Job.objects.first()
        assert job.title == data['title']
        assert job.recruiter.id == data['recruiter']
        assert job.posting_url == data['posting_url']
        assert job.posting_date.strftime("%Y-%m-%d") == data['posting_date']
        assert job.expiry_date.strftime("%Y-%m-%d") == data['expiry_date']
        assert job.city == data['city']
        assert job.job_type == data['job_type']
        assert job.description == data['description']

    @pytest.mark.django_db
    def test_update(self, client, job1, recruiter):
        data = {
            'title': 'Test Job',
            'recruiter': recruiter.id,
            'posting_url': 'https://www.google.com',
            'posting_date': '2020-01-01',
            'expiry_date': '2020-01-02',
            'city': 'Test City',
            'job_type': 'Full Time',
            'description': 'Test Description'
        }

        response = client.put(self.endpoint + str(job1.id) + '/', data=data)
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert response_json['title'] == data['title']
        assert response_json['recruiter'] == data['recruiter']
        assert response_json['posting_url'] == data['posting_url']
        assert response_json['posting_date'] == data['posting_date']
        assert response_json['expiry_date'] == data['expiry_date']
        assert response_json['city'] == data['city']
        assert response_json['job_type'] == data['job_type']
        assert response_json['description'] == data['description']

        assert Job.objects.count() == 1

        job = Job.objects.first()
        assert job.title == data['title']
        assert job.recruiter.id == data['recruiter']
        assert job.posting_url == data['posting_url']
        assert job.posting_date.strftime("%Y-%m-%d") == data['posting_date']
        assert job.expiry_date.strftime("%Y-%m-%d") == data['expiry_date']
        assert job.city == data['city']
        assert job.job_type == data['job_type']
        assert job.description == data['description']

            
