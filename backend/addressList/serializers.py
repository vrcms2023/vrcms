from rest_framework import serializers
from .models import *


class AddressListSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)

   class Meta:
       model = AddressList
       fields = '__all__'
