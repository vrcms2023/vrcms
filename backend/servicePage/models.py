from django.db import models
import uuid
from common.BaseModel import BaseModel, ServiceImageModel,ImageModelV2


# Create your models here.

class Services(BaseModel):
        services_page_title =   models.CharField(max_length=100, unique=True )
        publish =               models.BooleanField(default=False)
        pageType =              models.CharField(max_length=100, null=True, blank=True )
        page_url =              models.CharField(max_length=100, null=True, blank=True )
        menu_ID =               models.CharField(max_length=100, null=True, blank=True )
        service_postion =        models.CharField(max_length=10, null=True, blank=True)

        class Meta:
                db_table = "services"

        def __str__(self):
                return f"{self.services_page_title or 'No Title'}"

class ServiceFeature(ImageModelV2):
        serviceID  =            models.CharField(max_length=100, null=False)
        services_page_title =   models.CharField(max_length=100, unique=False )
        feature_title =         models.CharField(max_length=100, null=True, blank=True )
        feature_sub_title=      models.CharField(max_length=200, null=True, blank=True)
        feature_description =   models.CharField(max_length=5000, null=True, blank=True)
        services_page_url =     models.CharField(max_length=100, null=True, blank=True)
        services_feature_position =     models.IntegerField(default=0)

        class Meta:
                db_table = "service_features"

        def __str__(self):
                return f"{self.feature_title or 'No Title'}"
       

class ServiceAccordion(ImageModelV2):
        serviceID  =            models.CharField(max_length=100, null=False)
        services_page_title =   models.CharField(max_length=100, unique=False )
        accordion_title =       models.CharField(max_length=100, null=True, blank=True )
        accordion_sub_title=    models.CharField(max_length=200, null=True, blank=True)
        accordion_description = models.CharField(max_length=5000, null=True, blank=True)
        services_description_position =     models.IntegerField(default=0)

        class Meta:
                db_table = "service_accordions"

        def __str__(self):
                return f"{self.accordion_title or 'No Title'}"
