from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from .serializers import UserSerializer
from .models import User
from djoser.views import UserViewSet
from rest_framework.permissions import IsAdminUser


# Create your views here.

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response("Success : CSRF cookie set",status=status.HTTP_200_OK)


class RetrieveUpdateAPIView(RetrieveUpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated]

    def put(self, request, id):
        try:
            is_appAccess = request.data['is_appAccess']
            User.objects.filter(id=id).update(is_appAccess=is_appAccess)
            data = User.objects.get(id=id)
            serializer = UserSerializer(data)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Unable to updated '},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AdminUserViewSet(UserViewSet):
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        print("Deleting user...")
        user = self.get_object()
        user.delete()
        return Response({"detail": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
