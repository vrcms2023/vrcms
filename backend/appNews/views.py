from django.shortcuts import get_object_or_404
from .models import AppNews
from .serializers import AppNewsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_news_data_From_request_Object, get_custom_paginated_data
from django.db.models import Q
from common.CustomPagination import CustomPagination


# Create & List
class AppNewsListCreateView(generics.ListCreateAPIView):
    queryset = AppNews.objects.all().order_by("-news_position")
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)
    
# Retrieve, Update, Delete
class AppNewsListRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AppNews.objects.all().order_by("-news_position")
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class ClientAppNews(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AppNews.objects.all().order_by("news_position")
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination


    
    
class NewsSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        query = self.kwargs.get("query", "")
        if not query:
            return AppNews.objects.none()
        return AppNews.objects.filter(
            Q(news_title__icontains=query)          
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response( serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
class UpdateClientIndex(APIView):
    """
    Retrieve, update or delete a address instance.
    """

    def get_object(self, obj_id):
        try:
            return AppNews.objects.get(id=obj_id)
        except (AppNews.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        user = request.user
        updated_instances = []

        for item in request.data:
            obj = self.get_object(item.get("id"))
            obj.news_position = item.get("news_position")
            obj.updated_by = user
            obj.save()
            updated_instances.append(obj)

        serializer = AppNewsSerializer(updated_instances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
