# serializers.py
from rest_framework import serializers
from .models import CounterSet

class CounterSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CounterSet
        fields = ['id', 'title', 'counters']

    def validate_counters(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("Maximum of 5 counters allowed.")
        return value
