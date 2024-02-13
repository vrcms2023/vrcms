from django.contrib import admin
from  .models import *

# Register your models here.
@admin.register(Testimonials)
class AddTestimonials(admin.ModelAdmin):
    list_display =("testimonial_title", "testimonial_sub_title")