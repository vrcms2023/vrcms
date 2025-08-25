from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateCounterSet.as_view(), name="create_get_CounterSet"),
    path('updateCounterlist/<pk>/', UpdateCounterDetail.as_view(), name='retrieve_update_delete_CounterSet'),
    path('getClientCounterSet/', ClientCounterSet.as_view(), name="get_client_counterSet"),
]

