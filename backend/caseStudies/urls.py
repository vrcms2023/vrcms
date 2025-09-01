from django.urls import path
from .views import *


urlpatterns = [
    path('createCaseStudies/', CaseStudiesListCreateView.as_view(), name="create_get_case_studies"),
    path('updateCaseStudies/<pk>/', CaseStudiesUpdateAndDeleteView.as_view(), name='retrieve_update_delete_case_studies'),
    path('clientCaseStudies/', ClientViewCaseStudies.as_view(), name="get_client_case_studies"),
    path('clientSelectedCaseStudies/<pk>', ClientViewSelectedCaseStudies.as_view(), name="get_client_selected_case_studies"),
    path('searchCaseStudies/<query>/', CaseStudiesSearchAPIView.as_view(), name="get_case_studies_search_result")
]
