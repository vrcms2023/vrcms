from djoser.serializers import UserCreateSerializer
from user_auth.models import User
from rest_framework import serializers

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields=('id', 'email', 'is_appAccess', 'userName', 'is_admin', 'password')



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id', 'email', 'is_appAccess', 'userName', 'is_admin')