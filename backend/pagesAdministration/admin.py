from django.contrib import admin
from  .models import *


# Register your models here.
@admin.register(PageDetails)
class PageDetails(admin.ModelAdmin):
    list_display =("page_label", "page_isActive")