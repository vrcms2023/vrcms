from django.db import models
import uuid
from common.BaseModel import ImageModelV2
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

# Create your models here.

class Aboutus(ImageModelV2):
    aboutus_title = models.CharField(max_length=500, null=True, blank=True)
    aboutus_sub_title = models.CharField(max_length=500, null=True, blank=True)
    aboutus_description =   models.CharField(max_length=5000, null=True, blank=True)

    class Meta:
        db_table = "aboutus"

    def __str__(self):
        return f"{self.aboutus_title or 'No Title'}"

@receiver(post_delete, sender=Aboutus)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)