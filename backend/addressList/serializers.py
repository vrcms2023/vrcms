from rest_framework import serializers
from .models import *


class AddressListSerializer(serializers.ModelSerializer):
     class Meta:
        model = AddressList
        fields = '__all__'
