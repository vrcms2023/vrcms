from rest_framework import serializers
from .models import *


class imageAndVideoGallerySerializer(serializers.ModelSerializer):
     class Meta:
        model = imageAndVideoGallery
        fields = '__all__'
