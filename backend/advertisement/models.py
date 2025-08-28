from pyexpat import model
from django.db import models
import uuid
from common.BaseModel import ImageModel,BaseModel


# Create your models here.

class AdvertisementList(ImageModel):
        title =         models.CharField(max_length=100, null=True, blank=True )
        advertisement_description =   models.CharField(max_length=100, null=True, blank=True )
        phonen_number = models.CharField(max_length=100, null=True, blank=True )
        showAndHide =   models.BooleanField(default=False)

        class Meta:
            db_table = "advertisement_list"     

        def __str__(self):
            return f"{self.title or 'No Title'}"


class AdvertisementSize(BaseModel):
        size =   models.CharField(max_length=100, null=True, blank=True )

        class Meta:
                db_table = "advertisement_size"

        def __str__(self):
            return f"{self.size or 'No Size'}"