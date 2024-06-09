from rest_framework import pagination
from rest_framework.response import Response

class CustomPaginationForImageGallery(pagination.PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'p'
    ordering = 'news_position'


    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_count': self.page.paginator.count,
            'per_page_size': self.page_size,
            'results': data
        })