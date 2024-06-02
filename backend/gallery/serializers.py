from rest_framework import serializers

from common.utility import exclude_fields
from .models import *


class GallerySerializer(serializers.ModelSerializer):
     
      def get_original_name(self,instance):

        filename = instance.name
        if not filename == '':
            return os.path.splitext(filename)[0]
        return ''
    
      def get_content_type(self,instance):

        filename = instance.name
        if not filename == '':
            return os.path.splitext(filename)[1]
        return ''
     
      def update(self, instance, validated_data):
        
        instance.path = validated_data.get('path', instance.path)
        instance.category = validated_data.get('category', instance.category)
        instance.originalname = self.get_original_name(instance.path)
        instance.contentType = self.get_content_type(instance.path)
        instance.imageTitle = validated_data.get('imageTitle', instance.imageTitle)
        instance.imageDescription = validated_data.get('imageDescription', instance.imageDescription)
        instance.updated_by = validated_data.get('updated_by', instance.updated_by)
  
        instance.save()
        return instance
    
      class Meta:
        model = Gallery
        fields = '__all__'

      def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)
       
