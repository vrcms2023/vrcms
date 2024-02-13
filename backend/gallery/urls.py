from django.urls import path, include, re_path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
    
# from rest_framework import routers
# router = routers.DefaultRouter()
# router.register(r'gallery', ImageGalleryView, basename='gallery')

urlpatterns = [
    path('createGallery/', ImageGalleryView.as_view({'post': 'create'}), name="create-image"),
    path('getSelectedImagesById/', GetImagesView.as_view({'get': 'list'}), name="get-image"),
    path('updateGalleryDetails/<pk>/', UpdateGalleryViewSet.as_view({'patch': 'update'}), name="update-image"),
    path('deleteGalleryImage/<pk>/', DeleteImageGalleryViewSet.as_view({'delete': 'destroy'}), name="delete-image"),
]