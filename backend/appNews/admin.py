from django.contrib import admin
from  .models import *

# Register your models here.
@admin.register(AppNews)
class AddTestimonials(admin.ModelAdmin):
    list_display =("news_title", "news_description")