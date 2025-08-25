from django.urls import path, include, re_path
from django.views.generic import TemplateView

from .views import GetCSRFToken, RetrieveUpdateAPIView, AdminUserViewSet

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/appAccess/<int:id>/', RetrieveUpdateAPIView.as_view()),
    path('auth/deleteuser/<int:id>/', AdminUserViewSet.as_view({'delete': 'destroy'})),
    path('csrf_cookie/', GetCSRFToken.as_view())
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name="index.html"))]