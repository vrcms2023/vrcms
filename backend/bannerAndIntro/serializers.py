from rest_framework import serializers
from .models import *


class BannerAndIntroSerializer(serializers.ModelSerializer):
     class Meta:
        model = BannerAndIntro
        fields = '__all__'
