from django.db import models
import uuid
from common.BaseModel import BaseModelV2, ImageModelV2
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


# Create your models here.

class ContactUS(BaseModelV2):   
    firstName =     models.CharField(max_length=100, null=False)
    email =         models.EmailField(max_length=254, null=False)
    phoneNumber=    models.CharField(max_length=50, null=False)
    description =   models.CharField(max_length=5000, null=False)

    class Meta:
        db_table = "contact_us"

    def __str__(self):
        return f"{self.firstName or 'No Title'}"

class Brochures(ImageModelV2):
    brochures_name = models.CharField(max_length=100,  null=True, blank=True )
    brochures_downloadName =models.CharField(max_length=100,  null=True, blank=True )

    class Meta:
        db_table = "brochures"

    def __str__(self):
            return f"{self.brochures_name or 'No Title'}"

@receiver(post_delete, sender=Brochures)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)

class RaqForm(BaseModelV2):
    name =          models.CharField(max_length=100, null=False)
    company =       models.CharField(max_length=100, null=True, blank=True)
    email =         models.EmailField(max_length=254, null=False)
    phoneNumber=    models.CharField(max_length=100, null=False)
    cityAddress =   models.CharField(max_length=1000, null=True, blank=True)
    stateProvince = models.CharField(max_length=1000, null=True, blank=True)
    natureofProject= models.CharField(max_length=100, null=True, blank=True)
    country =       models.CharField(max_length=100,  null=False)
    description =   models.CharField(max_length=5000, null=False)
    teams =         models.CharField(max_length=100, null=True, blank=True)
    hangout =       models.CharField(max_length=100, null=True, blank=True)
    other =         models.CharField(max_length=100, null=True, blank=True)

    class Meta:
            db_table = "RaqForm"     

    def __str__(self):
            return f"{self.name or 'No Title'}"