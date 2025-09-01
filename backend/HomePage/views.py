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
            obj.updated_by = user.userName
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
class HomeIntroAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = HomeIntroSerializer
     queryset = HomeIntro.objects.all()

     """
     List all intro, or create a new Intro.
     """

     def get(self, request, format=None):
        snippets = HomeIntro.objects.all()
        serializer = HomeIntroSerializer(snippets, many=True)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        user = request.user
        request.data.update({"created_by": user.userName})
        serializer = HomeIntroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"intro": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     


class HomeIntroUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a carousel instance.
    """
    def get_object(self, pk):
        try:
            return HomeIntro.objects.get(pageType=pk)
        except HomeIntro.DoesNotExist:
            raise Http404
        
    def get_object_pk(self, pk):
        try:
            return HomeIntro.objects.get(pk=pk)
        except HomeIntro.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = HomeIntroSerializer(snippet)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        user = request.user
        request.data.update({"updated_by": user.userName})
        serializer = HomeIntroSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"intro": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object_pk(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class HomeIntroListUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a carousel instance.
    """
    def get_object(self, pk):
        try:
            return HomeIntro.objects.get(pageType=pk)
        except HomeIntro.DoesNotExist:
            raise Http404
        
    def get_object_pk(self, pk):
        try:
            return HomeIntro.objects.get(pk=pk)
        except HomeIntro.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = HomeIntroSerializer(snippet)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object_pk(pk)
        user = request.user
        request.data.update({"updated_by": user.userName})
        serializer = HomeIntroSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"intro": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object_pk(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class UpdateIntorIndex(APIView):
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
            obj.updated_by = user.userName
            obj.address_position = item["intro_position"]
            obj.save()
            instances.append(obj)

        serializer = HomeIntroSerializer(instances,  many=True)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)


   
class ClientHomeIntroView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HomeIntro.objects.all()
    serializer_class = HomeIntroSerializer

    """
    List all carousel, or create a new carousel.
    """
    def get_object(self, pk):
        try:
            return HomeIntro.objects.get(pageType=pk)
        except HomeIntro.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = HomeIntroSerializer(snippet)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)

class ClientHomeIntroListView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = HomeIntro.objects.all()
    serializer_class = HomeIntroSerializer

    """
    List all carousel, or create a new carousel.
    """
    def get_object(self, pageType):
        try:
            return HomeIntro.objects.filter(pageType=pageType)
        except HomeIntro.DoesNotExist:
            raise Http404

    def get(self, request, pageType, format=None):
        snippet = self.get_object(pageType)
        serializer = HomeIntroSerializer(snippet, many=True)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)
    
'''
    ------------------------------------------------ Client Images section ------------------------------------------------------
'''


class ClientLogoAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = ClientLogoSerializer
     queryset = ClientLogo.objects.all().order_by('client_position',"-created_at")
     pagination_class = CustomPaginationForImageGallery

     """
     List all ClientLogo, or create a new ClientLogo.
     """


     def get(self, request, format=None):
        snippets = ClientLogo.objects.all().order_by('client_position',"-created_at")
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = ClientLogoSerializer(snippets, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        serializer = ClientLogoSerializer(data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"clientLogo": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ClientLogoUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a carousel instance.
    """
    def get_object(self, pk):
        try:
            return ClientLogo.objects.get(pk=pk)
        except ClientLogo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ClientLogoSerializer(snippet)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ClientLogoSerializer(snippet, data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientLogoImagesView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = ClientLogo.objects.all().order_by('client_position')
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPaginationForImageGallery
   
    """
    List all ClientLogo, or create a new ClientLogo.
    """

    def get(self, request, format=None):
        snippets = ClientLogo.objects.all().order_by('client_position',"-created_at")
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = ClientLogoSerializer(snippets, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)

class AllClientLogoImagesView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = ClientLogo.objects.all().order_by('client_position',"-created_at")
    serializer_class = ClientLogoSerializer
    """
    List all ClientLogo, or create a new ClientLogo.
    """

    def get(self, request, format=None):
        snippets = ClientLogo.objects.all().order_by('client_position',"-created_at")
        serializer = ClientLogoSerializer(snippets, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
    

class ClientLogoSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPaginationForImageGallery
  
    def get_object(self, query):
        try:
            return ClientLogo.objects.filter( Q(client_title__icontains=query)
                # Q(client_title__icontains=query) | Q(client_description__icontains=query)
            )
        except ClientLogo.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = ClientLogoSerializer(snippet, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
    


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
            obj.updated_by = user.userName
            obj.client_position = item["client_position"]
            obj.save()
            instances.append(obj)

        serializer = ClientLogoSerializer(instances,  many=True)
        
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
       