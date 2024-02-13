from django.db import models
import uuid
from common.BaseModel import BaseModel

# Create your models here.

class ContactUS(BaseModel):
   
    firstName =     models.CharField(max_length=100, null=False)
    email =         models.EmailField(max_length=254, null=False)
    phoneNumber=    models.CharField(max_length=50, null=False)
    description =   models.CharField(max_length=5000, null=False)


  