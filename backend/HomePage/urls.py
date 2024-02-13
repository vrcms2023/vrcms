from django.urls import path
from .views import *


urlpatterns = [
    path('createCarousel/', CarouselAPIView.as_view(), name="create_get_Carousel"),
    path('updateCarousel/<pk>/', CarouselUpdateAndDeleteView.as_view(), name='retrieve_update_delete_Carousel'),
    path('clientCarousel/', ClientCarouselView.as_view(), name="get_client_Carousel"),
    path('createHomeIntro/', HomeIntroAPIView.as_view(), name="create_get_HomeIntro"),
    path('updateHomeIntro/<pk>/', HomeIntroUpdateAndDeleteView.as_view(), name='retrieve_update_delete_HomeIntro'),
    path('clientHomeIntro/<pk>/', ClientHomeIntroView.as_view(), name="get_client_HomeIntro"),
    path('createClientLogo/', ClientLogoAPIView.as_view(), name="create_get_ClientLogo"),
    path('updateClientLogo/<pk>/', ClientLogoUpdateAndDeleteView.as_view(), name='retrieve_update_delete_ClientLogo'),
    path('getAllClientLogos/', ClientLogoImagesView.as_view(), name="get_client_ClientLogo"),
    path('searchClientLogos/<query>/', ClientLogoSearchAPIView.as_view(), name="get_client_logo_search_result")
]
