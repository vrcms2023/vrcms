from django.urls import path
from .views import *


urlpatterns = [
    path('createAboutus/', AboutListCreateView.as_view(), name="create_get_Aboutus"),
    path('updateAboutus/<pk>/', AboutusUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Aboutus'),
    path('clientAboutus/', ClientAboutusView.as_view(), name="get_client_Aboutus"),
]
