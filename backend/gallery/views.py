from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import Http404
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from common.utility import get_image_data_from_request 

# Create your views here.

class ImageGalleryView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    parser_classes=[MultiPartParser, FormParser, FileUploadParser]


    def create(self, request, *args, **kwargs):
        try:
            requestObj = get_image_data_from_request(request)
            requestObj['projectID'] = request.data["projectID"]
            requestObj['created_by'] = request.data["created_by"]
  

            serializer = GallerySerializer(data=requestObj)
            if serializer.is_valid():
                serializer.save()
        
            return Response({"imageModel" : serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
           return Response({'error' : str(e)},status=500)
        

class GetImagesView(viewsets.ModelViewSet):
    queryset= Gallery.objects.none()
    serializer_class = GallerySerializer
    http_method_names = ['get', ]

    def list(self, request):
        query_params = self.request.query_params
        id = query_params.get('projectID', None)
        ctgy = query_params.get('category', None)
        try:
            query_set = Gallery.objects.filter(projectID=id,category=ctgy)
            data = self.serializer_class(query_set, many=True).data
            return Response({"fileData":data},status=status.HTTP_200_OK)
        except Exception as e:
           return Response({'error' : str(e)},status=500)
    

class UpdateGalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    http_method_names = ['patch', ]
    lookup_field = "path"

    def update(self, request, pk=None, *args, **kwargs):
       
            user = request.user
            id = request.data['id']
            instance = Gallery.objects.get(id=id)
            requestObj = get_image_data_from_request(request)
        
            serializer = self.serializer_class(instance=instance,
                                               data= requestObj, # or request.data
                                               context={'author': user},
                                               partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"imageModel" : serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteImageGalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    http_method_names = ['delete', ]

    def destroy(self, request, pk=None, *args, **kwargs):
        try:
            gallery = self.get_object()
            gallery.delete()
            return Response({"message":"Object deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


class GetClientImagesView(viewsets.ModelViewSet):
    queryset= Gallery.objects.none()
    serializer_class = GallerySerializer
    http_method_names = ['get', ]

    def list(self, request):
        query_params = self.request.query_params
        id = query_params.get('projectID', None)
        ctgy = query_params.get('category', None)
        try:
            query_set = Gallery.objects.filter(projectID=id,category=ctgy)
            data = self.serializer_class(query_set, many=True).data
            return Response({"fileData":data},status=status.HTTP_200_OK)
        except Exception as e:
           return Response({'error' : str(e)},status=500)
    