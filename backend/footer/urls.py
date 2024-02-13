from django.urls import path
from .views import *


urlpatterns = [
    path('createAddress/', CreateAddress.as_view(), name="create_get_Address"),
    path('updateAddress/<pk>/', UpdateAddressDetail.as_view(), name='retrieve_update_delete_Address'),
    path('getClientAddress/', ClientAddressAPIView.as_view(), name="get_client_Address"),
    path('createTermsAndCondition/', CreateTermsAndConditions.as_view(), name="create_get_TermsAndCondition"),
    path('updateTermsAndCondition/<pk>/', UpdateTermsAndConditions.as_view(), name='retrieve_update_delete_TermsAndCondition'),
    path('getTermsAndCondition/', ClientTermsAndConditionAPIView.as_view(), name="get_client_TermsAndCondition"),
    path('createGoogleMapURL/', CreateGoogleMAPURL.as_view(), name="create_get_Google_Map_URL"),
    path('updateGoogleMapURL/<pk>/', UpdateGoogleMAPURL.as_view(), name='retrieve_update_delete_Google_Map_URL'),
    path('getGoogleMapURL/', GoogleMAPURLAPIView.as_view(), name="get_client_Google_Map_URL"),
]
