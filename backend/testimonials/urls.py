from django.urls import path
from .views import *


urlpatterns = [
    path('createTestimonials/', CreateTestimonials.as_view(), name="create_get_Testimonials"),
    path('updateTestimonials/<pk>/', TestimonialsDetail.as_view(), name='retrieve_update_delete_Testimonials'),
    path('clientTestimonials/', ClientTestimonials.as_view(), name="get_client_Testimonials"),
    path('searchtestimonials/<query>/', TestimonialsSearchAPIView.as_view(), name="get_case_studies_search_result"),
    path('updateTestimonialsindex/', UpdateTestimonialIndex.as_view(), name="update_carousel_index"),
]
