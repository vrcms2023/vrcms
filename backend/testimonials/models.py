from django.db import models
import uuid
import os
from common.BaseModel import ImageModel, BaseModel

# Create your models here.

class Testimonials(ImageModel): 
    testimonial_title =         models.CharField(max_length=100, null=True, blank=True)
    testimonial_sub_title =         models.CharField(max_length=100, null=True, blank=True)
    testimonial_description =         models.CharField(max_length=1000, null=True, blank=True)


