from django.urls import path
from .views import *


urlpatterns = [
    path('createAdvertisement/', CreateAdvertisement.as_view(), name="create_get_Advertisement"),
    path('updateAdvertisement/<pk>/', UpdateAdvertisement.as_view(), name='retrieve_update_delete_Advertisement'),
]
