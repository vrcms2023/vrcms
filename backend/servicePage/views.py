from operator import ge
from .models import Services, ServiceFeature, ServiceAccordion
from .serializers import ServiceSerializer, ServiceFeatureSerializer, ServiceAccordionSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_service_data_From_request_Object 
from common.CustomPagination import CustomPagination

# Create your views here.

class CreateService(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer

    """
    List all services, or create a new services.
    """

    def get(self, request, format=None):
        snippets = Services.objects.all().order_by('service_postion')
        serializer = ServiceSerializer(snippets, many=True)
        return Response({"services": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ServiceSerializer(data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
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
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"services": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdateServiceIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return Services.objects.get(id=obj_id)
        except (Services.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.service_postion = item["service_postion"]
            obj.save()
            instances.append(obj)

        serializer = ServiceSerializer(instances,  many=True)
        return Response({"services": serializer.data}, status=status.HTTP_200_OK)

""" 
publish services View
"""
class PublishServiceAPIView(generics.RetrieveUpdateAPIView):

    def patch(self, request, pk, format=None):
        snippet = Services.objects.get(pk=pk)
        serializer = ServiceSerializer(snippet, data=request.data, partial=True)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"services" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

""" 
Client Service View
"""
class ClientServiceAPIView(generics.ListCreateAPIView):
    queryset = Services.objects.all().order_by("-created_at")
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    

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

class CreateFeatureService(generics.ListCreateAPIView):
    queryset = ServiceFeature.objects.all().order_by("-created_at")
    serializer_class = ServiceFeatureSerializer
    permission_classes = [permissions.IsAuthenticated]

    """
    List all services, or create a new services.
    """

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class FeatureServicesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceFeature.objects.all().order_by("-created_at")
    serializer_class = ServiceFeatureSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
    
class UpdateFeatureServiceIndex(APIView):
    """
    Bulk update page positions for PageDetails instances.
    """

    def get_object(self, obj_id):
        try:
            return ServiceFeature.objects.get(id=obj_id)
        except ServiceFeature.DoesNotExist:
            raise Http404

    def put(self, request, *args, **kwargs):
        obj_list = request.data
        if not isinstance(obj_list, list):
            return Response(
                {"error": "Expected a list of objects."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = request.user
        updated_instances = []

        for item in obj_list:
            obj = self.get_object(obj_id=item.get("id"))
            obj.updated_by = user
            obj.page_position = item.get("services_feature_position")
            obj.save()
            updated_instances.append(obj)

        serializer = ServiceFeatureSerializer(updated_instances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

"""
    Service Accordion view
"""

class CreateServiceAccordion(generics.ListCreateAPIView):
    queryset = ServiceAccordion.objects.all().order_by("-created_at")
    serializer_class = ServiceAccordionSerializer
    permission_classes = [permissions.IsAuthenticated]

    """
    List all services, or create a new services.
    """  
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

class ServicesAccordionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ServiceAccordion.objects.all().order_by("-created_at")
    serializer_class = ServiceAccordionSerializer
    permission_classes = [permissions.IsAuthenticated]
    """
    Retrieve, update or delete a services instance.
    """
    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class UpdateFeatureAccordionIndex(APIView):
    """
    Bulk update page positions for PageDetails instances.
    """

    def get_object(self, obj_id):
        try:
            return ServiceFeature.objects.get(id=obj_id)
        except ServiceFeature.DoesNotExist:
            raise Http404

    def put(self, request, *args, **kwargs):
        obj_list = request.data
        if not isinstance(obj_list, list):
            return Response(
                {"error": "Expected a list of objects."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = request.user
        updated_instances = []

        for item in obj_list:
            obj = self.get_object(obj_id=item.get("id"))
            obj.updated_by = user
            obj.page_position = item.get("services_description_position")
            obj.save()
            updated_instances.append(obj)

        serializer = ServiceAccordionSerializer(updated_instances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)