from django.urls import path
from .views import *


urlpatterns = [
    path('categorylist/', ProjectCategoryAPIView.as_view(), name="categorylist"),
    path('createCategory/', CategoryAPIView.as_view(), name="create_get_category"),
    path('updateCategory/<pk>/', UpdateCategoryAPIView.as_view(), name='retrieve_update_delete_category'),
    path('clientCategory/', GetAllClientCategoryView.as_view(), name="client_get_category"),


    path('addProject/', addProjectAPIView.as_view(), name="add_Project"),
    path('editProject/<pk>/', editUpdateProjectAPIView.as_view(), name="add_Project"),
    path('getDashboardProject/', dashBoardProjectAPIView.as_view(), name="DashBoardProject"),
    path('publishProject/<pk>/', publishProjectAPIView.as_view(), name="publishProject"),
    path('archiveProject/<pk>/', archiveProjectAPIView.as_view(), name="archiveProject"),
    path("amenities/", addFeatureAndAmenities.as_view(), name="addFeatureAndAmenities"),
    path("getAmenitiesById/<id>/", updateFeatureAndAmenities.as_view(), name="updateFeatureAndAmenities"),
    path("specification/", addSpecificationView.as_view(), name="addSpecification"),
    path("getSpecification/<id>/", getSpecificationView.as_view(), name="getSpecification"),
    path("updatespecification/<id>/", updateSpecificationsView.as_view(), name="updateSpecificationsView"),
    path("deleteSpecifications/<id>/", deleteSpecificationsView.as_view(), name="deleteSpecifications"),
    path('clientProject/', ClientProjectAPIView.as_view(), name="get_client_Project"),
    path('getSelectedClientProject/<id>/', ClientSelectedProjectAPIView.as_view(), name="get_client_selected_Project"),
]
