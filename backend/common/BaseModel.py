from django.db import models
import os
from django.utils import timezone
import uuid
from django.contrib.auth import get_user_model
import mimetypes
from django.core.exceptions import ValidationError

User = get_user_model()


def image_upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"images/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

def validate_file_extension(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.csv']
    ext = value.name.lower().split('.')[-1]
    if f'.{ext}' not in allowed_extensions:
        raise ValidationError(f"Unsupported file extension: .{ext}")


class BaseModel_v2(models.Model):  
    id =         models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    created_by = models.CharField(max_length=150, null=True, blank=True)  # now stores username directly
    updated_by = models.CharField(max_length=150, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ImageUpload(BaseModel_v2):
    path = models.FileField(upload_to=image_upload_path, validators=[validate_file_extension], blank=True, null=True)
    original_name = models.CharField(max_length=255, blank=True, editable=False)
    content_type = models.CharField(max_length=100, blank=True, editable=False)
    alternative_text = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        if self.path and not self.original_name:
            self.original_name = self.path.name

        if self.path and not self.content_type:
            mime_type, _ = mimetypes.guess_type(self.path.name)
            self.content_type = mime_type or 'application/octet-stream'

        super().save(*args, **kwargs)

    def __str__(self):
        return self.original_name or "Unnamed File"

    class Meta:
        abstract = True 


    

 ############################# OLD CODE #############################       

class BaseModel(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    created_by =    models.CharField(max_length=50, null=True, blank=True)
    updated_by =    models.CharField(max_length=50, null=True, blank=True)
    created_at =    models.DateTimeField(auto_now_add= True)
    updated_at =    models.DateTimeField(auto_now= True)

    class Meta:
        abstract = True 






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