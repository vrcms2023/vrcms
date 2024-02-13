from rest_framework import serializers
from .models import *


class TestimonialsSerializer(serializers.ModelSerializer):
     class Meta:
        model = Testimonials
        fields = '__all__'
