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
from common.CustomPagination import CustomPagination


# Create your views here.

class CarouselAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = CarouselSerializer
     queryset = Carousel.objects.all()

     def get_object(self, category):
        try:
              return Carousel.objects.filter(
                Q(category__icontains=category)
            )
        except (Carousel.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        

     """
     List all Carousel, or create a new Carousel.
     """
        
     def get(self, request, format=None):
        #snippets = self.get_object(category)
        snippets = Carousel.objects.all()
        serializer = CarouselSerializer(snippets, many=True)
        return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)
        
     def post(self, request, format=None):
        requestObj = get_carousel_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
        serializer = CarouselSerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"carousel": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CarouselUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a carousel instance.
    """
    def get_object(self, pk):
        try:
            return Carousel.objects.get(pk=pk)
        except Carousel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CarouselSerializer(snippet)
        return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_carousel_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = CarouselSerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
   
class ClientCarouselView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer

    """
    List all carousel, or create a new carousel.
    """
 
    def get(self, request, format=None):
        snippets = Carousel.objects.all()
        serializer = CarouselSerializer(snippets, many=True)
        return Response({"carousel": serializer.data}, status=status.HTTP_200_OK)
    
class ClientCarouselViewByCategory(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer

    """
    List all carousel, or create a new carousel.
    """
    def get_object(self, category):
        try:
              return Carousel.objects.filter(
                Q(category__icontains=category)
            )
        except (Carousel.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        


    def get(self, request, category, format=None):
        snippets = self.get_object(category)
        serializer = CarouselSerializer(snippets, many=True)
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

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = HomeIntroSerializer(snippet)
        return Response({"intro": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = HomeIntroSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"intro": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
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
    
'''
    ------------------------------------------------ Client Images section ------------------------------------------------------
'''


class ClientLogoAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = ClientLogoSerializer
     queryset = ClientLogo.objects.all()
     pagination_class = CustomPagination

     """
     List all ClientLogo, or create a new ClientLogo.
     """


     def get(self, request, format=None):
        snippets = ClientLogo.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = ClientLogoSerializer(snippets, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        serializer = ClientLogoSerializer(data=request.data)
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
    queryset = ClientLogo.objects.all()
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPagination

    """
    List all ClientLogo, or create a new ClientLogo.
    """

    def get(self, request, format=None):
        snippets = ClientLogo.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = ClientLogoSerializer(snippets, many=True)
        return Response({"clientLogo": serializer.data}, status=status.HTTP_200_OK)
    

class ClientLogoSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientLogoSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return ClientLogo.objects.filter(
                Q(client_title__icontains=query) | Q(client_description__icontains=query)
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
       