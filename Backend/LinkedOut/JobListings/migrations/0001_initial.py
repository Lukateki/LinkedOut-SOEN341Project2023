# Generated by Django 4.1.6 on 2023-02-10 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('company', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('posting_date', models.DateField()),
                ('city', models.CharField(max_length=100)),
                ('job_type', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=256)),
            ],
        ),
    ]