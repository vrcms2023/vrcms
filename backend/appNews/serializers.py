from rest_framework import serializers
from .models import *


class AppNewsSerializer(serializers.ModelSerializer):
     class Meta:
        model = AppNews
        fields = '__all__'
