from django.urls import path
from .views import *


urlpatterns = [
    path('listcreate/', ContactUSAPIView.as_view(), name="create_get_Conatactus"),
    path('searchContacts/<query>/', ContacListSearchAPIView.as_view(), name="get_contact_search_result"),
    path('exportExcel/', ExportToExcel.as_view(), name='export-excel'),
    path('sendRequesttoClient/', SendEnquierytoCustomer.as_view(), name='send-request-to-client'),
    # path("generate-qr/", GenerateQRCodeView.as_view(), name="generate_qr"),
    path('createBrochures/', BrochuresListCreateView.as_view(), name="create_get_Brochures"),
    path('updateBrochures/<pk>/', BrochuresUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Brochures'),
    path('clientBrochures/', ClientBrochuresView.as_view(), name="get_client_Brochures"),
    path('raqform/', RaqFormAPIView.as_view(), name="create_get_Raq_form"),
    path('raqsearchContacts/<query>/', RaqSearchAPIView.as_view(), name="get_raq_search_result"),
    path('raqexportExcel/', RaqExportToExcel.as_view(), name='raq-export-excel'),
    path('raqDeleteRecord/<pk>/', RaqDeleteAPIView.as_view(), name='raq-delete-record'),
]
