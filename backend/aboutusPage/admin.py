from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Aboutus)
class AddBannerIntro(admin.ModelAdmin):
    list_display =("aboutus_title", "aboutus_description")