from django.urls import path
from .views import *

project_list = ProjectViewSet.as_view({
    'get': 'list',        # GET /projects/ → list all
    'post': 'create'      # POST /projects/ → create
})

project_detail = ProjectViewSet.as_view({
    'get': 'retrieve',    # GET /projects/<id>/ → get one
    'put': 'update',      # PUT /projects/<id>/ → full update
    'patch': 'partial_update',  # PATCH /projects/<id>/ → partial update
    'delete': 'destroy'   # DELETE /projects/<id>/ → delete
})

urlpatterns = [  
    path('createCategory/', CategoryAPIView.as_view(), name="create_get_category"),
    path('updateCategory/<pk>/', UpdateCategoryAPIView.as_view(), name='retrieve_update_delete_category'),
    path('clientCategory/', GetAllClientCategoryView.as_view(), name="client_get_category"),

    path('addProject/', project_list, name="project-list"),
    path('addProject/<uuid:pk>/', project_detail, name="project-detail"),
    path('getClientProject/<uuid:pk>/', GetClientProjectViewSet.as_view(), name="get_project-detail"),

    path('clientProject/', GetClientProjectViewSet.as_view(), name="get_client_Project"),
    path('getSelectedClientProject/<uuid:pk>/', ClientSelectedProjectAPIView.as_view(), name="get_client_selected_Project"),
]
