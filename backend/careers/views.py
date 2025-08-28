from .models import Careers, appledJob
from .serializers import CareerSerializer, appledJobSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data
from django.template.loader import get_template
from django.core.mail import  EmailMessage
from django.conf import settings
from django.http import HttpResponse
from openpyxl import Workbook
from datetime import datetime
from io import BytesIO

# Create your views here.

class CreateCareer(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Careers.objects.all()
    serializer_class = CareerSerializer
    pagination_class = CustomPagination

    """
    List all Careers, or create a new Careers.
    """

    def get(self, request, format=None):
        snippets = Careers.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results

        serializer = CareerSerializer(snippets, many=True)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CareerSerializer(data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"careers": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCareersDetail(APIView):
    """
    Retrieve, update or delete a Careers instance.
    """
    def get_object(self, pk):
        try:
            return Careers.objects.get(pk=pk)
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet, data=request.data)
        if 'path' in request.data and not request.data['path']:
            serializer.remove_fields(['path','originalname','contentType'])
        if serializer.is_valid():
            serializer.save()
            return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" 
publish Careers View
"""
class PublishCareerAPIView(generics.RetrieveUpdateAPIView):

    def patch(self, request, pk, format=None):
        snippet = Careers.objects.get(pk=pk)
        serializer = CareerSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"careers" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

""" 
Client Service View
"""
class ClientCareerAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
    pagination_class = CustomPagination
  
    def get_object(self):
        try:
            return Careers.objects.filter(publish= True)
        except Careers.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        snippets = self.get_object()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serviceList = CareerSerializer(snippets, many=True)
        return Response({"careers" : serviceList.data}, status=status.HTTP_200_OK)
    

class ClientSelectedCareerAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
    
    def get_object(self, pk):
        try:
            return Careers.objects.get(pk=pk)
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
    

class CareerSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
    pagination_class = CustomPagination
    
    def get_object(self, query):
        try:
            return Careers.objects.filter(
                Q(job_title__icontains=query) | Q(job_location__icontains=query) | Q(company_name__icontains=query)
            )
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results

        serializer = CareerSerializer(snippet, many=True)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)

# GET (list) 
class JobApplicationListView(generics.ListAPIView):
    queryset = appledJob.objects.all()
    serializer_class = appledJobSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]


# POST (create) and 
class JobApplicationCreateView(generics.CreateAPIView):   
    permission_classes = [permissions.AllowAny]
    queryset = appledJob.objects.all()
    serializer_class = appledJobSerializer

    def perform_create(self, serializer):          
            username = self.request.user.username if self.request.user.is_authenticated else "system"
            instance = serializer.save(
                created_by=username,
                updated_by=username
            )

            admin_ctx = {
                    'jobtitle': instance.jobtitle,
                    'jobID': instance.jobID,
                    'firstName': instance.firstName,
                    'lastName': instance.lastName,
                    'email': instance.email,
                    'phoneNumber': instance.phoneNumber,
                    'description':  instance.description,
                    'cityAddress' : instance.cityAddress,
                    'country' : instance.country
                }
            admin_message = get_template('admin_job_apply_mesg.html').render(admin_ctx)
            admin_msg = EmailMessage(
                        instance.firstName + ' is applied for ' + instance.jobtitle + ' - Job applicaion' ,
                        admin_message,
                        instance.email,
                        [settings.EMAIL_HOST_USER]
                )
            admin_msg.content_subtype ="html"# Main content is now text/html
            admin_msg.send()

            client_ctx = {
                'firstName': instance.firstName, 
                'jobtitle': instance.jobtitle,
                'APPNAME': settings.APP_NAME,
            
            }
            client_message = get_template('job-customer-mesg.html').render(client_ctx)
            client_msg = EmailMessage(
                    settings.EMAIL_CUSTOMER_JOB_THANK_YOU_MESSAGE + settings.APP_NAME,
                    client_message,
                    settings.EMAIL_HOST_USER,
                    [instance.email]
            )
            client_msg.content_subtype ="html"# Main content is now text/html
            client_msg.send()

            self.instance = instance
            
    def create(self, request, *args, **kwargs):
        """
        This override allows us to reuse perform_create but ensures
        that DRF returns the saved object as response.
        """
        response = super().create(request, *args, **kwargs)
        return response


# GET (detail), PUT/PATCH (update), DELETE
class JobApplicationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = appledJob.objects.all()
    serializer_class = appledJobSerializer

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user.email)


class JobApplicantSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = appledJobSerializer
    pagination_class = CustomPagination

    def get_object(self, query):
        try:
            return appledJob.objects.filter(
                Q(firstName__icontains=query) | Q(email__icontains=query) | Q(phoneNumber__icontains=query) | Q(jobtitle__icontains=query) | Q(jobID__icontains=query)
            )
        except appledJob.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results
        
        serializer = appledJobSerializer(snippet, many=True)
        return Response({"joblist": serializer.data}, status=status.HTTP_200_OK)
    


class JobListExportToExcel(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = appledJobSerializer
    pagination_class = CustomPagination

    def get(self, request):
        # Get data from database
        queryset = appledJob.objects.all()
        serializer = appledJobSerializer(queryset, many=True)
        
        # Create Excel workbook and worksheet
        wb = Workbook()
        ws = wb.active
        ws.append(['jobtitle','firstName', 'lastName','email', 'phoneNumber','cityAddress','country','description'])  # Add headers
        ws.title = "Applied candidate list"

        # Write headers
        for item in queryset:
            ws.append([
                item.jobtitle,
                item.firstName,
                item.lastName,
                item.email,
                item.phoneNumber,
                item.cityAddress,
                item.country,
                item.description
            ])
 
         # Save to BytesIO buffer
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)

        # Create HTTP response
        response = HttpResponse(
            buffer.getvalue(),
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )

        file_time_stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"candidate_list_export_{file_time_stamp}.xlsx"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        # Save workbook to response
        wb.close()
        buffer.close()
        
        return response