# models.py
from django.db import models
from common.BaseModel import BaseModel

class CounterSet(BaseModel):
    title = models.CharField(max_length=255)
    counters = models.JSONField(default=list)  # Each element: { "label": "...", "counter": 0 }

    class Meta:
        db_table = "counter_set"

    def __str__(self):
            return f"{self.title or 'No Title'}"
