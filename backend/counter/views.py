from .models import CounterSet
from .serializers import CounterSetSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreateCounterSet(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CounterSet.objects.all()
    serializer_class = CounterSetSerializer

    """
    Get counter set list, or create a new counter set.
    """

    def get(self, request, format=None):
        snippets = CounterSet.objects.all()
        serializer = CounterSetSerializer(snippets, many=True)
        return Response({"counterSetList": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = CounterSetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"counterSetList": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateCounterDetail(APIView):
    """
    Retrieve, update or delete a counter instance.
    """
    def get_object(self, pk):
        try:
            return CounterSet.objects.get(pk=pk)
        except CounterSet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CounterSetSerializer(snippet)
        return Response({"counterList": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CounterSetSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"counterList": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

""" 
Client Service View
"""
    
class ClientCounterSet(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CounterSet.objects.all()
    serializer_class = CounterSetSerializer

    """
    List all Address, or create a new Address.
    """

    def get(self, request, format=None):
        snippets = CounterSet.objects.all()
        serializer = CounterSetSerializer(snippets, many=True)
        return Response({"counterSetList": serializer.data}, status=status.HTTP_200_OK)