from django.db import models
import os
from django.utils import timezone
from common.BaseModel import ImageModel

# Create your models here.

def upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"images/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class Gallery(ImageModel):
    projectID =     models.CharField(max_length=100, null=False)
    imageTitle =    models.CharField(max_length=500, null=True)
    imageDescription = models.CharField(max_length=5000, null=True)



