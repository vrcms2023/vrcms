from django.urls import path
from .views import *


urlpatterns = [
    path('createAddress/', CreateAddress.as_view(), name="create_get_Address"),
    path('updateAddress/<pk>/', UpdateAddressListDetail.as_view(), name='retrieve_update_delete_Address'),
    path('getClientAddress/', ClientAddressAPIView.as_view(), name="get_client_Address"),
    path('updateindex/<pk>/', UpdateAddressIndex.as_view(), name="update_index"),
]
