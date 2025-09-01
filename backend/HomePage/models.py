from django.db import models
from common.BaseModel import ImageModel, BaseModel, FileUpload,BaseModelV2
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

class Carousel(FileUpload):
    carouse_title =         models.CharField(max_length=200, null=True, blank=True)
    carouse_sub_title =     models.CharField(max_length=200, null=True, blank=True)
    carouse_description =   models.CharField(max_length=5000, null=True, blank=True)
    carouse_position =      models.IntegerField(null=True, blank=True, default=0)
    category =              models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "carousel"

    def __str__(self):
        return f"{self.carouse_title or 'No Title'}"


class HomeIntro(BaseModelV2):
    intro_title =       models.CharField(max_length=100, null=True, blank=True)
    intro_desc =        models.CharField(max_length=5000, null=True, blank=True)
    intro_morelink =    models.CharField(max_length=100, null=True, blank=True)
    subTitle =          models.JSONField(null=True, blank=True)
    pageType =          models.CharField(max_length=100, null=False)
    intro_position =    models.IntegerField(null=True, blank=True, default=0)
    

    class Meta:
        db_table = "home_intro"

    def __str__(self):
        return f"{self.intro_title or 'No Title'}"


class ClientLogo(FileUpload):
    client_title =          models.CharField(max_length=500, null=True, blank=True)
    client_description =    models.CharField(max_length=5000, null=True, blank=True)
    client_position =       models.IntegerField(null=True, blank=True, default=0)
    category =              models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "client_logo"

    def __str__(self):
        return f"{self.client_title or 'No Title'}"


@receiver(post_delete, sender=Carousel)
@receiver(post_delete, sender=HomeIntro)
@receiver(post_delete, sender=ClientLogo)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)
            