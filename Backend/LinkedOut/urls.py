"""LinkedOut URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from LinkedOut.credentials.views import ApplicantViewSet, EducationViewSet, ExperienceViewSet, RecruiterViewSet, UserViewSet, GroupViewSet
from LinkedOut.JobListings.views import JobViewSet
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
#router.register(r'groups', GroupViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'educations', EducationViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'applicants', ApplicantViewSet)
router.register(r'recruiters', RecruiterViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
    path('admin/', admin.site.urls),
]
