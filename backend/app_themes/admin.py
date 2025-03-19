from django.contrib import admin
from  .models import *


# Register your models here.
@admin.register(Themes)
class AddTheme(admin.ModelAdmin):
    list_display =("id","selected_themeName")