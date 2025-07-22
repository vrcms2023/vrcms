from rest_framework import viewsets
from .models import TitleDescription
from .serializers import TitleDescriptionSerializer
from rest_framework import generics, permissions


# POST (create) and GET (list)
class TitleDescriptionListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TitleDescription.objects.all()
    serializer_class = TitleDescriptionSerializer

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(
            created_by=self.request.user,
            updated_by=self.request.user
        )

# GET (detail), PUT/PATCH (update), DELETE
class TitleDescriptionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TitleDescription.objects.all()
    serializer_class = TitleDescriptionSerializer

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)