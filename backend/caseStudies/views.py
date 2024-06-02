from django.shortcuts import get_object_or_404
from .models import CaseStudies
from .serializers import CaseStudiesSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data

# Create your views here.
 
class CreateCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = CaseStudies.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = CaseStudiesSerializer(snippets, many=True)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CaseStudiesSerializer(data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"caseStudies": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAndDeleteCaseStudiesDetail(APIView):
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return CaseStudies.objects.get(pk=pk)
        except CaseStudies.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CaseStudiesSerializer(snippet)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CaseStudiesSerializer(snippet, data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ClientViewCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = CaseStudies.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = CaseStudiesSerializer(snippets, many=True)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
    
class ClientViewSelectedCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer

    """
    get selected case studies.
    """

    def get_object(self, pk):
        try:
            return CaseStudies.objects.get(pk=pk)
        except CaseStudies.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CaseStudiesSerializer(snippet)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
    
class CaseStudiesSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CaseStudiesSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return CaseStudies.objects.filter(
                Q(case_studies_title__icontains=query) | Q(case_studies_description__icontains=query)
            )
        except CaseStudies.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = CaseStudiesSerializer(snippet, many=True)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)