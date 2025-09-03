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
from common.utility import get_custom_paginated_data, get_Team_data_From_request_Object



# Create & List
class OurTeamListCreateView(generics.ListCreateAPIView):
    queryset = OurTeam.objects.all().order_by("-team_member_position")
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

# Retrieve, Update, Delete
class OurTeamRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OurTeam.objects.all().order_by("-team_member_position")
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
 
class UpdateAndDeleteOurteamDetail(APIView):
    """
    Retrieve, update or delete a Our Team instance.
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
        user = request.user
        requestObj = get_Team_data_From_request_Object(request)
        requestObj['updated_by'] = user
        serializer = OurTeamSerializer(snippet, requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"team": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class OurteamClientView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = OurTeam.objects.all().order_by("team_member_position")
    serializer_class = OurTeamSerializer
    pagination_class = CustomPagination

    
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
    
class UpdateTeamIndex(APIView):
    """
    Retrieve, update or delete a Carousel instance.
    """

    def get_object(self, obj_id):
        try:
            return OurTeam.objects.get(id=obj_id)
        except (OurTeam.DoesNotExist):
            raise status.HTTP_400_BAD_REQUEST
        
    def put(self, request, *args, **kwargs):
        obj_list = request.data
        instances = []
        user = request.user
        for item in obj_list:
            obj = self.get_object(obj_id=item["id"])
            obj.updated_by = user
            obj.team_member_position = item["team_member_position"]
            obj.save()
            instances.append(obj)

        serializer = OurTeamSerializer(instances,  many=True)
        return Response({"team": serializer.data}, status=status.HTTP_200_OK)