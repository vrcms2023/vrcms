from rest_framework import serializers
from .models import *


class AddressSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)

   class Meta:
       model = Address
       fields = '__all__'
       read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

class TermsAndConditionsSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)

   class Meta:
       model = TermsandCondition
       fields = '__all__'
       read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")


class GoogleMAPURLSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)

   class Meta:
       model = googleMAPURL
       fields = '__all__'
       read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")