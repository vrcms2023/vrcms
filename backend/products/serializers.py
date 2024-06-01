from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
     category_fileuplod = serializers.FileField(max_length=None, allow_empty_file=True, allow_null=True, required=False)
     class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
     class Meta:
        model = Product
        fields = '__all__'
