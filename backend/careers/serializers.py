from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class CareerSerializer(serializers.ModelSerializer):
     class Meta:
        model = Careers
        fields = '__all__'


     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)