from django.db import models
from common.BaseModel import ImageModel
# Create your models here.

class BannerAndIntro(ImageModel):
    pageType =      models.CharField(max_length=100, null=False)
    banner_title =   models.CharField(max_length=100, null=True, blank=True)
    banner_subTitle =   models.CharField(max_length=100, null=True, blank=True)
    banner_descripiton =   models.CharField(max_length=5000, null=True, blank=True)
    moreLink =   models.CharField(max_length=100, null=True, blank=True)
  

    class Meta:
            db_table = "banner_and_intro"

    def __str__(self):
            return f"{self.banner_title or 'No Title'}"
