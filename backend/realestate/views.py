from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView, ListCreateAPIView , RetrieveDestroyAPIView
from django.views.generic.edit import CreateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .models import *
from gallery.models import Gallery
from gallery.serializers import GallerySerializer
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import status
from rest_framework import permissions
from collections import OrderedDict


"""
Project Category View
"""
class ProjectCategoryAPIView(ListAPIView):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer


"""
Project 
Add Project View
"""
class addProjectAPIView(APIView):

    def post(self, request, format=None):
        serializer = ProjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
""" 
edit and update Project View
"""
class editUpdateProjectAPIView(APIView):

    def get_object(self, pk):
        try:
            return Projects.objects.get(pk=pk)
        except Projects.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ProjectsSerializer(snippet)
        return Response({"project" : serializer.data}, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ProjectsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"project" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ProjectsSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"project" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

""" 
publish Project View
"""
class publishProjectAPIView(RetrieveUpdateAPIView):

    def patch(self, request, pk, format=None):
        snippet = Projects.objects.get(pk=pk)
        serializer = ProjectsSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"project" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
""" 
archive Project View
"""
class archiveProjectAPIView(RetrieveUpdateAPIView):

    def get_object(self):
        try:
            return Projects.objects.all()
        except Projects.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk, format=None):
        snippet = Projects.objects.get(pk=pk)
        serializer = ProjectsSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            snippets = self.get_object()
            serializer = ProjectsSerializer(snippets, many=True)
            return Response({"projectList" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

""" 
DashBoard Project View
"""
class dashBoardProjectAPIView(APIView):

    def get_object(self):
        try:
            return Projects.objects.all()
        except Projects.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        snippets = self.get_object()
        serializer = ProjectsSerializer(snippets, many=True)
        return Response({"projectList" : serializer.data}, status=status.HTTP_200_OK)

""" 
Add Features and Amenities  View
"""

class addFeatureAndAmenities(APIView):

    def post(self, request, format=None):
        serializer = FeatureAndAmenitiesSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"amenitie" : serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
""" 
Get and Update Features and Amenities View 
"""

class updateFeatureAndAmenities(RetrieveUpdateAPIView):

    def get_object(self, id):
        try:
            return FeatureAndAmenities.objects.get(projectID=id)
        except FeatureAndAmenities.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id, format=None):
        try:
            snippet = FeatureAndAmenities.objects.get(projectID=id)
            serializer = FeatureAndAmenitiesSerializer(snippet)
            return Response({"amenitie" : serializer.data}, status=status.HTTP_200_OK)
        except FeatureAndAmenities.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id, format=None):
        snippet = self.get_object(id)
        serializer = FeatureAndAmenitiesSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"amenitie" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

""" 
Create Specification 
"""

class addSpecificationView(ListCreateAPIView):
    queryset = Specifications.objects.all()
    serializer_class = SpecificationsSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)

        serializer = self.get_serializer(data=request.data, many=True)  
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
            return Response({"specification" : serializer.data}, status=status.HTTP_201_CREATED)  
        except:  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
 
""" 
Get Specification 
"""   

class getSpecificationView(ListCreateAPIView):
    queryset = Specifications.objects.all()
    serializer_class = SpecificationsSerializer

    def get(self, request, id, *args, **kwargs):
        try:
            snippet = Specifications.objects.filter(projectID=id)
            serializer = SpecificationsSerializer(snippet, many=True)
            return Response({"specification" : serializer.data}, status=status.HTTP_200_OK)
        except Specifications.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


""" 
Update Specification 
"""
class updateSpecificationsView(RetrieveUpdateAPIView):

    def get_object(self, id):
        try:
            return Specifications.objects.get(id=id)
        except Specifications.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, id, format=None):
        try:
            data = request.data
            instances = []
            for temp_dict in data:
                id = temp_dict['id']
                title = temp_dict['title']
                feature = temp_dict['feature']
                updated_by = temp_dict['updated_by']
                
                obj = self.get_object(id)
                obj.title = title
                obj.feature = feature
                obj.updated_by = updated_by
               
                obj.save()
                instances.append(obj)
            serializer = SpecificationsSerializer(instances, many=True)
            return Response({"specification" : serializer.data}, status=status.HTTP_200_OK)
        except Specifications.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
""" 
Delete Specification 
"""
class deleteSpecificationsView(RetrieveDestroyAPIView):
        queryset = Specifications.objects.all()
        serializer_class = SpecificationsSerializer
        lookup_field="id"

        
""" 
Client Project View
"""
class ClientProjectAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    gallery_serializer_class = GallerySerializer
  
    def get_object(self):
        try:
            return Projects.objects.filter(isActive = True,   publish= True)
        except Projects.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
      
        snippets = self.get_object()
        projectList = ProjectsSerializer(snippets, many=True)
        query_set = Gallery.objects.filter(category='images')
        data = self.gallery_serializer_class(query_set, many=True).data
            
        return Response({"projectList" : projectList.data, "imageList": data}, status=status.HTTP_200_OK)


class ClientSelectedProjectAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    gallery_serializer_class = GallerySerializer
    specification_serializer_class = SpecificationsSerializer
    feature_serializer_class = FeatureAndAmenitiesSerializer
  
    def get_object(self, id):
        try:
            return Projects.objects.filter(id=id)
        except Projects.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id, format=None):
      try:
        snippets = self.get_object(id)
        projectList = ProjectsSerializer(snippets, many=True)

        gallery_query_set = Gallery.objects.filter(projectID=id)
        gallery_serializer = self.gallery_serializer_class(gallery_query_set, many=True)

        specificition_query_set = Specifications.objects.filter(projectID=id)
        specification_serializer = self.specification_serializer_class(specificition_query_set, many=True)

        feature_amenities_query_set = FeatureAndAmenities.objects.filter(projectID=id)
        feature_serializer = self.feature_serializer_class(feature_amenities_query_set, many=True)
            
        return Response({"project" : projectList.data, "imageData": gallery_serializer.data, "specificationData" : specification_serializer.data, "amenitie": feature_serializer.data}, status=status.HTTP_200_OK)
      except Exception as e:
           return Response({'error' : str(e)},status=500)
          

