from django.db import models
import uuid
import os
from common.BaseModel import ImageModel, BaseModel

# Create your models here.

class Testimonials(ImageModel): 
    testimonial_title =         models.CharField(max_length=100, null=True, blank=True)
    testimonial_sub_title =         models.CharField(max_length=100, null=True, blank=True)
    testimonial_description =         models.CharField(max_length=1000, null=True, blank=True)
    testimonial_position =      models.IntegerField(null=True, blank=True, default=0)


    class Meta:
            db_table = "testimonials"

    def __str__(self):
            return f"{self.testimonial_title or 'No Title'}"
