from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class AboutUSSerializer(serializers.ModelSerializer):
     class Meta:
        model = Aboutus
        fields = '__all__'
     
     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)
