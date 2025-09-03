from django.urls import path
from .views import *


urlpatterns = [
    path('createAddress/', AddressListCreateView.as_view(), name="create_get_Address"),
    path('updateAddress/<pk>/', AddressUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Address'),
    path('getClientAddress/', ClientAddressView.as_view(), name="get_client_Address"),
    
    path('createTermsAndCondition/', TermsAndConditionsListCreateView.as_view(), name="create_get_TermsAndCondition"),
    path('updateTermsAndCondition/<pk>/', TermsAndConditionsUpdateAndDeleteView.as_view(), name='retrieve_update_delete_TermsAndCondition'),
    path('getTermsAndCondition/', ClientTermsAndConditionView.as_view(), name="get_client_TermsAndCondition"),

    path('createGoogleMapURL/', GoogleMAPURLListCreateView.as_view(), name="create_get_Google_Map_URL"),
    path('updateGoogleMapURL/<pk>/', GoogleMAPURLUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Google_Map_URL'),
    path('getGoogleMapURL/', ClientGoogleMAPURLView.as_view(), name="get_client_Google_Map_URL"),
]
