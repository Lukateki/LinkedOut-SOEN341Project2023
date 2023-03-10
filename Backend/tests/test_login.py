import pytest
from django.contrib.auth.models import User
# function Run once per test
# class    Run once per class of tests
# module   Run once per module
# session  Run once per session

@pytest.fixture()
def user_1(db):
    return User.objects.create_user("test-user")

@pytest.mark.django_db
def test_user_create():
    User.objects.create_user(username='test', email='test@test.com', password='test')
    assert User.objects.count() == 1
