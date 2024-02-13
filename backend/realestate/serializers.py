from rest_framework import serializers
from .models import *


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields =['idprojectcategories', 'projectLabel', 'projectValue']

class ProjectsSerializer(serializers.ModelSerializer):
     class Meta:
        model = Projects
        fields = '__all__'
       
class FeatureAndAmenitiesSerializer(serializers.ModelSerializer):
     class Meta:
        model = FeatureAndAmenities
        fields = '__all__'

class SpecificationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Specifications
        fields = '__all__'