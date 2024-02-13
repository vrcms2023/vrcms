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


# Create your views here.
    
class CreateAppNews(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AppNews.objects.all()
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = AppNews.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = AppNewsSerializer(snippets, many=True)
        return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        requestObj = get_news_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
    
        serializer = AppNewsSerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"appNews": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppNewsDetail(APIView):
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return AppNews.objects.get(pk=pk)
        except AppNews.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AppNewsSerializer(snippet)
        return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_news_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = AppNewsSerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ClientAppNews(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AppNews.objects.all()
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = AppNews.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = AppNewsSerializer(snippets, many=True)
        return Response({"appNews": serializer.data}, status=status.HTTP_200_OK)
    
    
class NewsSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AppNewsSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return AppNews.objects.filter(
                Q(news_title__icontains=query) | Q(news_description__icontains=query)
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