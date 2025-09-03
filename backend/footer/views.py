from .models import Address, TermsandCondition, googleMAPURL
from .serializers import AddressSerializer, TermsAndConditionsSerializer, GoogleMAPURLSerializer
from rest_framework import generics, permissions



# Create Address your views here.
class AddressListCreateView(generics.ListCreateAPIView):
    queryset = Address.objects.all().order_by("-created_at")
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Address Retrieve, Update, Delete
class AddressUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Address.objects.all().order_by("-created_at")
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Address Retrieve
class ClientAddressView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Address.objects.all().order_by("-created_at")
    serializer_class = AddressSerializer


# Create Terms and Conditions views here.
class TermsAndConditionsListCreateView(generics.ListCreateAPIView):
    queryset = TermsandCondition.objects.all().order_by("-created_at")
    serializer_class = TermsAndConditionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Terms and Conditions Retrieve, Update, Delete
class TermsAndConditionsUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TermsandCondition.objects.all().order_by("-created_at")
    serializer_class = TermsAndConditionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Terms and Conditions Retrieve
class ClientTermsAndConditionView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = TermsandCondition.objects.all().order_by("-created_at")
    serializer_class = TermsAndConditionsSerializer




# Create Google Map URL views here.
class GoogleMAPURLListCreateView(generics.ListCreateAPIView):
    queryset = googleMAPURL.objects.all().order_by("-created_at")
    serializer_class = GoogleMAPURLSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Google Map URL Retrieve, Update, Delete
class GoogleMAPURLUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = googleMAPURL.objects.all().order_by("-created_at")
    serializer_class = GoogleMAPURLSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

# client Google Map URL Retrieve
class ClientGoogleMAPURLView(generics.ListAPIView):
    queryset = googleMAPURL.objects.all().order_by("-created_at")
    serializer_class = GoogleMAPURLSerializer
    permission_classes = [permissions.AllowAny]
