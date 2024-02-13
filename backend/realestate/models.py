from django.db import models
import uuid


class ProjectCategory(models.Model):
        idprojectcategories = models.CharField(max_length=100, primary_key=True)
        projectLabel = models.CharField(max_length=50)
        projectValue = models.CharField(max_length=50)


class Projects(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        projectCategoryID = models.CharField(max_length=100 )
        projectCategoryName= models.CharField(max_length=50)
        projectCategoryValue = models.CharField(max_length=50)
        projectTitle = models.CharField(max_length=50, null=False, unique=True)
        description = models.CharField(max_length=5000, null=True, blank=True)
        percentValue = models.CharField(max_length=50, null=True, blank=True)
        isActive = models.BooleanField(default=False)
        publish = models.BooleanField(default=False)
        aboutstitle= models.CharField(max_length=50, null=True, blank=True)
        aboutussubtitle= models.CharField(max_length=50, null=True, blank=True)
        imageDescription= models.CharField(max_length=1000, null=True, blank=True)
        userID = models.CharField(max_length=50)
        created_by =  models.CharField(max_length=50)
        updated_by = models.CharField(max_length=50)
        created_at = models.DateTimeField(auto_now=True)
        updated_at = models.DateTimeField(auto_now_add=True)

        

class FeatureAndAmenities(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        projectID = models.CharField(max_length=100, null=False, unique=True)
        amenitie = models.CharField(max_length=5000, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
        googleMap = models.CharField(max_length=5000, null=True, blank=True)
        created_at = models.DateTimeField(auto_now=True)
        updated_at = models.DateTimeField(auto_now_add=True)


class Specifications(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        projectID = models.CharField(max_length=100, null=False)
        title = models.CharField(max_length=500, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
        created_at = models.DateTimeField(auto_now=True)
        updated_at = models.DateTimeField(auto_now_add=True)
        created_by =  models.CharField(max_length=50)
        updated_by = models.CharField(max_length=50)
        
        def __str__(self):  
                return self.title  