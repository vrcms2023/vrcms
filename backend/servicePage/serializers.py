from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class ServiceSerializer(serializers.ModelSerializer):
     class Meta:
        model = Services
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)

class ServiceFeatureSerializer(serializers.ModelSerializer):
     class Meta:
        model = ServiceFeature
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)


class ServiceAccordionSerializer(serializers.ModelSerializer):
     class Meta:
        model = ServiceAccordion
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)
