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

class CreateTestimonials(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination
      
    
    def create(self, request, *args, **kwargs):
        # Save the new object
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_instance = serializer.save(created_by=self.request.user, updated_by=self.request.user)
       
        return Response({"ImageGallery":self.get_serializer(saved_instance).data}, status=status.HTTP_201_CREATED)

class TestimonialsUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination
    """
    Retrieve, update or delete a Testimonials instance.
    """
   

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save(updated_by=self.request.user)

        # Wrap updated object in paginated-like response
        return Response({"testimonials":self.get_serializer(updated_instance).data}, status=status.HTTP_200_OK)

   
class ClientTestimonials(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return Testimonials.objects.all().order_by('-created_at')  # or 'id'


class TestimonialsSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TestimonialsSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return Testimonials.objects.filter(Q(testimonial_title__icontains=query))
                # Q(testimonial_title__icontains=query) | Q(testimonial_description__icontains=query)
            
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