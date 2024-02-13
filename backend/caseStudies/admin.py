from django.contrib import admin
from  .models import *


# Register your models here.
@admin.register(CaseStudies)
class AddCaseStudies(admin.ModelAdmin):
    list_display =("case_studies_title", "case_studies_description")