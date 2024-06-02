from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AboutUSSerializer
from .models import Aboutus
from rest_framework import status
from django.http import Http404
from common.utility import get_about_us_data_From_request_Object

# Create your views here.

class AboutusAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = AboutUSSerializer
     queryset = Aboutus.objects.all()

     """
     get Banner and Intro, or create a new Banner and Intro.
     """

     def get(self, request, format=None):
        snippets = Aboutus.objects.all()
        serializer = AboutUSSerializer(snippets, many=True)
        return Response({"aboutus": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        requestObj = get_about_us_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
        serializer = AboutUSSerializer(data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"aboutus": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AboutusUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a Aboutus instance.
    """
    def get_object(self, pk):
        try:
            return Aboutus.objects.get(pk=pk)
        except Aboutus.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AboutUSSerializer(snippet)
        return Response({"aboutus": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_about_us_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = AboutUSSerializer(snippet, data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"aboutus": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientAboutusView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Aboutus.objects.all()
    serializer_class = AboutUSSerializer

    """
    List all Aboutus, or create a new Aboutus.
    """

    def get(self, request, format=None):
        snippets = Aboutus.objects.all()
        serializer = AboutUSSerializer(snippets, many=True)
        return Response({"aboutus": serializer.data}, status=status.HTTP_200_OK)