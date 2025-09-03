from .models import AddressList
from .serializers import AddressListSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404


# Create your views here.
class AddressListCreateView(generics.ListCreateAPIView):
    queryset = AddressList.objects.all().order_by("-created_at")
    serializer_class = AddressListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Retrieve, Update, Delete
class AddressUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AddressList.objects.all().order_by("-created_at")
    serializer_class = AddressListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Retrieve
class ClientAddressAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = AddressList.objects.all().order_by("-created_at")
    serializer_class = AddressListSerializer



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
            obj.updated_by = user
            obj.address_position = item["address_position"]
            obj.save()
            instances.append(obj)

        serializer = AddressListSerializer(instances,  many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


