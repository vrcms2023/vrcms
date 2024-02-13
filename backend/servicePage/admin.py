from django.contrib import admin
from  .models import *

# Register your models here.

@admin.register(Services)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("services_page_title", "publish")

@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    list_display = ("feature_title", "feature_description")

@admin.register(ServiceAccordion)
class ServiceAccordionAdmin(admin.ModelAdmin):
    list_display = ("accordion_title", "accordion_description")