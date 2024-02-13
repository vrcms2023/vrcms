from django.contrib import admin
from .models import *
from common.BaseModel import ImageModel

# Register your models here.
# @admin.register(ImageModel)
# class AddCarousel(admin.ModelAdmin):
#     list_display =("carouseTitle",'imageDescription')


@admin.register(HomeIntro)
class AddHomeIntro(admin.ModelAdmin):
    list_display =("intro_title", "intro_desc")