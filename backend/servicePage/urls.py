from django.urls import path
from .views import *


urlpatterns = [
    path('createService/', CreateService.as_view(), name="create_get_Services"),
    path('updateService/<pk>/', ServicesDetail.as_view(), name='retrieve_update_delete_Service'),
    path('updateServiceIndex/', UpdateServiceIndex.as_view(), name="update_index"),
    path('createServiceFeatures/', CreateFeatureService.as_view(), name="create_get_Service_Feature"),
    path('updateServiceFeatureIndex/', UpdateFeatureServiceIndex.as_view(), name="update_feature_index"),
    path('updateFeatureService/<pk>/', FeatureServicesDetail.as_view(), name='retrieve_update_delete_Service_Feature'),
    path('createServiceAccordion/', CreateServiceAccordion.as_view(), name="create_get_Service_Accordion"),
    path('updateFeatureAccordion/<pk>/', ServicesAccordionDetail.as_view(), name='retrieve_update_delete_Service_Accordion'),
    path('publishService/<pk>/', PublishServiceAPIView.as_view(), name="publishServices"),
    path('clientServiceList/', ClientServiceAPIView.as_view(), name="get_client_ServiceList"),
    path('getSelectedClientService/<id>/', ClientSelectedServiceAPIView.as_view(), name="get_client_selected_service"),
    path('getClientHomePageService/', ClientHomePageServiceListAPIView.as_view(), name="get_client_home_page_service")
    
]
