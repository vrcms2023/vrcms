from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import imageAndVideoGallerySerializer
from .models import imageAndVideoGallery
from rest_framework import status
from django.http import Http404
from common.utility import get_imageAndVidoe_data_From_request_Object
from common.utility import get_custom_paginated_data
from common.CustomPagination import CustomPagination

class ImageAndVideoGalleryAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = imageAndVideoGallerySerializer
     queryset = imageAndVideoGallery.objects.all()
     pagination_class = CustomPagination

     """
     List all imageAndVideoGallery, or create a new imageAndVideoGallery.
     """
     def get(self, request, category, format=None):
        snippets = imageAndVideoGallery.objects.filter(category = category)
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serializer = imageAndVideoGallerySerializer(snippets, many=True)
        return Response({"imageAndVideoGallery": serializer.data}, status=status.HTTP_200_OK)
        
     def post(self, request, format=None):
        requestObj = get_imageAndVidoe_data_From_request_Object(request)
        user = request.user
        requestObj['created_by'] = user.userName
        serializer = imageAndVideoGallerySerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"imageAndVideoGallery": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ImageAndVideoGalleryUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a imageAndVideoGallery instance.
    """
    def get_object(self, pk):
        try:
            return imageAndVideoGallery.objects.get(pk=pk)
        except imageAndVideoGallery.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = imageAndVideoGallerySerializer(snippet)
        return Response({"imageAndVideoGallery": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_imageAndVidoe_data_From_request_Object(request)
        user = request.user
        requestObj['updated_by'] = user.userName
        serializer = imageAndVideoGallerySerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"imageAndVideoGallery": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientImageAndVideoGalleryView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = imageAndVideoGallery.objects.all()
    serializer_class = imageAndVideoGallerySerializer
    pagination_class = CustomPagination

    """
    List all imageAndVideoGallery, or create a new imageAndVideoGallery.
    """

    def get(self, request, category, format=None):
        snippets = imageAndVideoGallery.objects.filter(category = category)
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        serializer = imageAndVideoGallerySerializer(snippets, many=True)
        return Response({"imageAndVideoGallery": serializer.data}, status=status.HTTP_200_OK)
