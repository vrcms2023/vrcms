from django.db import models
import uuid
from common.BaseModel import BaseModelV2, ImageModelV2
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

# class ProjectCategory(models.Model):
#         idprojectcategories = models.CharField(max_length=100, primary_key=True)
#         projectLabel = models.CharField(max_length=50)
#         projectValue = models.CharField(max_length=50)


#         class Meta:
#                 db_table = "real_estate_project_category"

#         def __str__(self):
#                 return f"{self.projectLabel or 'No Name'}"

class Category(ImageModelV2):              
        category_Label = models.CharField(max_length=50)
        category_Value = models.CharField(max_length=50, blank=True, null=True)
        category_description =   models.CharField(blank=True, max_length=5000, null=True)
        readMore_link =  models.CharField(blank=True, max_length=100, null=True)


        class Meta:
                db_table = "real_estate_category"

        def save(self, *args, **kwargs):
        # always sync value with label
                if self.category_Label:
                        self.category_Value = self.category_Label.lower()
                super().save(*args, **kwargs)

        def __str__(self):
                return f"{self.category_label} ({self.category_value})"


class Projects(BaseModelV2):     
        category =              models.ForeignKey(Category, related_name="projects", on_delete=models.CASCADE)  
        projectCategoryID =     models.CharField(max_length=100)
        projectStatus =         models.CharField(max_length=50)
        projectTitle =          models.CharField(max_length=50, null=False, unique=True)
        description =           models.CharField(max_length=5000, null=True, blank=True)
        percentValue =          models.CharField(max_length=50, null=True, blank=True)
        isActive =              models.BooleanField(default=False)
        publish =               models.BooleanField(default=False)
        aboutstitle=            models.CharField(max_length=50, null=True, blank=True)
        aboutussubtitle=        models.CharField(max_length=50, null=True, blank=True)
        imageDescription=       models.CharField(max_length=1000, null=True, blank=True)
        projectImage =          models.CharField(max_length=500, null=True, blank=True)
        seo_title =             models.CharField(blank=True, max_length=200, null=True)
        seo_description =       models.CharField(blank=True, max_length=1000, null=True)
        seo_link =              models.CharField(blank=True, max_length=200, null=True)
        seo_author =            models.CharField(blank=True, max_length=200, null=True)
        seo_keywords =          models.CharField(blank=True, max_length=200, null=True)  
        
        class Meta:
                db_table = "real_estate_projects"

        def __str__(self):
                return f"{self.projectTitle or 'No Title'}"


class FeatureAndAmenities(BaseModelV2):
        project = models.OneToOneField(Projects, related_name="features_amenities", on_delete=models.CASCADE)
        amenitie = models.CharField(max_length=5000, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
        googleMap = models.CharField(max_length=5000, null=True, blank=True)

        class Meta:
                db_table = "real_estate_feature_and_amenities"

        def __str__(self):
                return f"{self.feature or 'No Feature'}"


class Specifications(BaseModelV2):
        project = models.ForeignKey(Projects, related_name="specifications", on_delete=models.CASCADE)        
        title = models.CharField(max_length=500, null=True, blank=True)
        feature = models.CharField(max_length=5000, null=True, blank=True)
       

        class Meta:
                db_table = "real_estate_specifications"

        def __str__(self):
                return f"{self.title or 'No Title'}"
        
class ProjectGallery(ImageModelV2):
        project = models.ForeignKey(Projects, related_name="ProjectGallery", on_delete=models.CASCADE)
        category = models.CharField(max_length=100)
        image_description = models.TextField(null=True, blank=True)

        class Meta:
                db_table = "real_estate_project_images"

        def __str__(self):
                return self.originalname or f"Image {self.id}"


@receiver(post_delete, sender=Category)
@receiver(post_delete, sender=ProjectGallery)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)