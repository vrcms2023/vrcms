from pyexpat import model
from django.db import models
import uuid
from common.BaseModel import ImageModel


# Create your models here.

class AdvertisementList(ImageModel):
        title =         models.CharField(max_length=100, null=True, blank=True )
        advertisement_description =   models.CharField(max_length=100, null=True, blank=True )
        phonen_number = models.CharField(max_length=100, null=True, blank=True )
        showAndHide =   models.BooleanField(default=False)
