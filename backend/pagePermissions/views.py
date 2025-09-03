from .models import UserPermissions
from .serializers import UserPermissionsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404


# Create your views here.
class UserPermissionsListCreateView(generics.ListCreateAPIView):
    queryset = UserPermissions.objects.all().order_by("-created_at")
    serializer_class = UserPermissionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


class UpdateUserPermissions(APIView):
    """
    Retrieve (by user_id), update (by pk), or delete (by pk) a UserPermissions instance.
    """

    def get_object_by_user_id(self, user_id):
        try:
            return UserPermissions.objects.get(user_id=user_id)
        except UserPermissions.DoesNotExist:
            raise Http404

    def get_object(self, pk):
        try:
            return UserPermissions.objects.get(pk=pk)
        except UserPermissions.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """Retrieve by user_id (pk here represents user_id)."""
        instance = self.get_object_by_user_id(pk)
        serializer = UserPermissionsSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        """Partial update by primary key."""
        instance = self.get_object(pk)
        serializer = UserPermissionsSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        """Delete by primary key."""
        instance = self.get_object(pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



