from rest_framework import serializers
from .models import *


class AboutUSSerializer(serializers.ModelSerializer):
     class Meta:
        model = Aboutus
        fields = '__all__'
