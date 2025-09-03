from .models import PageDetails
from .serializers import PagesAdministrationSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
import json


# Create your views here.

class CreatePages(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PageDetails.objects.all().order_by("-created_at")
    serializer_class = PagesAdministrationSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)



class UpdatePageDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PageDetails.objects.all().order_by("-created_at")
    serializer_class = PagesAdministrationSerializer

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)



class UpdateMenuIndex(APIView):
    """
    Retrieve, update or delete a address instance.
    """

    def get_object(self, obj_id):
        try:
            return PageDetails.objects.get(id=obj_id)
        except (PageDetails.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user
            obj.page_position = item["page_position"]
            obj.save()
            instances.append(obj)

        serializer = PagesAdministrationSerializer(instances,  many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

""" 
Client Service View
"""
    
class ClientMenuListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = PagesAdministrationSerializer
    pagination_class = PageDetails
  
    def get(self, request, format=None):
        snippets = PageDetails.objects.filter(is_Client_menu= True)
        serializer = PagesAdministrationSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class JSONMenuDataUpload(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PageDetails.objects.all()
    serializer_class = PagesAdministrationSerializer

    def post(self, request):  
        data = request.data
        if isinstance(data, list):
            serializer = PagesAdministrationSerializer(data=data, many=True)
        else:
            serializer = PagesAdministrationSerializer(data=data)
       
        if serializer.is_valid():
            serializer.save(created_by=self.request.user, updated_by=self.request.user)
            return Response({"message": "Menu uploaded successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)