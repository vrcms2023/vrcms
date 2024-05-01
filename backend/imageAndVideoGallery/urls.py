from django.urls import path
from .views import *


urlpatterns = [
    path('createImageVidoeGallery/', ImageAndVideoGalleryAPIView.as_view(), name="create_get_ImageAndVideoGallery"),
    path('createImageVidoeGallery/<category>/', ImageAndVideoGalleryAPIView.as_view(), name='get_ImageAndVideoGallery_by_category'),
    path('updateImageVidoeGallery/<pk>/',ImageAndVideoGalleryUpdateAndDeleteView.as_view(), name='retrieve_update_delete_ImageAndVideoGallery'),
    path('clientImageVidoeGallery/<category>/', ClientImageAndVideoGalleryView.as_view(), name="get_client_ImageAndVideoGallery"),
]
