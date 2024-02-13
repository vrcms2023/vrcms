from django.urls import path
from .views import *


urlpatterns = [
    path('createPermissions/', CreateUserPermissions.as_view(), name="create_get_user_permissions"),
    path('updatePermissions/<pk>/', UpdateUserPermissions.as_view(), name='retrieve_update_delete_user_permissions')
]
