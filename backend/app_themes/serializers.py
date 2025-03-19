from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class ThemeSerializer(serializers.ModelSerializer):
     class Meta:
        model = Themes
        fields = '__all__'
        
