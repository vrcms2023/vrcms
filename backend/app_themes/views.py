from django.shortcuts import get_object_or_404
from .models import  Themes
from .serializers import ThemeSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404


# Create your views here.
 
class CreateTheme(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Themes.objects.all()
    serializer_class = ThemeSerializer

    """
    List all App news, or create a themes.
    """
        
    def get(self, request, format=None):
        snippets = Themes.objects.all()
        serializer = ThemeSerializer(snippets, many=True)
        return Response({"theme": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ThemeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"theme": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateTheme(APIView):
    """
    Retrieve, update or delete a theme instance.
    """
    def get_object(self, pk):
        try:
            return Themes.objects.get(pk=pk)
        except Themes.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ThemeSerializer(snippet)
        return Response({"theme": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ThemeSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"theme": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

""" 
Client  View
"""
    
class ClientThemeAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Themes.objects.all()
    serializer_class = ThemeSerializer

    """
    List all themes
    """

    def get(self, request, format=None):
        snippets = Themes.objects.all()
        serializer = ThemeSerializer(snippets, many=True)
        return Response({"theme": serializer.data}, status=status.HTTP_200_OK)