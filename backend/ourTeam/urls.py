from django.urls import path
from .views import *


urlpatterns = [
    path('createteam/', CreateOurTeam.as_view(), name="create_get_our_team"),
    path('UpdateOurteamDetail/<pk>/', UpdateAndDeleteOurteamDetail.as_view(), name='retrieve_update_delete_our_team'),
    path('clentViewOurTeamDetails/', OurteamClientView.as_view(), name="get_client_our_team"),
    path('OurteamSearchAPIView/<query>/', OurteamSearchAPIView.as_view(), name="get_our_team_search_result"),
    path('updateTeamindex/', UpdateTeamIndex.as_view(), name="update_team_index"),
]
