from django.db import models
import uuid
from common.BaseModel import BaseModel, ImageModel


class ProjectCategory(models.Model):
        idprojectcategories = models.CharField(max_length=100, primary_key=True)
        projectLabel = models.CharField(max_length=50)
        projectValue = models.CharField(max_length=50)


        class Meta:
                db_table = "real_estate_project_category"

        def __str__(self):
                return f"{self.projectLabel or 'No Name'}"

class Category(ImageModel):              
        category_Label = models.CharField(max_length=50)
        category_Value = models.CharField(max_length=50, blank=True, null=True)
        category_description =   models.CharField(blank=True, max_length=5000, null=True)
        readMore_link =  models.CharField(blank=True, max_length=100, null=True)


        class Meta:
                db_table = "real_estate_category"

        def __str__(self):
                return f"{self.category_Label or 'No Label'}"


class Projects(BaseModel):       
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
        seo_title =         models.CharField(blank=True, max_length=200, null=True)
        seo_description =   models.CharField(blank=True, max_length=1000, null=True)
        seo_link =          models.CharField(blank=True, max_length=200, null=True)
        seo_author =        models.CharField(blank=True, max_length=200, null=True)
        seo_keywords =      models.CharField(blank=True, max_length=200, null=True)  
        
        class Meta:
                db_table = "real_estate_projects"

        def __str__(self):
                return f"{self.projectTitle or 'No Title'}"


class FeatureAndAmenities(BaseModel):
        projectID = models.CharField(max_length=100, null=False, unique=True)
        amenitie = models.CharField(max_length=5000, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
        googleMap = models.CharField(max_length=5000, null=True, blank=True)

        class Meta:
                db_table = "real_estate_feature_and_amenities"

        def __str__(self):
                return f"{self.feature or 'No Feature'}"


class Specifications(BaseModel):
        projectID = models.CharField(max_length=100, null=False)
        title = models.CharField(max_length=500, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
       

        class Meta:
                db_table = "real_estate_specifications"

        def __str__(self):
                return f"{self.title or 'No Title'}"