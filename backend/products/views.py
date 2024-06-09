
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_custom_paginated_data, get_product_data_From_request_Object 
from django.db.models import Q
from common.CustomPagination import CustomPagination

# Create your views here.

class CreateCategory(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    """
    Get Category Details, or create a new Category Details.
    """

    def get(self, request, format=None):
       
        snippets = Category.objects.all()
        serializer = CategorySerializer(snippets, many=True)
        return Response({"category": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        # user = request.user
        # request.data.update({"created_by": user.userName})
        serializer = CategorySerializer(data=request.data)
        if 'category_fileuplod' in request.data and not request.data['category_fileuplod']:
            serializer.remove_fields(['category_fileuplod'])
        if serializer.is_valid():
            serializer.save()
            return Response({"category": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCategory(APIView):
    """
    Retrieve, update or delete a Category instance.
    """
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CategorySerializer(snippet)
        return Response({"category": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CategorySerializer(snippet, data=request.data, partial=True)
        if 'category_fileuplod' in request.data and not request.data['category_fileuplod']:
            serializer.remove_fields(['category_fileuplod'])
        if serializer.is_valid():
            serializer.save()
            return Response({"category": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeleteCategoryFile(APIView):
    """
    Retrieve, update or delete a Category instance.
    """
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.category_fileuplod
        serializer = CategorySerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"category": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


""" 
Client Category View
"""
    
class ClientCategoryAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    pagination_class = Category
    
    
    def get(self, request, format=None):
        snippets = Category.objects.all()
        serializer = CategorySerializer(snippets, many=True)
        return Response({"category": serializer.data}, status=status.HTTP_200_OK)
    
"""
************************************************************************************************
"""
class CreateProduct(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    """
    Get Category Details, or create a new Category Details.
    """
    def get_object(self, categoryID):
        try:
            return Product.objects.filter(category_id=categoryID)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, categoryID, format=None):
        snippets = self.get_object(categoryID)
         
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serializer = ProductSerializer(snippets, many=True)
        return Response({"product": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        user = request.user
        requestObj = get_product_data_From_request_Object(request)
        requestObj['created_by'] = user.userName
        serializer = ProductSerializer(data=requestObj)
        if 'category_fileuplod' in request.data and not request.data['category_fileuplod']:
            serializer.remove_fields(['category_fileuplod'])
        if serializer.is_valid():
            serializer.save()
            return Response({"product": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateProduct(APIView):
    """
    Retrieve, update or delete a product instance.
    """
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ProductSerializer(snippet)
        return Response({"product": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        user = request.user
        requestObj = get_product_data_From_request_Object(request)
        requestObj['updated_by'] = user.userName
        serializer = ProductSerializer(snippet, requestObj)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"product": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" 
Client Category View
"""
    
class ClientProductAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    pagination_class = Product
    pagination_class = CustomPagination
  
    def get_object(self, categoryID):
        try:
            return Product.objects.filter(category_id=categoryID)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request,categoryID, format=None):
        snippets = self.get_object(categoryID)
        
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serializer = ProductSerializer(snippets, many=True)
        return Response({"product": serializer.data}, status=status.HTTP_200_OK)
    
    
class ClientSelectedProductAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    pagination_class = Product
  
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        snippets = self.get_object(pk)
        serializer = ProductSerializer(snippets)
        return Response({"product": serializer.data}, status=status.HTTP_200_OK)
    
    
class ProductsSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    pagination_class = CustomPagination
  
    def get_object(self, query, categoryID):
        try:
            return Product.objects.filter(
                Q(product_name__icontains=query) & Q(category_id=categoryID)
            )
        except Product.DoesNotExist:
            raise Http404

    def get(self, request,categoryID, query, format=None):
        snippet = self.get_object(query, categoryID)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = ProductSerializer(snippet, many=True)
        return Response({"product": serializer.data}, status=status.HTTP_200_OK)


# class ClientHomePageCategoryProductAPIView(generics.ListAPIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = ProductSerializer
#     pagination_class = Product
  
#     def get_object(self, id):
#         try:
#             return Product.objects.filter(category_id=id)
#         except Product.DoesNotExist:
#             raise Http404
        
#     def get(self, request, format=None):
#         obj_list = request.query_params.get("categoryId").split(',')
#         instances = []
#         obj = self.get_object(obj_list[0])
#         # for item in obj_list:
#         #      obj = self.get_object(item)
#         #      instances.append(obj)

#         serializer = ProductSerializer(obj,  many=True)
#         return Response({"product": serializer.data}, status=status.HTTP_200_OK)