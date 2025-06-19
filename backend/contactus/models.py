from django.db import models
import uuid
from common.BaseModel import BaseModel, ImageModel

# Create your models here.

class ContactUS(BaseModel):
   
    firstName =     models.CharField(max_length=100, null=False)
    email =         models.EmailField(max_length=254, null=False)
    phoneNumber=    models.CharField(max_length=50, null=False)
    description =   models.CharField(max_length=5000, null=False)

class Brochures(ImageModel):
    brochures_name = models.CharField(max_length=100,  null=True, blank=True )
    brochures_downloadName =models.CharField(max_length=100,  null=True, blank=True )

class IconsenggRaqForm(BaseModel):
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