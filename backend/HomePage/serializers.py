from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class CarouselSerializer(serializers.ModelSerializer):
     class Meta:
        model = Carousel
        fields = '__all__'

     def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)

class HomeIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeIntro
        fields = '__all__'


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = '__all__'

    def remove_fields(self, fields_to_exclude=None):
         return exclude_fields(self, fields_to_exclude)