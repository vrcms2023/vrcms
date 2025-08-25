from django.urls import path
from .views import *


urlpatterns = [
    path('createPageMenu/', CreatePages.as_view(), name="create_get_page_menu"),
    path('updatePageMenu/<pk>/', UpdatePageDetails.as_view(), name='retrieve_update_delete_page_menu'),
    path('getPageMenu/', ClientMenuListAPIView.as_view(), name='get_client_page_menu'),
    path('updateindex/', UpdateMenuIndex.as_view(), name="update_index"),
    path('uploadMenuData/', JSONMenuDataUpload.as_view(), name='upload-pages'),
]
