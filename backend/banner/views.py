from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Banner
from .serializers import BannerSerializer


# Create & List
class BannerListCreateView(generics.ListCreateAPIView):
    queryset = Banner.objects.all().order_by("-created_at")
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)


# Retrieve, Update, Delete
class BannerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


# Get banner by pageType 
class BannerByPageTypeView(APIView):
    permission_classes = [permissions.AllowAny]  # 👈 public endpoint

    def get(self, request, pageType):
        banner = Banner.objects.filter(pageType=pageType)
        if not banner:
            return Response({"detail": "Not found"}, status=404)
        return Response(BannerSerializer(banner, many=True).data)

# Get banner by category 
class BannerByCategoryView(APIView):
    permission_classes = [permissions.AllowAny]  # 👈 public endpoint

    def get(self, request, category):
        banner = Banner.objects.filter(category=category)
        if not banner:
            return Response({"detail": "Not found"}, status=404)
        return Response(BannerSerializer(banner, many=True).data)

# Get banners by pageType & category (multiple)
class BannerByPageTypeCategoryView(APIView):
    permission_classes = [permissions.AllowAny]  # 👈 public endpoint

    def get(self, request, pageType, category):
        banners = Banner.objects.filter(pageType=pageType, category=category)
        return Response(BannerSerializer(banners, many=True).data)
