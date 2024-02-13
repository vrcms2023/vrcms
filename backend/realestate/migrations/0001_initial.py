# Generated by Django 4.2.5 on 2024-01-02 07:02

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FeatureAndAmenities',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectID', models.CharField(max_length=100, unique=True)),
                ('amenitie', models.CharField(blank=True, max_length=5000, null=True)),
                ('feature', models.CharField(blank=True, max_length=5000, null=True)),
                ('googleMap', models.CharField(blank=True, max_length=5000, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProjectCategory',
            fields=[
                ('idprojectcategories', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('projectLabel', models.CharField(max_length=50)),
                ('projectValue', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectCategoryID', models.CharField(max_length=100)),
                ('projectCategoryName', models.CharField(max_length=50)),
                ('projectCategoryValue', models.CharField(max_length=50)),
                ('projectTitle', models.CharField(max_length=50, unique=True)),
                ('description', models.CharField(blank=True, max_length=5000, null=True)),
                ('percentValue', models.CharField(blank=True, max_length=50, null=True)),
                ('isActive', models.BooleanField(default=False)),
                ('publish', models.BooleanField(default=False)),
                ('aboutstitle', models.CharField(blank=True, max_length=50, null=True)),
                ('aboutussubtitle', models.CharField(blank=True, max_length=50, null=True)),
                ('imageDescription', models.CharField(blank=True, max_length=1000, null=True)),
                ('userID', models.CharField(max_length=50)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Specifications',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectID', models.CharField(max_length=100)),
                ('title', models.CharField(blank=True, max_length=500, null=True)),
                ('feature', models.CharField(blank=True, max_length=5000, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
            ],
        ),
    ]
