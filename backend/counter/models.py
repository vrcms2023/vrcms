# models.py
from django.db import models
from common.BaseModel import BaseModel

class CounterSet(BaseModel):
    title = models.CharField(max_length=255)
    counters = models.JSONField(default=list)  # Each element: { "label": "...", "counter": 0 }
