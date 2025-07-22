from rest_framework import serializers

from .models import *


class TitleDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TitleDescription
        fields = '__all__'