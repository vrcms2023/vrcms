from django.db import models
import uuid
from common.BaseModel import BaseModel


# Create your models here.
class ShowHideComponents(BaseModel):
        componentName =   models.CharField(max_length=500 )
        visibility =      models.BooleanField(default=True)
        pageType =        models.CharField(max_length=200, null=False, blank=False )

        class Meta:
                unique_together = ('componentName', 'pageType')
                db_table = "show_hide_components"


        def __str__(self):
                return f"{self.componentName} ({self.pageType})"