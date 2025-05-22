from django.urls import path
from .views import *


urlpatterns = [
    path('createAdvertisement/', CreateAdvertisement.as_view(), name="create_get_Advertisement"),
    path('updateAdvertisement/<pk>/', UpdateAdvertisement.as_view(), name='retrieve_update_delete_Advertisement'),
    path('clientAdvertisement/', GetAllClientAdvertisementView.as_view(), name="client_get_Advertisement"),
    path('createAdvSize/', CreateAdvertisementSize.as_view(), name="create_get_Adv_size"),
    path('updateAdvSize/<pk>/', UpdateAdvertisementSize.as_view(), name='retrieve_update_delete_Adv_size'),
    path('getclientAdvSize/', GetClientAdvertisementSizeView.as_view(), name="client_get_Adv_size"),
]

