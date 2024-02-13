from django.contrib import admin
from  .models import *

# Register your models here.

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("idprojectcategories", "projectLabel", "projectValue")

@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ("projectTitle","isActive")

@admin.register(FeatureAndAmenities)
class AmenitiesAndFeatureAdmin(admin.ModelAdmin):
    list_display = ("amenitie", "feature")

@admin.register(Specifications)
class AddSpecifications(admin.ModelAdmin):
    list_display =("projectID", "title")

