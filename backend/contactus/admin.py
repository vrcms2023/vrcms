from django.contrib import admin
from  .models import *

# Register your models here.
@admin.register(ContactUS)
class AddContactUS(admin.ModelAdmin):
    list_display =("email", "firstName")