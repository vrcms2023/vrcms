from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Gallery)
class AddSpecifications(admin.ModelAdmin):
    list_display =("projectID", "path", "category")