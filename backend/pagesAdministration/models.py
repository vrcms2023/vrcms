from django.db import models
from common.BaseModel import BaseModelV2
# Create your models here.

class PageDetails(BaseModelV2):
    page_label =        models.CharField(max_length=100, null=False, blank=True)
    page_url =          models.CharField(max_length=100, null=True, blank=True)
    page_isActive =     models.BooleanField(default=True)
    is_Parent =         models.BooleanField(default=True)
    page_parent_ID =    models.CharField(max_length=100, null=True, blank=True)
    page_position =     models.IntegerField(default=0)
    is_Admin_menu =     models.BooleanField(default=False)
    is_Client_menu =    models.BooleanField(default=True)
    is_Maintainer_menu =models.BooleanField(default=False)
    service_menu_ID =   models.CharField(max_length=100, null=True, blank=True)
    seo_title =         models.CharField(blank=True, max_length=200, null=True)
    seo_description =   models.TextField(blank=True,  null=True)
    seo_link =          models.CharField(blank=True, max_length=200, null=True)
    seo_author =        models.CharField(blank=True, max_length=200, null=True)
    seo_keywords =      models.CharField(blank=True, max_length=500, null=True)  

    class Meta:
        db_table = "page_details"

    def __str__(self):
        return f"{self.page_label or 'No Label'}"