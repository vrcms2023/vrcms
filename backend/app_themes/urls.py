from django.urls import path
from .views import *


urlpatterns = [
    path('createTheme/', CreateTheme.as_view(), name="create_theme"),
    path('updateTheme/<pk>/', UpdateTheme.as_view(), name='retrieve_update_delete_theme'),
    path('getClientTheme/', ClientThemeAPIView.as_view(), name="get_client_theme"),
]
