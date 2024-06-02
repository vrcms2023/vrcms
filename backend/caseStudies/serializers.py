from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class CaseStudiesSerializer(serializers.ModelSerializer):
     class Meta:
        model = CaseStudies
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)