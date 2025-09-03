from os import read
import re
from rest_framework import serializers
from .models import *
from common.utility import exclude_fields

class OurTeamSerializer(serializers.ModelSerializer):
   created_by = serializers.CharField(source="created_by.email", read_only=True)
   updated_by = serializers.CharField(source="updated_by.email", read_only=True)
   
   class Meta:
        model = OurTeam
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

