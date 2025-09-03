from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AboutUSSerializer
from .models import Aboutus
from rest_framework import status
from django.http import Http404
from common.utility import get_about_us_data_From_request_Object

# Create your views here.
class AboutListCreateView(generics.ListCreateAPIView):
    queryset = Aboutus.objects.all().order_by("-created_at")
    serializer_class = AboutUSSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Retrieve, Update, Delete
class AboutusUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Aboutus.objects.all().order_by("-created_at")
    serializer_class = AboutUSSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Retrieve
class ClientAboutusView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Aboutus.objects.all().order_by("-created_at")
    serializer_class = AboutUSSerializer


