from django.urls import path
from .views import *


urlpatterns = [
    path('createCategory/', CreateCategory.as_view(), name="create_Category"),
    path('updateCategory/<pk>/', UpdateCategory.as_view(), name='retrieve_update_delete_Category'),
    path('getClinetCategory/', ClientCategoryAPIView.as_view(), name='get_client_Category'),
    path('createProduct/', CreateProduct.as_view(), name="create_Product"),
    path('createProduct/<categoryID>/', CreateProduct.as_view(), name="create_Product"),
    path('updateProduct/<pk>/', UpdateProduct.as_view(), name='retrieve_update_delete_Product'),
    path('getClinetProduct/<categoryID>/', ClientProductAPIView.as_view(), name='get_client_Product'),
    path('getClinetSelectedProduct/<pk>/', ClientSelectedProductAPIView.as_view(), name='get_client_selected_Product'),
    path('getClinetHomecategoryProduct/', ClientHomePageCategoryProductAPIView.as_view(), name='get_client_home_selected_Product'),
]
