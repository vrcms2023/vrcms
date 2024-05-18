from .models import PageDetails
from .serializers import PagesAdministrationSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404


# Create your views here.

class CreatePages(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PageDetails.objects.all()
    serializer_class = PagesAdministrationSerializer

    """
    Get Page Details, or create a new Page Details.
    """

    def get(self, request, format=None):
        user = request.user
        if user.is_admin:
            snippets = PageDetails.objects.all()
        else:
            snippets = PageDetails.objects.filter(is_Maintainer_menu= True)
        
        serializer = PagesAdministrationSerializer(snippets, many=True)
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = PagesAdministrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"PageDetails": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePageDetails(APIView):
    """
    Retrieve, update or delete a PageDetails instance.
    """
    def get_object(self, pk):
        try:
            return PageDetails.objects.get(pk=pk)
        except PageDetails.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PagesAdministrationSerializer(snippet)
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PagesAdministrationSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
            obj.updated_by = user.userName
            obj.page_position = item["page_position"]
            obj.save()
            instances.append(obj)

        serializer = PagesAdministrationSerializer(instances,  many=True)
        
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
       




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
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
    
