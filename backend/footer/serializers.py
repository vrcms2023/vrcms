from rest_framework import serializers
from .models import *


class AddressSerializer(serializers.ModelSerializer):
     class Meta:
        model = Address
        fields = '__all__'

class TermsAndConditionsSerializer(serializers.ModelSerializer):
     class Meta:
        model = TermsandCondition
        fields = '__all__'


class GoogleMAPURLSerializer(serializers.ModelSerializer):
     class Meta:
        model =googleMAPURL
        fields = '__all__'