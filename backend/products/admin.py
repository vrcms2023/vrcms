from django.contrib import admin
from  .models import *

# Register your models here.
@admin.register(Category)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("company_id", "company_name", "category_name")