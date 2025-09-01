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
  
    def get_object(self, query):
        try:
            return AppNews.objects.filter(Q(news_title__icontains=query)
                # Q(news_title__icontains=query) | Q(news_description__icontains=query)
            )
        except AppNews.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = AppNewsSerializer(snippet, many=True)
        return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)
    
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
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.news_position = item["news_position"]
            obj.save()
            instances.append(obj)

        serializer = AppNewsSerializer(instances,  many=True)
        
        return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)
       