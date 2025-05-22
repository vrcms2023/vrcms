from requests import Request
from common.utility import get_advertisement_From_request_Object
from .models import AdvertisementList, AdvertisementSize
from .serializers import AdvertisementSerializer, AdvertisementSizeSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreateAdvertisement(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AdvertisementList.objects.all()
    serializer_class = AdvertisementSerializer

    """
    Get address list, or create a new address.
    """

    def get(self, request, format=None):
        snippets = AdvertisementList.objects.all()
        serializer = AdvertisementSerializer(snippets, many=True)
        return Response({"advertisementList": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        user = request.user
        requestObj = get_advertisement_From_request_Object(request)
        requestObj['created_by'] = user.userName
        serializer = AdvertisementSerializer(data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"advertisement": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class UpdateAdvertisement(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AdvertisementSize.objects.all()
    serializer_class = AdvertisementSizeSerializer
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return AdvertisementList.objects.get(pk=pk)
        except AdvertisementList.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AdvertisementSerializer(snippet)
        return Response({"advertisement": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        user = request.user
        snippet = self.get_object(pk)
        requestObj = get_advertisement_From_request_Object(request)
        requestObj['updated_by'] = user.userName
        serializer = AdvertisementSerializer(snippet, data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"advertisement": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



class CreateAdvertisementSize(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AdvertisementSize.objects.all()
    serializer_class = AdvertisementSizeSerializer

    """
    Get address list, or create a new address.
    """

    def get(self, request, format=None):
        snippets = AdvertisementSize.objects.all()
        serializer = AdvertisementSizeSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        user = request.user
        requestObj ={}
        requestObj['size'] = request.data["size"]
        requestObj['created_by'] = user.userName
        serializer = AdvertisementSizeSerializer(data=requestObj)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class UpdateAdvertisementSize(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AdvertisementSize.objects.all()
    serializer_class = AdvertisementSizeSerializer
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return AdvertisementSize.objects.get(pk=pk)
        except AdvertisementSize.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AdvertisementSizeSerializer(snippet)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        user = request.user
        snippet = self.get_object(pk)
        requestObj ={}
        requestObj['size'] = request.data["size"]
        requestObj['updated_by'] = user.userName
        serializer = AdvertisementSizeSerializer(snippet, data=requestObj)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    



class GetAllClientAdvertisementView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AdvertisementSerializer
    
    def get(self, request, format=None):
        snippets = AdvertisementList.objects.filter(showAndHide=True)
        serializer = AdvertisementSerializer(snippets, many=True)
       
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class GetClientAdvertisementSizeView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = AdvertisementSizeSerializer
    
    def get(self, request, format=None):
        snippets = AdvertisementSize.objects.all()
        serializer = AdvertisementSizeSerializer(snippets, many=True)
       
        return Response(serializer.data, status=status.HTTP_200_OK)