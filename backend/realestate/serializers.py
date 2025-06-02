from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields =['idprojectcategories', 'projectLabel', 'projectValue']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def remove_fields(self, fields_to_exclude=None):
      return exclude_fields(self, fields_to_exclude)

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