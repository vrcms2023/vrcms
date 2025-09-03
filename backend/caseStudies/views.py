from django.shortcuts import get_object_or_404
from .models import CaseStudies
from .serializers import CaseStudiesSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data

# Create your views here.
class CaseStudiesListCreateView(generics.ListCreateAPIView):
    queryset = CaseStudies.objects.all().order_by("-created_at")
    serializer_class = CaseStudiesSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

# Retrieve, Update, Delete
class CaseStudiesUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CaseStudies.objects.all().order_by("-created_at")
    serializer_class = CaseStudiesSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Retrieve
class ClientViewCaseStudies(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CaseStudies.objects.all().order_by("-created_at")
    serializer_class = CaseStudiesSerializer   
    pagination_class = CustomPagination

class ClientViewSelectedCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer
    lookup_field = "pk"   # default, you can omit this

    
class CaseStudiesSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CaseStudiesSerializer
    pagination_class = CustomPagination
  
    def get_queryset(self):
        query = self.kwargs.get("query", "")
        if not query:
            return CaseStudies.objects.none()
        return CaseStudies.objects.filter(
            Q(case_studies_title__icontains=query)
            | Q(case_studies_description__icontains=query)
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response( serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)