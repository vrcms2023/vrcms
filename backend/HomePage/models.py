from django.db import models
from common.BaseModel import ImageModel, BaseModel


class Carousel(ImageModel):
    carouse_title =         models.CharField(max_length=200, null=True, blank=True)
    carouse_sub_title =     models.CharField(max_length=200, null=True, blank=True)
    carouse_description =   models.CharField(max_length=5000, null=True, blank=True)
    carouse_position =      models.IntegerField(null=True, blank=True, default=0)


class HomeIntro(BaseModel):
    intro_title =   models.CharField(max_length=100, null=True, blank=True)
    intro_desc =    models.CharField(max_length=5000, null=True, blank=True)
    intro_morelink = models.CharField(max_length=100, null=True, blank=True)
    subTitle =      models.JSONField(null=True, blank=True)
    pageType =      models.CharField(max_length=100, null=False)
    intro_position = models.IntegerField(null=True, blank=True, default=0)
   

class ClientLogo(ImageModel):
    client_title =    models.CharField(max_length=500, null=True, blank=True)
    client_description = models.CharField(max_length=5000, null=True, blank=True)
    client_position = models.IntegerField(null=True, blank=True, default=0)

    