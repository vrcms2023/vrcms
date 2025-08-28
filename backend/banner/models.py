from django.db import models
from common.BaseModel import FileUpload

# Create your models here.
class Banner(FileUpload):
    pageType = models.CharField(max_length=100, null=True, blank=True)
    banner_title = models.CharField(max_length=100, null=True, blank=True)
    banner_subTitle = models.CharField(max_length=100, null=True, blank=True)
    banner_descripiton = models.CharField(max_length=5000, null=True, blank=True)
    moreLink = models.CharField(max_length=100, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "banner"

    def __str__(self):
        return f"{self.pageType} - {self.banner_title or 'No Title'}"