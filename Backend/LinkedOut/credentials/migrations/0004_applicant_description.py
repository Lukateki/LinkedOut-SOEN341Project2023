# Generated by Django 4.1.7 on 2023-03-30 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credentials', '0003_alter_recruiter_established'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='description',
            field=models.TextField(null=True),
        ),
    ]