#### Backend Doc
Access Job postings with "http://127.0.0.1:8000/jobs/"

### To create new API:

1. Create new folder with API name (also called app) using: 
`python manage.py startapp <app name>`
2. Add app name to urls.py in LinkedOut like such: 
`path('<app name>/', include('<app name>.urls')),` 
3. Add app name under INSTALLED_APPS in settings.py: 
`<app name>,`

### Create enpoints (RESTful)
1. Create your enpoints in Views.py
2. Build your models to replicate the database in models.py
3. run this after step 1 and 2:
`python manage.py makemigrations <app name>`
`python manage.py migrate`


To run server: `python manage.py runserver`
After creating/modifying a model: `python manage.py makemigrations <Name of App>`

## Superuser for django
username: admin
email: admin@linkedout.com
password: Password
