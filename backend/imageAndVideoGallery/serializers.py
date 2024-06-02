from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class imageAndVideoGallerySerializer(serializers.ModelSerializer):
     class Meta:
        model = imageAndVideoGallery
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)