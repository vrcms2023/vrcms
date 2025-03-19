from django.db import models
from common.BaseModel import BaseModel
# Create your models here.

class Themes(BaseModel):
        selected_themeName =   models.CharField(max_length=100, null=False, blank=False )