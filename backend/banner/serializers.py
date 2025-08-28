from rest_framework import serializers
from .models import Banner


class BannerSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = Banner
        fields = "__all__"
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")
