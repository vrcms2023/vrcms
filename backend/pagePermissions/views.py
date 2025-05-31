from .models import UserPermissions
from .serializers import UserPermissionsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreateUserPermissions(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserPermissions.objects.all()
    serializer_class = UserPermissionsSerializer

    """
    Get Page Details, or create a new Page Details.
    """

    def get(self, request, format=None):
        snippets = UserPermissions.objects.all()
        serializer = UserPermissionsSerializer(snippets, many=True)
        return Response({"userPermissions": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = UserPermissionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"userPermissions": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserPermissions(APIView):
    """
    Retrieve, update or delete a UserPermissions instance.
    """
    def get_object_by_userID(self, pk):
        try:
            return UserPermissions.objects.get(user_id=pk)
        except UserPermissions.DoesNotExist:
            raise Http404
    
    def get_object(self, pk):
        try:
            return UserPermissions.objects.get(pk=pk)
        except UserPermissions.DoesNotExist:
            raise Http404


    def get(self, request, pk, format=None):
        snippet = self.get_object_by_userID(pk)
        serializer = UserPermissionsSerializer(snippet)
        return Response({"userPermissions": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UserPermissionsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"userPermissions": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



