from rest_framework import serializers
from .models import *


class UserPermissionsSerializer(serializers.ModelSerializer):
     class Meta:
         model = UserPermissions
         fields = '__all__'
