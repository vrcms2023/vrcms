from django.db import models
from common.BaseModel import FileUpload
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
# Create your models here.

class CaseStudies(FileUpload):
    case_studies_title =            models.CharField(max_length=500, null=True, blank=True)
    case_studies_description =      models.CharField(max_length=5000, null=True, blank=True)

    class Meta:
            db_table = "case_studies"     

    def __str__(self):
            return f"{self.case_studies_title or 'No Title'}"
    
@receiver(post_delete, sender=CaseStudies)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)