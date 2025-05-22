from .models import ShowHideComponents
from .serializers import  ShowHideComponentsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.http import Http404

# Create your views here.

class ShowHideComponentsByPageTypeView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ShowHideComponentsSerializer
    
    def get_queryset(self):
        page_type = self.request.query_params.get('pageType')
        if not page_type:
            return ShowHideComponents.objects.none()
        return ShowHideComponents.objects.filter(pageType=page_type)
    
class GetAllShowHideComponentsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ShowHideComponentsSerializer
    
    def get(self, request, format=None):
        snippets = ShowHideComponents.objects.all()
        serializer = ShowHideComponentsSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ShowHideComponentsGetOrCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShowHideComponentsSerializer

    def post(self, request, *args, **kwargs):
        serializer = ShowHideComponentsSerializer(data=request.data, context={'request': request})
        print("serializer",serializer)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        validated_data = serializer.validated_data
        print("validated_data",validated_data)
        user = request.user if request.user.is_authenticated else None
        
        try:
            # Try to get the component with matching componentName and pageType
            try:
                component = ShowHideComponents.objects.get(
                    componentName=validated_data['componentName'],
                    pageType=validated_data['pageType'],
                )
                created = False
            except ShowHideComponents.DoesNotExist:
                component = ShowHideComponents.objects.create(
                    componentName=validated_data['componentName'],
                    pageType=validated_data['pageType'],
                    visibility=validated_data.get('visibility', True),
                    created_by=user.userName,
                    updated_by=user.userName
                )
                created = True;
            
            print("component",component)
            # Serialize the response
            response_serializer = ShowHideComponentsSerializer(component)
            
            return Response(response_serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


    def patch(self, request, pk=None, *args, **kwargs):

        """
        Toggle visibility of a component by ID
        """
        try:
            component = ShowHideComponents.objects.get(pk=pk)
            user = request.user if request.user.is_authenticated else None
            
            # Toggle the visibility
            component.visibility = not component.visibility
            component.updated_by = user.userName
            component.save()
            
            serializer = ShowHideComponentsSerializer(component)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except ShowHideComponents.DoesNotExist:
            raise NotFound("Component not found")
        
class DeleteShowHideComponnet(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShowHideComponentsSerializer
    """
    delete a instance.
    """
    def get_object(self, pk):
        try:
            return ShowHideComponents.objects.get(pk=pk)
        except ShowHideComponents.DoesNotExist:
            raise Http404


    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)