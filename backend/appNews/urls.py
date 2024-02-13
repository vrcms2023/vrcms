from django.urls import path
from .views import *


urlpatterns = [
    path('createAppNews/', CreateAppNews.as_view(), name="create_get_App_News"),
    path('updateAppNews/<pk>/', AppNewsDetail.as_view(), name='retrieve_update_delete_App_news'),
    path('clientAppNews/', ClientAppNews.as_view(), name="get_client_Testimonials"),
    path('searchAppNews/<query>/', NewsSearchAPIView.as_view(), name="get_news_search_result")
]
