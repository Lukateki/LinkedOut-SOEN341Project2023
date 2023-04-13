import pytest

from LinkedOut.credentials.models import Recruiter

class TestRecruiterViewSet:

    endpoint = '/api/v1/recruiters/'

    @pytest.mark.django_db
    def test_recruiter_retrieve(self, client, recruiter):
        response = client.get(self.endpoint)
        assert response.status_code == 200

        response_json = response.json()
        assert response_json != None

        assert len(response_json) == Recruiter.objects.count()

    @pytest.mark.django_db
    def test_recruiter_create(self, client):
        data = {
            'username': 'test recruiter',
            'company': 'test company',
            'about':'test about',
            'headquarters': 'test headquarters',
        }

        response = client.post(self.endpoint, data=data)
        assert response.status_code == 201

        response_json = response.json()
        assert response_json != None

        assert_recruiter(response_json, data)

        assert Recruiter.objects.count() == 1

    @pytest.mark.django_db
    def test_recruiter_delete(self, client, recruiter):
        response = client.delete(self.endpoint + str(recruiter.id) + '/')
        assert response.status_code == 204

        assert Recruiter.objects.count() == 0

    @pytest.mark.django_db
    def test_recruiter_update(self, client, recruiter):
        data = {
            'about':'test1 about',
            'headquarters': 'test1 headquarters',
        }
        response = client.patch(self.endpoint + str(recruiter.id) + '/', data=data)

        assert response.status_code == 200

        assert Recruiter.objects.count() == 1

        recruiter = Recruiter.objects.first()

        assert recruiter.about == data['about']
        assert recruiter.headquarters == data['headquarters']


def assert_recruiter(recruiter, data):
    assert recruiter['username'] == data['username']
    assert recruiter['company'] == data['company']
    assert recruiter['about'] == data['about']
    assert recruiter['headquarters'] == data['headquarters']