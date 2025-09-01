from django.db import models
from common.BaseModel import FileUpload
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

# Create your models here.
class Banner(FileUpload):
    pageType = models.CharField(max_length=100, null=True, blank=True)
    banner_title = models.CharField(max_length=100, null=True, blank=True)
    banner_subTitle = models.CharField(max_length=100, null=True, blank=True)
    banner_descripiton = models.CharField(max_length=5000, null=True, blank=True)
    moreLink = models.CharField(max_length=100, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "banner"

    def __str__(self):
        return f"{self.pageType} - {self.banner_title or 'No Title'}"
    

@receiver(post_delete, sender=Banner)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)