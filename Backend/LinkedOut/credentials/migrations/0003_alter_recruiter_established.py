# Generated by Django 4.1.7 on 2023-03-25 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credentials', '0002_recruiter_award_one_recruiter_award_two_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recruiter',
            name='established',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
