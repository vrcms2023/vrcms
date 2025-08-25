from django.db import models
import uuid
from common.BaseModel import BaseModel, ServiceImageModel


# Create your models here.

class Services(BaseModel):
        services_page_title =   models.CharField(max_length=100, unique=True )
        publish =               models.BooleanField(default=False)
        pageType =              models.CharField(max_length=100, null=True, blank=True )
        page_url =              models.CharField(max_length=100, null=True, blank=True )
        menu_ID =               models.CharField(max_length=100, null=True, blank=True )
        service_postion =        models.CharField(max_length=10, null=True, blank=True)
      

class ServiceFeature(ServiceImageModel):
        serviceID  =            models.CharField(max_length=100, null=False)
        services_page_title =   models.CharField(max_length=100, unique=False )
        feature_title =         models.CharField(max_length=100, null=True, blank=True )
        feature_sub_title=      models.CharField(max_length=200, null=True, blank=True)
        feature_description =   models.CharField(max_length=5000, null=True, blank=True)
        services_page_url =     models.CharField(max_length=100, null=True, blank=True)
       

class ServiceAccordion(ServiceImageModel):
        serviceID  =            models.CharField(max_length=100, null=False)
        services_page_title =   models.CharField(max_length=100, unique=False )
        accordion_title =       models.CharField(max_length=100, null=True, blank=True )
        accordion_sub_title=    models.CharField(max_length=200, null=True, blank=True)
        accordion_description = models.CharField(max_length=5000, null=True, blank=True)
