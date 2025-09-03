from django.db import models
import uuid
from common.BaseModel import BaseModelV2, FileUpload
from django.core.exceptions import ValidationError
import os
from django.conf import settings
from django.utils import timezone
import mimetypes
from django.db.models.signals import post_delete
from django.dispatch import receiver
# Create your models here.

class Careers(BaseModelV2):
        job_title =         models.CharField(max_length=100, null=False )
        job_location =      models.CharField(max_length=100, null=True, blank=True )
        company_name =      models.CharField(max_length=100, null=True, blank=True )
        experience_from =   models.CharField(max_length=100, null=True, blank=True )
        experience_to =     models.CharField(max_length=100, null=True, blank=True )
        education =         models.CharField(max_length=200, null=True, blank=True )
        openings =          models.IntegerField(null=True, blank=True)
        contactEmail =      models.CharField(max_length=100, null=True, blank=True )
        posted_date =       models.CharField(max_length=100, null=True, blank=True)
        description =       models.JSONField(null=True, blank=True)
        publish =           models.BooleanField(default=False)
        package =           models.CharField(max_length=100, null=True, blank=True )
        skills =            models.CharField(max_length=500, null=True, blank=True )
        no_of_application=  models.IntegerField(null=True, blank=True )
        employment_Type =   models.CharField(max_length=100, null=True, blank=True )
        mode_of_work =      models.CharField(max_length=100, null=True, blank=True )
        about_company  =    models.CharField(max_length=100, null=True, blank=True )

        class Meta:
            db_table = "careers"

        def __str__(self):
            return f"{self.job_title or 'No Title'}"

# def validate_file_extension(value):
#     ext = os.path.splitext(value.name)[1]  
#     valid_extensions = settings.JOB_ACCEPT_FILE_TYPE
#     if ext.lower() not in valid_extensions:
#         raise ValidationError('Unsupported file extension. Only .docx, .rtf, and .pdf are allowed.')

# def image_upload_path(instance, filename):
#     now = timezone.now()
#     base, extension = os.path.splitext(filename.lower())
#     milliseconds = now.microsecond // 1000
#     return f"resumes/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class AppliedJob(FileUpload):
        jobtitle =      models.CharField(max_length=100, null=False )
        jobID =         models.CharField(max_length=100, null=False )
        firstName =     models.CharField(max_length=100, null=False )
        lastName =      models.CharField(max_length=100, null=True, blank=True )
        email =         models.CharField(max_length=100, null=False )       
        phoneNumber =   models.CharField(max_length=100, null=True, blank=True )
        cityAddress =   models.CharField(max_length=100, null=True, blank=True )
        country =       models.CharField(max_length=100, null=False, blank=True )
        description =   models.TextField()

        class Meta:
            db_table = "appled_job"     

        def __str__(self):
            return f"{self.jobtitle or 'No Title'}"


@receiver(post_delete, sender=AppliedJob)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)