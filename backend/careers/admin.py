from django.contrib import admin
from  .models import *


# Register your models here.
@admin.register(Careers)
class AddCareers(admin.ModelAdmin):
    list_display =("job_title", "job_location")