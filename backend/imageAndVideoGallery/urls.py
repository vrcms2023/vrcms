from django.urls import path
from .views import *


urlpatterns = [
    path('createVidoeGallery/', VideoGalleryAPIView.as_view(), name="create_get_VideoGallery"),
    path('createVidoeGallery/<category>/', VideoGalleryAPIView.as_view(), name='get_VideoGallery_by_category'),
    path('updateVidoeGallery/<pk>/',VideoGalleryUpdateAndDeleteView.as_view(), name='retrieve_update_delete_VideoGallery'),
    path('clientVidoeGallery/<category>/', ClientVideoGalleryView.as_view(), name="get_client_VideoGallery"),
    path('updateVideoIndex/', UpdateClientVideoIndex.as_view(), name="update_gallery_index"),

    path('createImageGallery/', ImageGalleryAPIView.as_view(), name="create_get_ImageGallery"),
    path('createImageGallery/<category>/', ImageGalleryAPIView.as_view(), name='get_VideoGallery_by_category'),
    path('updateImageGallery/<pk>/',ImageGalleryUpdateAndDeleteView.as_view(), name='retrieve_update_delete_VideoGallery'),
    path('clientImageGallery/<category>/', ClientImageGalleryView.as_view(), name="get_client_VideoGallery"),
    path('updateImageIndex/', UpdateClientImageIndex.as_view(), name="update_gallery_index")

]
