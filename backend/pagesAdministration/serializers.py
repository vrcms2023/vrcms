from rest_framework import serializers
from .models import *


class PagesAdministrationSerializer(serializers.ModelSerializer):
     class Meta:
        model = PageDetails
        fields = '__all__'
