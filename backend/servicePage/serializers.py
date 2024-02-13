from rest_framework import serializers
from .models import *


class ServiceSerializer(serializers.ModelSerializer):
     class Meta:
        model = Services
        fields = '__all__'

class ServiceFeatureSerializer(serializers.ModelSerializer):
     class Meta:
        model = ServiceFeature
        fields = '__all__'


class ServiceAccordionSerializer(serializers.ModelSerializer):
     class Meta:
        model = ServiceAccordion
        fields = '__all__'
