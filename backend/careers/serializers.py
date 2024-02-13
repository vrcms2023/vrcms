from rest_framework import serializers
from .models import *


class CareerSerializer(serializers.ModelSerializer):
     class Meta:
        model = Careers
        fields = '__all__'
