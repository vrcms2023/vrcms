from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CarouselSerializer, HomeIntroSerializer, ClientLogoSerializer
from .models import Carousel, HomeIntro, ClientLogo
from rest_framework import status
from django.http import Http404
from common.utility import get_carousel_data_From_request_Object, get_custom_paginated_data
from django.db.models import Q
from common.CustomPaginationForImageGallery import CustomPaginationForImageGallery


# Create your views here.

class CarouselAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CarouselSerializer
    pagination_class = CustomPaginationForImageGallery

    def get_queryset(self):       
        category = self.kwargs.get("category")       
        if category:
            return Carousel.objects.filter(category=category).order_by('-created_at')                 
        return Carousel.objects.none()  # prevent listing all without category

    def create(self, request, *args, **kwargs):
        # Save the new object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_instance = serializer.save(created_by=self.request.user, updated_by=self.request.user)
       
        return Response({"carousel":self.get_serializer(saved_instance).data}, status=status.HTTP_201_CREATED)

class CarouselUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer
    pagination_class = CustomPaginationForImageGallery

    """
    Retrieve, update or delete a carousel instance.
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
        return Response({"carousel":self.get_serializer(updated_instance).data}, status=status.HTTP_200_OK)


class UpdateCarouselIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return Carousel.objects.get(id=obj_id)
        except (Carousel.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user
            obj.carouse_position = item["carouse_position"]
            obj.save()
            instances.append(obj)

        serializer = CarouselSerializer(instances,  many=True)
        return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)
  
class ClientCarouselViewByCategory(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CarouselSerializer
    queryset = Carousel.objects.all()
    pagination_class = CustomPaginationForImageGallery

    """
    List all carousels, optionally filter by category.
    """

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.kwargs.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)

'''
    ------------------------------------------------ Home intro section ------------------------------------------------------
'''
class HomeIntroAPIView(generics.ListCreateAPIView):
    queryset = HomeIntro.objects.all().order_by("-created_at")
    serializer_class = HomeIntroSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)
     


class HomeIntroUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HomeIntro.objects.all().order_by("-created_at")
    serializer_class = HomeIntroSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)



class UpdateIntroIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return HomeIntro.objects.get(id=obj_id)
        except (HomeIntro.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user
            obj.address_position = item["intro_position"]
            obj.save()
            instances.append(obj)

        serializer = HomeIntroSerializer(instances,  many=True)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)


   
class ClientHomeIntroView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HomeIntro.objects.all().order_by("-created_at")
    serializer_class = HomeIntroSerializer



class ClientHomeIntroListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HomeIntro.objects.all()
    serializer_class = HomeIntroSerializer

    """
    List all carousel, or create a new carousel.
    """
    def get_queryset(self):
        page_type = self.kwargs.get("pageType")
        queryset = HomeIntro.objects.filter(pageType=page_type)
        if not queryset.exists():
            raise Http404
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

'''
    ------------------------------------------------ Client Images section ------------------------------------------------------
'''


class ClientLogoAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ClientLogoSerializer
    queryset = ClientLogo.objects.all().order_by('client_position',"-created_at")
    pagination_class = CustomPaginationForImageGallery

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class ClientLogoUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClientLogo.objects.all().order_by("-created_at")
    serializer_class = ClientLogoSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPaginationForImageGallery

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)



class AllClientLogoImagesView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = ClientLogo.objects.all().order_by('client_position',"-created_at")
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPaginationForImageGallery

    

class ClientLogoSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPaginationForImageGallery
  

    def get_queryset(self):
        query = self.kwargs.get("query")
        if not query:
            return ClientLogo.objects.none()

        return ClientLogo.objects.filter(
            Q(client_title__icontains=query)
            # | Q(client_description__icontains=query)   # uncomment if needed
        ).order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class UpdateClientIndex(APIView):
    """
    Retrieve, update or delete a address instance.
    """

    def get_object(self, obj_id):
        try:
            return ClientLogo.objects.get(id=obj_id)
        except (ClientLogo.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user
            obj.client_position = item["client_position"]
            obj.save()
            instances.append(obj)

        serializer = ClientLogoSerializer(instances,  many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
