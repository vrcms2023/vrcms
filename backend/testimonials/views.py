from .models import Testimonials
from .serializers import TestimonialsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_testimonial_data_From_request_Object, get_custom_paginated_data
from django.db.models import Q
from common.CustomPagination import CustomPagination

# Create your views here.
    
class CreateTestimonials(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination

    """
    List all Testimonials, or create a new Testimonials.
    """

    def get(self, request, format=None):
        snippets = Testimonials.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = TestimonialsSerializer(snippets, many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        requestObj = get_testimonial_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
        serializer = TestimonialsSerializer(data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"testimonial": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestimonialsDetail(APIView):
    """
    Retrieve, update or delete a Testimonials instance.
    """
    def get_object(self, pk):
        try:
            return Testimonials.objects.get(pk=pk)
        except Testimonials.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = TestimonialsSerializer(snippet)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_testimonial_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = TestimonialsSerializer(snippet, data=requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientTestimonials(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination

    """
    List all Testimonials, or create a new Testimonials.
    """

    def get(self, request, format=None):
        snippets = Testimonials.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = TestimonialsSerializer(snippets, many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)

class TestimonialsSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return Testimonials.objects.filter(
                Q(testimonial_title__icontains=query) | Q(testimonial_description__icontains=query)
            )
        except Testimonials.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = TestimonialsSerializer(snippet, many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)
    

class UpdateTestimonialIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return Testimonials.objects.get(id=obj_id)
        except (Testimonials.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user.userName
            obj.testimonial_position = item["testimonial_position"]
            obj.save()
            instances.append(obj)

        serializer = TestimonialsSerializer(instances,  many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)