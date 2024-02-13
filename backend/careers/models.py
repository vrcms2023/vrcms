from django.db import models
import uuid
from common.BaseModel import BaseModel


# Create your models here.

class Careers(BaseModel):
        job_title =         models.CharField(max_length=100, null=False )
        job_location =      models.CharField(max_length=100, null=True, blank=True )
        company_name =      models.CharField(max_length=100, null=True, blank=True )
        experience_from =   models.CharField(max_length=100, null=True, blank=True )
        experience_to =     models.CharField(max_length=100, null=True, blank=True )
        education =         models.CharField(max_length=100, null=True, blank=True )
        openings =          models.IntegerField(null=True, blank=True)
        contactEmail =      models.CharField(max_length=100, null=True, blank=True )
        posted_date =       models.CharField(max_length=100, null=True, blank=True)
        description =       models.JSONField(null=True, blank=True)
        publish =           models.BooleanField(default=False)