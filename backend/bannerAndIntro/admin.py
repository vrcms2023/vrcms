from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(BannerAndIntro)
class AddBannerIntro(admin.ModelAdmin):
    list_display =("banner_title","banner_subTitle")
