from django.urls import path
from .views import *


urlpatterns = [
    path('', ContactUSAPIView.as_view(), name="create_get_Conatactus"),
    path('searchContacts/<query>/', ContacListSearchAPIView.as_view(), name="get_contact_search_result"),
    path('exportExcel/', ExportToExcel.as_view(), name='export-excel'),
    path('sendRequesttoClient/', SendEnquierytoCustomer.as_view(), name='send-request-to-client'),
    # path("generate-qr/", GenerateQRCodeView.as_view(), name="generate_qr"),
]
