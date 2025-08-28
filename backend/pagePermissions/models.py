from django.db import models
from common.BaseModel import BaseModel
# Create your models here.

class UserPermissions(BaseModel):
    user_name =             models.CharField(max_length=100)
    user_id =               models.CharField(max_length=50)
    user_email =            models.CharField(max_length=100)
    user_permission_list =  models.JSONField()

    class Meta:
        db_table = "user_permissions"

    def __str__(self):
        return f"{self.user_name or 'No Name'}"
