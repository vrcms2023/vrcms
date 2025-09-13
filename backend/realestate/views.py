from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView, ListCreateAPIView , RetrieveDestroyAPIView
from django.views.generic.edit import CreateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from common.utility import get_Category_From_request_Object
from .models import *
from gallery.models import Gallery
from gallery.serializers import GallerySerializer
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import status
from rest_framework import permissions
from collections import OrderedDict
from django.db.models import Q
from rest_framework import generics, permissions
from django.http import Http404

"""
Project Category View
"""

class CategoryAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("-created_at")
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)
    

class UpdateCategoryAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all().order_by("-created_at")
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    """
    Retrieve, update or delete a App News instance.
    """
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
    
class GetAllClientCategoryView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

"""
Project 
Add Project View
"""
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Projects.objects.all().order_by("-created_at")
    serializer_class = ProjectsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

"""
Project 
Get client Project View
"""
class GetClientProjectViewSet(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Projects.objects.all().order_by("-created_at")
    serializer_class = ProjectsSerializer

   
        
""" 
Client Project View
"""

class ClientSelectedProjectAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer