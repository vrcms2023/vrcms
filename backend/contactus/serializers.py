from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class ContactUSSerializer(serializers.ModelSerializer):
     class Meta:
        model = ContactUS
        fields = '__all__'


class BrochuresSerializer(serializers.ModelSerializer):
     class Meta:
        model = Brochures
        fields = '__all__'

        def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)

class IconsenggRaqFormSerializer(serializers.ModelSerializer):
     class Meta:
        model = IconsenggRaqForm
        fields = '__all__'