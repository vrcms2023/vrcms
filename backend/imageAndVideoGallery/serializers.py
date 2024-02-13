from rest_framework import serializers
from .models import *


class ContactUSSerializer(serializers.ModelSerializer):
     class Meta:
        model = ContactUS
        fields = '__all__'
