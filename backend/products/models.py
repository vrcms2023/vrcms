
from django.db import models
import os
from django.utils import timezone
from common.BaseModel import BaseModel, ImageModel

# Create your models here.

def image_upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"category/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class Category(BaseModel):
    company_id =        models.CharField(max_length=50, null=False)
    company_name =      models.CharField(max_length=100, null=False)
    category_name =     models.CharField(max_length=100, unique=True)
    category_fileuplod = models.FileField(blank=True, null=True, upload_to=image_upload_path )
    is_available =      models.BooleanField(default=True)
    description =       models.CharField(max_length=10000, null=True, blank=True )

    def __str__(self):
        return self.company_name

class Product(ImageModel):
    company_name =      models.CharField(max_length=100, null=False)
    category_id =       models.CharField(max_length=100, null=False)
    category_name =     models.CharField(max_length=100, null=False)
    is_available =      models.BooleanField(default=True)
    product_name =      models.CharField(max_length=100, null=True)
    description =       models.CharField(max_length=10000, null=True)
    price =             models.IntegerField(default=0)

    def __str__(self):
        return self.product_name