from django.db import models
import uuid
from common.BaseModel import ImageModel

# Create your models here.

class Aboutus(ImageModel):
    aboutus_title = models.CharField(max_length=500, null=True, blank=True)
    aboutus_sub_title = models.CharField(max_length=500, null=True, blank=True)
    aboutus_description =   models.CharField(max_length=5000, null=True, blank=True)

    class Meta:
        db_table = "aboutus"

    def __str__(self):
        return f"{self.aboutus_title or 'No Title'}"
