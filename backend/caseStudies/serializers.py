from rest_framework import serializers
from .models import *


class CaseStudiesSerializer(serializers.ModelSerializer):
     class Meta:
        model = CaseStudies
        fields = '__all__'
