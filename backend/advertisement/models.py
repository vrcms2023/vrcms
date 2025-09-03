from pyexpat import model
from django.db import models
import uuid
from common.BaseModel import ImageModelV2 ,BaseModelV2
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


# Create your models here.

class AdvertisementList(ImageModelV2):
        title =         models.CharField(max_length=100, null=True, blank=True )
        advertisement_description =   models.CharField(max_length=100, null=True, blank=True )
        phonen_number = models.CharField(max_length=100, null=True, blank=True )
        showAndHide =   models.BooleanField(default=False)

        class Meta:
            db_table = "advertisement_list"     

        def __str__(self):
            return f"{self.title or 'No Title'}"


class AdvertisementSize(BaseModelV2):
        size =   models.CharField(max_length=100, null=True, blank=True )

        class Meta:
                db_table = "advertisement_size"

        def __str__(self):
            return f"{self.size or 'No Size'}"
        

@receiver(post_delete, sender=AdvertisementList)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)