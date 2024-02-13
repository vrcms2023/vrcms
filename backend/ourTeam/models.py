from django.db import models
from common.BaseModel import ImageModel, SocialMeidaModel

class OurTeam(ImageModel, SocialMeidaModel):
    team_member_name =          models.CharField(max_length=200, null=True, blank=True)
    team_member_email =         models.CharField(max_length=200, null=True, blank=True)
    team_member_designation =   models.CharField(max_length=200, null=True, blank=True)
    team_member_phone_number =  models.CharField(max_length=200, null=True, blank=True)
    team_member_about_us  =     models.CharField(max_length=5000, null=True, blank=True)
    