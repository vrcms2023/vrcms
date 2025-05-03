from django.urls import path
from .views import *


urlpatterns = [
    path('getbyPageType/', ShowHideComponentsByPageTypeView.as_view(),name='components-by-page-type'),
    path('getorcreate/', ShowHideComponentsGetOrCreateView.as_view(), name="components-get-or-create"),
    path('toggleVisibility/<pk>/', ShowHideComponentsGetOrCreateView.as_view(), name='toggle-component-visibility'),
    path('deleteinstance/<pk>/', DeleteShowHideComponnet.as_view(), name='delete-component'),
]
