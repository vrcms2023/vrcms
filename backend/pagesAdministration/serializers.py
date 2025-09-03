from rest_framework import serializers
from .models import *


class PagesAdministrationSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)

   class Meta:
        model = PageDetails
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")
