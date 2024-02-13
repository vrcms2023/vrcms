# Generated by Django 4.2.5 on 2024-01-02 07:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Careers',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_by', models.CharField(blank=True, max_length=50, null=True)),
                ('updated_by', models.CharField(blank=True, max_length=50, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('job_title', models.CharField(max_length=100)),
                ('job_location', models.CharField(blank=True, max_length=100, null=True)),
                ('company_name', models.CharField(blank=True, max_length=100, null=True)),
                ('experience_from', models.CharField(blank=True, max_length=100, null=True)),
                ('experience_to', models.CharField(blank=True, max_length=100, null=True)),
                ('education', models.CharField(blank=True, max_length=100, null=True)),
                ('openings', models.IntegerField(blank=True, null=True)),
                ('contactEmail', models.CharField(blank=True, max_length=100, null=True)),
                ('posted_date', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.JSONField(blank=True, null=True)),
                ('publish', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
