# models/content.py
from django.db import models
from common.BaseModel import ImageUpload

class TitleDescription(ImageUpload):
    title = models.CharField(max_length=255)
    sub_title = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255)
    description = models.TextField()

    class Meta:
        verbose_name = "Title and Description"

    def __str__(self):
        return self.title
