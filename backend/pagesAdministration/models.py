from django.db import models
from common.BaseModel import BaseModel
# Create your models here.

class PageDetails(BaseModel):
    page_label =        models.CharField(max_length=100, null=False, blank=True)
    page_url =          models.CharField(max_length=100, null=True, blank=True)
    page_isActive =     models.BooleanField(default=True)
    is_Parent =         models.BooleanField(default=True)
    page_parent_ID =    models.CharField(max_length=100, null=True, blank=True)
    page_position =     models.IntegerField(default=0)
    is_Admin_menu =     models.BooleanField(default=False)
    is_Client_menu =    models.BooleanField(default=True)