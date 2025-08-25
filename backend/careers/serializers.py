from rest_framework import serializers
from django.conf import settings

from common.utility import exclude_fields
from .models import *


class CareerSerializer(serializers.ModelSerializer):
     class Meta:
        model = Careers
        fields = '__all__'


     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)
     
   
class appledJobSerializer(serializers.ModelSerializer):
   class Meta:
        model = appledJob
        fields = '__all__'

   def validate_path(self, value):
        file_size = int(settings.RESUME_FILE_SIZE)
        max_size =  file_size * 1024 * 1024  # 5MB
        if value.size > max_size:
            raise serializers.ValidationError(f"File size must not exceed {file_size}MB.")
        return value
