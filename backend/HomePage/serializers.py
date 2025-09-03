from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class CarouselSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = Carousel
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")



class HomeIntroSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)
    
    class Meta:
        model = HomeIntro
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")


class ClientLogoSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = ClientLogo
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

