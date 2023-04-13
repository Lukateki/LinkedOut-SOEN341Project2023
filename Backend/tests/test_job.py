import pytest

from LinkedOut.JobListings.models import Job

time_string = "%Y-%m-%d"
class TestUserViewSet:

    endpoint = '/api/v1/jobs/'
    
    @pytest.mark.django_db
    def test_list(self, client, job1, job2):
        response = client.get(self.endpoint)
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert len(response_json) == Job.objects.count()

        assert_json_with_job(response_json[0], job1)
        
        assert_json_with_job(response_json[1], job2)

    @pytest.mark.django_db
    def test_retrieve(self, client, job1):
        response = client.get(self.endpoint + str(job1.id) + '/')
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert_json_with_job(response_json, job1)

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

        assert_json(response_json, data)

        assert Job.objects.count() == 1

        job = Job.objects.first()
        assert_job(job, data)

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

        assert_json(response_json,data)

        assert Job.objects.count() == 1

        job = Job.objects.first()
        assert_job(job, data)

def assert_job(job: Job, data):
    assert job.title == data['title']
    assert job.recruiter.id == data['recruiter']
    assert job.posting_url == data['posting_url']
    assert job.posting_date.strftime(time_string) == data['posting_date']
    assert job.expiry_date.strftime(time_string) == data['expiry_date']
    assert job.city == data['city']
    assert job.job_type == data['job_type']
    assert job.description == data['description']
    
def assert_json(json, data):
    assert json['title'] == data['title']
    assert json['recruiter'] == data['recruiter']
    assert json['posting_url'] == data['posting_url']
    assert json['posting_date'] == data['posting_date']
    assert json['expiry_date'] == data['expiry_date']
    assert json['city'] == data['city']
    assert json['job_type'] == data['job_type']
    assert json['description'] == data['description']

def assert_json_with_job(json, job):
    assert json['id'] == job.id
    assert json['title'] == job.title
    assert json['recruiter'] == job.recruiter.id
    assert json['posting_url'] == job.posting_url
    assert json['posting_date'] == job.posting_date
    assert json['expiry_date'] == job.expiry_date
    assert json['city'] == job.city
    assert json['job_type'] == job.job_type
    assert json['description'] == job.description