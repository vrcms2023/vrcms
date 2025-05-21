from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(AdvertisementList)
class AddBannerIntro(admin.ModelAdmin):
    list_display =("title","advertisement_description","showAndHide")