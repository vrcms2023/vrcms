from django.db import models
from pagesAdministration.models import PageDetails
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
from common.BaseModel import BaseModel,ImageModelV2


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
        service =               models.ForeignKey(PageDetails, on_delete=models.CASCADE, related_name="features")
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
        service =               models.ForeignKey(PageDetails, on_delete=models.CASCADE, related_name="accordion")
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


@receiver(post_delete, sender=ServiceFeature)
@receiver(post_delete, sender=ServiceAccordion)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)