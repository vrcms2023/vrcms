from django.db import models
from common.BaseModel import ImageModel
# Create your models here.

class imageAndVideoGallery(ImageModel):
    image_title =       models.CharField(max_length=200, null=True, blank=True)
    image_description = models.CharField(max_length=500, null=True, blank=True)
    likes  =            models.CharField(max_length=100, null=True, blank=True)
    Views =             models.CharField(max_length=100, null=True, blank=True)
    Downloads  =        models.CharField(max_length=100, null=True, blank=True)
    location =          models.CharField(max_length=500, null=True, blank=True)
    imageDimension =    models.CharField(max_length=200, null=True, blank=True)
