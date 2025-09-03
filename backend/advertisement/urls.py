from django.urls import path
from .views import *


urlpatterns = [
    path('createAdvertisement/', AdvertisementListCreateView.as_view(), name="create_get_Advertisement"),
    path('updateAdvertisement/<pk>/', AdvertisementUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Advertisement'),
    path('clientAdvertisement/', ClientAdvertisementAPIView.as_view(), name="client_get_Advertisement"),
    path('createAdvSize/', AdvertisementSizeListCreateView.as_view(), name="create_get_Adv_size"),
    path('updateAdvSize/<pk>/', AdvertisementSizeUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Adv_size'),
    path('getclientAdvSize/', ClientAdvertisementSizeAPIView.as_view(), name="client_get_Adv_size"),
]

