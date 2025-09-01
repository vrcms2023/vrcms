from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VideoGallerySerializer, ImageGallerySerializer
from .models import VideoGallery, ImageGallery
from rest_framework import status
from django.http import Http404
from common.CustomPaginationForImageGallery import CustomPaginationForImageGallery
from rest_framework.parsers import MultiPartParser, FormParser

class VideoGalleryAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = VideoGallerySerializer
    pagination_class = CustomPaginationForImageGallery

    def get_queryset(self):       
        category = self.kwargs.get("category")       
        if category:
            return VideoGallery.objects.filter(category=category).order_by('-created_at')                 
        return VideoGallery.objects.none()  # prevent listing all without category
    
   
    def create(self, request, *args, **kwargs):
        # Save the new object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_instance = serializer.save(created_by=self.request.user, updated_by=self.request.user)
       
        return Response({"VideoGallery":self.get_serializer(saved_instance).data}, status=status.HTTP_201_CREATED)


class VideoGalleryUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = VideoGallery.objects.all()
    serializer_class = VideoGallerySerializer
    pagination_class = CustomPaginationForImageGallery
    parser_classes = [MultiPartParser, FormParser]
    """
    Retrieve, update or delete a imageAndVideoGallery instance.
    """

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save()

        # Wrap updated object in paginated-like response
        return Response({"VideoGallery":self.get_serializer(updated_instance).data}, status=status.HTTP_200_OK)


   
class ClientVideoGalleryView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  
    serializer_class = VideoGallerySerializer
    pagination_class = CustomPaginationForImageGallery

    """
    List all VideoGallery, or create a new VideoGallery.
    """

    def get_queryset(self):       
        category = self.kwargs.get("category")       
        if category:
            return VideoGallery.objects.filter(category=category).order_by('-created_at')                 
        return VideoGallery.objects.none()  # prevent listing all without category
    

      
class UpdateClientVideoIndex(APIView):
    """
    Retrieve, update or delete a address instance.
    """

    def get_object(self, obj_id):
        try:
            return VideoGallery.objects.get(id=obj_id)
        except (VideoGallery.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.position = item["position"]
            obj.save()
            instances.append(obj)

        serializer = VideoGallerySerializer(instances,  many=True)
        
        return Response({"VideoGallery": serializer.data}, status=status.HTTP_200_OK)
       


class ImageGalleryAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ImageGallerySerializer
    pagination_class = CustomPaginationForImageGallery

    def get_queryset(self):       
        category = self.kwargs.get("category")       
        if category:
            return ImageGallery.objects.filter(category=category).order_by('-created_at')                 
        return ImageGallery.objects.none()  # prevent listing all without category
    
  
    
    def create(self, request, *args, **kwargs):
        # Save the new object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_instance = serializer.save(created_by=self.request.user, updated_by=self.request.user)
       
        return Response({"ImageGallery":self.get_serializer(saved_instance).data}, status=status.HTTP_201_CREATED)
    

class ImageGalleryUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ImageGallery.objects.all()
    serializer_class = ImageGallerySerializer
    pagination_class = CustomPaginationForImageGallery
    """
    Retrieve, update or delete a imageAndVideoGallery instance.
    """
   

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save(updated_by=self.request.user)

        # Wrap updated object in paginated-like response
        return Response({"ImageGallery":self.get_serializer(updated_instance).data}, status=status.HTTP_200_OK)


class ClientImageGalleryView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  
    serializer_class = ImageGallerySerializer
    pagination_class = CustomPaginationForImageGallery

    """
    List all VideoGallery, or create a new VideoGallery.
    """

    def get_queryset(self):       
        category = self.kwargs.get("category")       
        if category:
            return ImageGallery.objects.filter(category=category).order_by('-created_at')                 
        return ImageGallery.objects.none()  # prevent listing all without category
    



      
class UpdateClientImageIndex(APIView):
    """
    Retrieve, update or delete a address instance.
    """

    def get_object(self, obj_id):
        try:
            return ImageGallery.objects.get(id=obj_id)
        except (ImageGallery.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.position = item["position"]
            obj.save()
            instances.append(obj)

        serializer = ImageGallerySerializer(instances,  many=True)
        
        return Response({"ImageGallery": serializer.data}, status=status.HTTP_200_OK)