from .models import Services, ServiceFeature, ServiceAccordion
from .serializers import ServiceSerializer, ServiceFeatureSerializer, ServiceAccordionSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_service_data_From_request_Object 

# Create your views here.

class CreateService(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer

    """
    List all services, or create a new services.
    """

    def get(self, request, format=None):
        snippets = Services.objects.all()
        serializer = ServiceSerializer(snippets, many=True)
        return Response({"services": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"services": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServicesDetail(APIView):
    """
    Retrieve, update or delete a services instance.
    """
    def get_object(self, pk):
        try:
            return Services.objects.get(pk=pk)
        except Services.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ServiceSerializer(snippet)
        return Response({"services": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ServiceSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"services": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" 
publish services View
"""
class PublishServiceAPIView(generics.RetrieveUpdateAPIView):

    def patch(self, request, pk, format=None):
        snippet = Services.objects.get(pk=pk)
        serializer = ServiceSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"services" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

""" 
Client Service View
"""
class ClientServiceAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceSerializer
  
    def get_object(self):
        try:
            return Services.objects.filter(publish= True)
        except Services.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
      
        snippets = self.get_object()
        serviceList = ServiceSerializer(snippets, many=True)
        return Response({"services" : serviceList.data}, status=status.HTTP_200_OK)
    

class ClientSelectedServiceAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    service_serializer_class = ServiceSerializer
    service_feature_serializer_class = ServiceFeatureSerializer
    service_accordion_serializer_class = ServiceAccordionSerializer
  
    def get_object(self, id):
        try:
            return Services.objects.filter(id=id)
        except Services.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id, format=None):
      try:
        # snippets = self.get_object(id)
        # serviceList = ServiceSerializer(snippets, many=True)

        # service_query_set = Services.objects.filter(serviceID=id)
        # service_serializer = self.service_serializer_class(service_query_set, many=True)

        service_feature_query_set = ServiceFeature.objects.filter(serviceID=id)
        service_feature_serializer = self.service_feature_serializer_class(service_feature_query_set, many=True)

        # service_accordion_query_set = ServiceAccordion.objects.filter(serviceID=id)
        # service_accordion_serializer = self.service_accordion_serializer_class(service_accordion_query_set, many=True)
            
        return Response({"servicesFeatures" : service_feature_serializer.data}, status=status.HTTP_200_OK)
      except Exception as e:
           return Response({'error' : str(e)},status=500)
          
class ClientHomePageServiceListAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    service_serializer_class = ServiceSerializer
    service_feature_serializer_class = ServiceFeatureSerializer
    service_accordion_serializer_class = ServiceAccordionSerializer

    def get_object(self):
        try:
            return Services.objects.filter(publish= True)
        except Services.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        snippets = self.get_object()
        serializer = ServiceSerializer(snippets, many=True)

        featureSnippets = ServiceFeature.objects.all()
        featureSerializer = ServiceFeatureSerializer(featureSnippets, many=True)

        return Response({"services": serializer.data , "serviceSection" : featureSerializer.data}, status=status.HTTP_200_OK)
  

"""
    Service Features view
"""

class CreateFeatureService(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ServiceFeature.objects.all()
    serializer_class = ServiceFeatureSerializer

    """
    List all services, or create a new services.
    """

    def get(self, request, format=None):
        snippets = ServiceFeature.objects.all()
        serializer = ServiceFeatureSerializer(snippets, many=True)
        return Response({"servicesFeatures": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        requestObj = get_service_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
        serializer = ServiceFeatureSerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"servicesFeatures": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeatureServicesDetail(APIView):
    """
    Retrieve, update or delete a services instance.
    """
    def get_object(self, pk):
        try:
            return ServiceFeature.objects.get(pk=pk)
        except ServiceFeature.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ServiceFeatureSerializer(snippet)
        return Response({"servicesFeatures": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_service_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = ServiceFeatureSerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"servicesFeatures": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


"""
    Service Accrodion view
"""

class CreateServiceAccordion(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ServiceAccordion.objects.all()
    serializer_class = ServiceAccordionSerializer

    """
    List all services, or create a new services.
    """

    def get(self, request, format=None):
        snippets = ServiceAccordion.objects.all()
        serializer = ServiceAccordionSerializer(snippets, many=True)
        return Response({"servicesAccordion": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ServiceAccordionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"servicesAccordion": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServicesAccordionDetail(APIView):
    """
    Retrieve, update or delete a services instance.
    """
    def get_object(self, pk):
        try:
            return ServiceAccordion.objects.get(pk=pk)
        except ServiceAccordion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ServiceAccordionSerializer(snippet)
        return Response({"servicesAccordion": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ServiceAccordionSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"servicesAccordion": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)