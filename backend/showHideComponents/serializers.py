from rest_framework import serializers

from .models import *


class ShowHideComponentsSerializer(serializers.ModelSerializer):
     class Meta:
        model = ShowHideComponents
        fields = '__all__'

def validate(self, data):
        # Add any custom validation for componentName and pageType here
        if not data.get('componentName'):
            raise serializers.ValidationError("componentName is required")
        if not data.get('pageType'):
            raise serializers.ValidationError("pageType is required")
        return data