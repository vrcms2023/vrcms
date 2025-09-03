from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CounterListCreateView.as_view(), name="create_get_CounterSet"),
    path('updateCounterlist/<pk>/', CounterUpdateAndDeleteView.as_view(), name='retrieve_update_delete_CounterSet'),
    path('getClientCounterSet/', ClientCounterSetView.as_view(), name="get_client_counterSet"),
]

