from django.db import models
import uuid
from common.BaseModel import BaseModel


# Create your models here.

class AddressList(BaseModel):
        company_name =      models.CharField(max_length=100,  null=True, blank=True )
        location_title =    models.CharField(max_length=100, null=True, blank=True )
        address_dr_no =     models.CharField(max_length=50,  null=True, blank=True )
        location =          models.CharField(max_length=100, null=True, blank=True )
        street =            models.CharField(max_length=100, null=True, blank=True )
        city =              models.CharField(max_length=100, null=True, blank=True )
        state =             models.CharField(max_length=100, null=True, blank=True )
        postcode =          models.CharField(max_length=100, null=True, blank=True )
        emailid =           models.CharField(max_length=100, null=True, blank=True )
        emailid_2 =         models.CharField(max_length=100, null=True, blank=True )
        emailid_3 =         models.CharField(max_length=100, null=True, blank=True )
        phonen_number =     models.CharField(max_length=100, null=True, blank=True )
        phonen_number_2 =   models.CharField(max_length=100, null=True, blank=True )
        phonen_number_3 =   models.CharField(max_length=100, null=True, blank=True )
        address_position =  models.IntegerField(null=True, blank=True)

        class Meta:
                db_table = "address_list"

        def __str__(self):
            return f"{self.company_name or 'No Company Name'}"