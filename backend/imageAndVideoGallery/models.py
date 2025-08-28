from django.db import models
from common.BaseModel import FileUpload
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
# Create your models here.

class Gallery(FileUpload):   
    image_title =       models.CharField(max_length=200, null=True, blank=True)
    image_description = models.CharField(max_length=500, null=True, blank=True)
    likes  =            models.CharField(max_length=100, null=True, blank=True)
    Views =             models.CharField(max_length=100, null=True, blank=True)
    Downloads  =        models.CharField(max_length=100, null=True, blank=True)
    location =          models.CharField(max_length=500, null=True, blank=True)
    imageDimension =    models.CharField(max_length=200, null=True, blank=True)
    position =          models.IntegerField(null=True, blank=True, default=0)   
    category =          models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        abstract = True 
    

class VideoGallery(Gallery):      
    video_WebURL =      models.URLField(null=True, blank=True)
    video_id =          models.CharField(max_length=50, blank=True)
    video_thumbnail_url = models.URLField(blank=True)
    
    class Meta:
        db_table = "video_gallery"

    def __str__(self):
        return f"{self.title or 'No Name'}"
    
class ImageGallery(Gallery): 
    image_WebURL =      models.URLField(null=True, blank=True)   

    class Meta:
        db_table = "image_gallery"

    def __str__(self):
        return f"{self.title or 'No Name'}"
    
@receiver(post_delete, sender=ImageGallery)
@receiver(post_delete, sender=VideoGallery)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)
            