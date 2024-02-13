from .models import Address, TermsandCondition, googleMAPURL
from .serializers import AddressSerializer, TermsAndConditionsSerializer, GoogleMAPURLSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreateAddress(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    """
    Get address, or create a new address.
    """

    def get(self, request, format=None):
        snippets = Address.objects.all()
        serializer = AddressSerializer(snippets, many=True)
        return Response({"address": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"address": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateAddressDetail(APIView):
    """
    Retrieve, update or delete a address instance.
    """
    def get_object(self, pk):
        try:
            return Address.objects.get(pk=pk)
        except Address.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AddressSerializer(snippet)
        return Response({"address": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AddressSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"address": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CreateTermsAndConditions(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    """
    Get address, or create a Terms and conditions
    """

    def get(self, request, format=None):
        snippets = TermsandCondition.objects.all()
        serializer = TermsAndConditionsSerializer(snippets, many=True)
        return Response({"terms": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = TermsAndConditionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"terms": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateTermsAndConditions(APIView):
    """
    Retrieve, update or delete a Terms and Condition instance.
    """
    def get_object(self, pk):
        try:
            return TermsandCondition.objects.get(pk=pk)
        except TermsandCondition.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = TermsAndConditionsSerializer(snippet)
        return Response({"terms": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = TermsAndConditionsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"terms": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CreateGoogleMAPURL(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = googleMAPURL.objects.all()
    serializer_class = GoogleMAPURLSerializer

    """
    Get address, or create a Google Map URL
    """

    def get(self, request, format=None):
        snippets = googleMAPURL.objects.all()
        serializer = GoogleMAPURLSerializer(snippets, many=True)
        return Response({"mapURL": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = GoogleMAPURLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mapURL": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateGoogleMAPURL(APIView):
    """
    Retrieve, update or delete a Google MAP URL
    """
    def get_object(self, pk):
        try:
            return googleMAPURL.objects.get(pk=pk)
        except googleMAPURL.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GoogleMAPURLSerializer(snippet)
        return Response({"mapURL": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = GoogleMAPURLSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mapURL": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



""" 
Client Service View
"""
    
class ClientAddressAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    """
    List all Address, or create a new Address.
    """

    def get(self, request, format=None):
        snippets = Address.objects.all()
        serializer = AddressSerializer(snippets, many=True)
        return Response({"address": serializer.data}, status=status.HTTP_200_OK)
    


class ClientTermsAndConditionAPIView(generics.CreateAPIView):
        permission_classes = [permissions.AllowAny]
        queryset = TermsandCondition.objects.all()
        serializer_class = TermsAndConditionsSerializer

        """
        List all Address, or create a new Terms and Condition.
        """

        def get(self, request, format=None):
            snippets = TermsandCondition.objects.all()
            serializer = TermsAndConditionsSerializer(snippets, many=True)
            return Response({"terms": serializer.data}, status=status.HTTP_200_OK)
        


class GoogleMAPURLAPIView(generics.CreateAPIView):
        permission_classes = [permissions.AllowAny]
        queryset = googleMAPURL.objects.all()
        serializer_class = GoogleMAPURLSerializer

        """
        List all Address, or create a new Terms and Condition.
        """

        def get(self, request, format=None):
            snippets = googleMAPURL.objects.all()
            serializer = GoogleMAPURLSerializer(snippets, many=True)
            return Response({"mapURL": serializer.data}, status=status.HTTP_200_OK)