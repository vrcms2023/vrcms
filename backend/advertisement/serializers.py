from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class AdvertisementSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)
   class Meta:
      model = AdvertisementList
      fields = '__all__'

   def remove_fields(self, fields_to_exclude=None):
      return exclude_fields(self, fields_to_exclude)


class AdvertisementSizeSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)
   class Meta:
      model = AdvertisementSize
      fields = '__all__'


