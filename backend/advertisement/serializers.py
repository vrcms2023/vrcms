from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class AdvertisementSerializer(serializers.ModelSerializer):
   class Meta:
      model = AdvertisementList
      fields = '__all__'

   def remove_fields(self, fields_to_exclude=None):
      return exclude_fields(self, fields_to_exclude)


class AdvertisementSizeSerializer(serializers.ModelSerializer):
   class Meta:
      model = AdvertisementSize
      fields = '__all__'


