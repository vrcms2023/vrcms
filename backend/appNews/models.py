from django.db import models
from common.BaseModel import ImageModel
# Create your models here.

class AppNews(ImageModel):
    news_title =     models.CharField(max_length=500, null=True, blank=True)
    news_description =     models.CharField(max_length=5000, null=True, blank=True)
    news_position =      models.IntegerField(null=True, blank=True, default=0)


    class Meta:
            db_table = "news"

    def __str__(self):
            return f"{self.news_title or 'No Title'}"
