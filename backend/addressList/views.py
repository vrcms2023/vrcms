from .models import AddressList
from .serializers import AddressListSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreateAddress(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AddressList.objects.all()
    serializer_class = AddressListSerializer

    """
    Get address list, or create a new address.
    """

    def get(self, request, format=None):
        snippets = AddressList.objects.all()
        serializer = AddressListSerializer(snippets, many=True)
        return Response({"addressList": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = AddressListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"addressList": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAddressListDetail(APIView):
    """
    Retrieve, update or delete a address instance.
    """
    def get_object(self, pk):
        try:
            return AddressList.objects.get(pk=pk)
        except AddressList.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AddressListSerializer(snippet)
        return Response({"addressList": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AddressListSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"addressList": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UpdateAddressIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return AddressList.objects.get(id=obj_id)
        except (AddressList.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.address_position = item["address_position"]
            obj.save()
            instances.append(obj)

        serializer = AddressListSerializer(instances,  many=True)
        return Response({"addressList": serializer.data}, status=status.HTTP_200_OK)



""" 
Client Service View
"""
    
class ClientAddressAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AddressList.objects.all()
    serializer_class = AddressListSerializer

    """
    List all Address, or create a new Address.
    """

    def get(self, request, format=None):
        snippets = AddressList.objects.all()
        serializer = AddressListSerializer(snippets, many=True)
        return Response({"addressList": serializer.data}, status=status.HTTP_200_OK)
    
