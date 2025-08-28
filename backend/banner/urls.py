from django.urls import path
from .views import (
    BannerListCreateView,
    BannerDetailView,
    BannerByPageTypeView,
    BannerByPageTypeCategoryView,
    BannerByCategoryView
)

urlpatterns = [
    path("createBanner/", BannerListCreateView.as_view(), name="banner-list-create"),
    path("updateBanner/<uuid:pk>/", BannerDetailView.as_view(), name="banner-detail"),
    path("by-page/<str:pageType>/", BannerByPageTypeView.as_view(), name="banner-by-pageType"),
    path("by-category/<str:category>/", BannerByCategoryView.as_view(), name="banner-by-category"),
    path("by-page-and-category/<str:pageType>/category/<str:category>/",
        BannerByPageTypeCategoryView.as_view(),
        name="banner-by-pageType-category",
    ),
]
