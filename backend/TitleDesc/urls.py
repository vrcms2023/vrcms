# urls.py
from django.urls import path
from .views import (
    TitleDescriptionListCreateView,
    TitleDescriptionRetrieveUpdateDestroyView,
)

urlpatterns = [
    # POST (create), GET (list)
    path('titleDescription/', TitleDescriptionListCreateView.as_view(), name='title-description-list-create'),
    
    # GET (detail), PUT/PATCH (update), DELETE
    path('titleDescription/<uuid:pk>/', TitleDescriptionRetrieveUpdateDestroyView.as_view(), name='title-description-detail'),
]
