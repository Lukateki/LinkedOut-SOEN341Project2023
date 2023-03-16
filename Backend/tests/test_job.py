import pytest


class TestUserViewSet:

    endpoint = '/api/v1/jobs/'
    
    @pytest.mark.django_db
    def test_list(self, client, job, job2):
        response = client.get(self.endpoint)
        print(response.data)