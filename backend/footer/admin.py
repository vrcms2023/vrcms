from django.contrib import admin
from  .models import *


# Register your models here.
@admin.register(Address)
class AddCareers(admin.ModelAdmin):
    list_display =("location", "city")