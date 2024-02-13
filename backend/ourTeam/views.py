from django.shortcuts import get_object_or_404
from .models import OurTeam
from .serializers import OurTeamSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data

# Create your views here.
 
class CreateOurTeam(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = OurTeam.objects.all()
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination

    """
    List all our team , or create a new our team.
    """

    def get(self, request, format=None):
        snippets = OurTeam.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippets, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = OurTeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"team": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAndDeleteOurteamDetail(APIView):
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return OurTeam.objects.get(pk=pk)
        except OurTeam.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = OurTeamSerializer(snippet)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = OurTeamSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"team": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class OurteamClientView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = OurTeam.objects.all()
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = OurTeam.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippets, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)
    
class OurteamSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query):
        try:
            return OurTeam.objects.filter(
                Q(team_member_name__icontains=query) | Q(team_member_email__icontains=query) | Q(team_member_phone_number__icontains=query) | Q(team_member_designation__icontains=query) 
            )
        except OurTeam.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = OurTeamSerializer(snippet, many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)