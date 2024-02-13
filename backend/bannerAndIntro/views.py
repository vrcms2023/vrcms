from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BannerAndIntroSerializer
from .models import BannerAndIntro
from rest_framework import status
from django.http import Http404
from common.utility import get_banner_data_From_request_Object 

# Create your views here.


class BannerAndIntroAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = BannerAndIntroSerializer
     queryset = BannerAndIntro.objects.all()

     """
     get Banner and Intro, or create a new Banner and Intro.
     """

     def get(self, request, format=None):
        snippets = BannerAndIntro.objects.all()
        serializer = BannerAndIntroSerializer(snippets, many=True)
        return Response({"imageModel": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        requestObj = get_banner_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]

        serializer = BannerAndIntroSerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"imageModel": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BannerAndIntroUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a BannerAndIntro instance.
    """
    def get_object(self, pk):
        try:
            return BannerAndIntro.objects.get(pk=pk)
        except BannerAndIntro.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = BannerAndIntroSerializer(snippet)
        return Response({"imageModel": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_banner_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = BannerAndIntroSerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"imageModel": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GetBannerAndIntroByPageTypeView(APIView):
    """
    Retrieve BannerAndIntro instance.
    """
    def get_object(self, pk):
        try:
            return BannerAndIntro.objects.get(pageType=pk)
        except BannerAndIntro.DoesNotExist:
            raise Http404

    def get(self, request, pageType, format=None):
        snippet = self.get_object(pageType)
        serializer = BannerAndIntroSerializer(snippet)
        return Response({"imageModel": serializer.data}, status=status.HTTP_200_OK)

   


   
class ClientBannerAndIntroView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BannerAndIntro.objects.all()
    serializer_class = BannerAndIntroSerializer

    """
    List all BannerAndIntro, or create a new BannerAndIntro.
    """
    def get_object(self, pk):
        try:
            return BannerAndIntro.objects.get(pageType=pk)
        except BannerAndIntro.DoesNotExist:
            raise Http404

    def get(self, request, pageType, format=None):
        snippet = self.get_object(pageType)
        serializer = BannerAndIntroSerializer(snippet)
        return Response({"imageModel": serializer.data}, status=status.HTTP_200_OK)