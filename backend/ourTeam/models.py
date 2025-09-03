from django.db import models
from common.BaseModel import ImageModelV2, SocialMeidaModel
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


class OurTeam(ImageModelV2, SocialMeidaModel):
    team_member_name =          models.CharField(max_length=200, null=True, blank=True)
    team_member_email =         models.CharField(max_length=200, null=True, blank=True)
    team_member_designation =   models.CharField(max_length=200, null=True, blank=True)
    team_member_phone_number =  models.CharField(max_length=200, null=True, blank=True)
    team_member_about_us  =     models.CharField(max_length=5000, null=True, blank=True)
    team_member_position =      models.IntegerField(null=True, blank=True, default=0)
    

    class Meta:
        db_table = "our_team"

    def __str__(self):
        return f"{self.team_member_name or 'No Name'}"
    
@receiver(post_delete, sender=OurTeam)
def delete_file_on_imageupload_delete(sender, instance, **kwargs):
    print("instance.path",instance.path )
    if instance.path and instance.path.name:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)