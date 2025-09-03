# serializers.py
from rest_framework import serializers
from .models import CounterSet

class CounterSetSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = CounterSet
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

    def validate_counters(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("Maximum of 5 counters allowed.")
        return value
