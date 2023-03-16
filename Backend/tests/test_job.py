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
            
