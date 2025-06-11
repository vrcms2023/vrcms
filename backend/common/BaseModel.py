from django.db import models
import os
from django.utils import timezone
import uuid


class BaseModel(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    created_by =    models.CharField(max_length=50, null=True, blank=True)
    updated_by =    models.CharField(max_length=50, null=True, blank=True)
    created_at =    models.DateTimeField(auto_now_add= True)
    updated_at =    models.DateTimeField(auto_now= True)

    class Meta:
        abstract = True 



def image_upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"images/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class ImageModel(BaseModel):
    path =          models.FileField(blank=True, null=True, upload_to=image_upload_path )
    category =      models.CharField(max_length=100, null=True, blank=True, )
    originalname=   models.CharField(max_length=500, null=True, blank=True)
    contentType=    models.CharField(max_length=500, null=True, blank=True)
    alternitivetext = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        abstract = True 


class ServiceImageModel(BaseModel):
    path =          models.FileField(blank=True, null=True, upload_to=image_upload_path )
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    contentType=    models.CharField(max_length=100, null=True, blank=True)
    alternitivetext = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        abstract = True 


class SocialMeidaModel(BaseModel):
    twitter_url =       models.CharField(max_length=500, null=True, blank=True )
    facebook_url =      models.CharField(max_length=500, null=True, blank=True )
    linkedIn_url =      models.CharField(max_length=500, null=True, blank=True )
    youtube_url =       models.CharField(max_length=500, null=True, blank=True )
    instagram_url =     models.CharField(max_length=500, null=True, blank=True )
    vimeo_url =         models.CharField(max_length=500, null=True, blank=True )
    pinterest_url =     models.CharField(max_length=500, null=True, blank=True )

    class Meta:
        abstract = True 