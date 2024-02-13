from rest_framework import serializers
from .models import *


class CarouselSerializer(serializers.ModelSerializer):
     class Meta:
        model = Carousel
        fields = '__all__'

class HomeIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeIntro
        fields = '__all__'


class ClientLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientLogo
        fields = '__all__'