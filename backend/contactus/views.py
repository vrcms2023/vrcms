
import os
from xmlrpc.client import Boolean

from products.serializers import CategorySerializer
from products.models import Category
from .models import ContactUS, Brochures, RaqForm
from .serializers import ContactUSSerializer, BrochuresSerializer, RaqFormSerializer
from rest_framework import generics, permissions
from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import  EmailMessage
from django.template.loader import get_template
from django.conf import settings
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_brochures_From_request_Object, get_custom_paginated_data
from rest_framework.views import APIView
from django.http import HttpResponse
from openpyxl import Workbook
from datetime import datetime
from io import BytesIO
# import qrcode
import json
# import magic

# Create your views here.
    
class ContactUSAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = ContactUS.objects.all()
    serializer_class = ContactUSSerializer
    pagination_class = CustomPagination

    """
    List all contact us, or create a new contactus.
    """

    def get(self, request, format=None):
        snippets = ContactUS.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serializer = ContactUSSerializer(snippets, many=True)
        return Response({"contactus": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = ContactUSSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            categoryId = request.data["categoryId"] 
            
            
            admin_ctx = {
                'user': serializer.data["firstName"],
                'description':  serializer.data["description"],
                'phoneNumber' : serializer.data["phoneNumber"],
                'email' : serializer.data["email"]
            }
            admin_message = get_template('admin_mesg.html').render(admin_ctx)
            admin_msg = EmailMessage(
                    serializer.data["firstName"] + ' - Enquiry form' ,
                    admin_message,
                    serializer.data["email"],
                    [settings.EMAIL_HOST_USER]
            )
            admin_msg.content_subtype ="html"# Main content is now text/html
            admin_msg.send()
            
            client_ctx = {
                'user': serializer.data["firstName"], 
                "message": settings.EMAIL_CUSTOMER_THANK_YOU_MESSAGE + settings.APP_NAME + settings.EMAIL_CUSTOMER_AUTO_REPLY_MESSAGE
            }
            client_message = get_template('customer-mesg.html').render(client_ctx)
            client_msg = EmailMessage(
                    settings.EMAIL_CUSTOMER_THANK_YOU_MESSAGE + settings.APP_NAME,
                    client_message,
                    settings.EMAIL_HOST_USER,
                    [serializer.data["email"]]
            )
           
            #client_msg.attach_file('backend/build/static/media/careers-bg.80584c0384ccc0127d23.jpg')
            if (categoryId and categoryId.strip()):
                snippet = Category.objects.get(pk=categoryId)
                serializer = CategorySerializer(snippet)
                file_name = serializer.data["category_name"]
                category_fileuplod = serializer.data["category_fileuplod"]

                if (category_fileuplod and category_fileuplod.strip()):
                        fileURL = 'backend'+category_fileuplod
        
                        # with open(fileURL, 'rb') as file:
                        #     file_content = file.read()

                        #     mime_type = magic.from_buffer(file_content, mime=True)
                        #     client_msg.attach(file_name, file_content, mime_type)

            client_msg.content_subtype ="html"# Main content is now text/html
            client_msg.send()
            
            # send_mail(
            #     'Thank you contact VRCMS ' + serializer.data["firstName"],
            #     serializer.data["description"] + serializer.data["phoneNumber"],
            #     serializer.data["email"], 
            #     [settings.EMAIL_HOST_USER, serializer.data["email"], "designerkrishna@gmail.com"]
            # )
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContacListSearchAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactUSSerializer
    pagination_class = CustomPagination

    def get_object(self, query):
        try:
            return ContactUS.objects.filter(
                Q(firstName__icontains=query) | Q(email__icontains=query) | Q(phoneNumber__icontains=query)
            )
        except ContactUS.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results
        
        serializer = ContactUSSerializer(snippet, many=True)
        return Response({"contactus": serializer.data}, status=status.HTTP_200_OK)
    
class ExportToExcel(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactUSSerializer
    pagination_class = CustomPagination

    def get(self, request):
        # Get data from database
        queryset = ContactUS.objects.all()
        serializer = ContactUSSerializer(queryset, many=True)
        
        # Create Excel workbook and worksheet
        wb = Workbook()
        ws = wb.active
        ws.append(['firstName', 'email', 'phoneNumber', 'description'])  # Add headers
        ws.title = "Contact us list"

        # Write headers
        for item in queryset:
            ws.append([
                item.firstName,
                item.email,
                item.phoneNumber,
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
        filename = f"contact_list_export_{file_time_stamp}.xlsx"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        # Save workbook to response
        wb.close()
        buffer.close()
        
        return response
    

     
class SendEnquierytoCustomer(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = ContactUS.objects.all()
    serializer_class = ContactUSSerializer
    pagination_class = CustomPagination

    """
    send request to customer
    """
    
    def post(self, request, format=None):
        appName = request.data["appName"]
        selectedDefaultMessage = Boolean(request.data["selectedDefaultMessage"])
        serializer = ContactUSSerializer(data=request.data)
        print("selectedDefaultMessage",selectedDefaultMessage)

        if serializer.is_valid():
            client_ctx = {
                'user': serializer.data["firstName"],
                'appName': appName,
                "description":serializer.data["description"],
                "selectedDefaultMessage":selectedDefaultMessage
            }
            client_message = get_template('customer-requestForm.html').render(client_ctx)
            client_msg = EmailMessage(
                    settings.EMAIL_REQUEST_MESSAGE_1 +  settings.APP_NAME + settings.EMAIL_REQUEST_MESSAGE_1,
                    client_message,
                    settings.EMAIL_HOST_USER,
                    [serializer.data["email"]]
            )

            client_msg.content_subtype ="html"# Main content is now text/html
            client_msg.send()
               
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class GenerateQRCodeView(APIView):
        # def post(self, request):
        #     data = request.data
        #     if not data:
        #         return Response({"error": "JSON data is required."}, status=status.HTTP_400_BAD_REQUEST)

        #     try:
        #         # Convert dict to JSON string
        #         json_string = json.dumps(data)

        #         # Generate QR code
        #         qr = qrcode.QRCode(version=1, box_size=10, border=5)
        #         qr.add_data(json_string)
        #         qr.make(fit=True)

        #         img = qr.make_image(fill_color="black", back_color="white")

        #         buffer = BytesIO()
        #         img.save(buffer, format="PNG")
        #         buffer.seek(0)

        #         return HttpResponse(buffer, content_type="image/png")

        #     except Exception as e:
        #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def post(self, request):
    #     image_url = request.data.get("image_url")

    #     if not image_url:
    #         return Response({"error": "image_url is required"}, status=status.HTTP_400_BAD_REQUEST)

    #     # Validate URL (optional: you can add regex or use URLValidator)
    #     if not image_url.startswith("http://") and not image_url.startswith("https://"):
    #         return Response({"error": "Invalid image URL"}, status=status.HTTP_400_BAD_REQUEST)

    #     try:
    #         qr = qrcode.QRCode(version=1, box_size=10, border=5)
    #         qr.add_data(image_url)
    #         qr.make(fit=True)

    #         img = qr.make_image(fill_color="black", back_color="white")

    #         buffer = BytesIO()
    #         img.save(buffer, format="PNG")
    #         buffer.seek(0)

    #         return HttpResponse(buffer, content_type="image/png")

    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# Brochures logic

class BrochuresListCreateView(generics.ListCreateAPIView):
    queryset = Brochures.objects.all().order_by("-created_at")
    serializer_class = BrochuresSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)
        
# Retrieve, Update, Delete
class BrochuresUpdateAndDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brochures.objects.all().order_by("-created_at")
    serializer_class = BrochuresSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


# client Retrieve
class ClientBrochuresView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brochures.objects.all().order_by("-created_at")
    serializer_class = BrochuresSerializer


# class CreateBrochures(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Brochures.objects.all()
#     serializer_class = BrochuresSerializer

#     """
#     List all App news, or create a Brochures.
#     """

#     def get(self, request, format=None):
#         snippets = Brochures.objects.all()
#         serializer = BrochuresSerializer(snippets, many=True)
#         return Response({"brochures": serializer.data}, status=status.HTTP_200_OK)
    
#     def post(self, request, format=None):
#         user = request.user
#         requestObj = get_brochures_From_request_Object(request)
#         requestObj['created_by'] = user.userName
#         serializer = BrochuresSerializer(data=requestObj)
#         if 'path' in request.data and not request.data['path']:
#             serializer.remove_fields(['path','originalname','contentType'])
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"brochures": serializer.data}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UpdateAndDeleteBrochure(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#     """
#     Retrieve, update or delete a Brochures
#     """
#     def get_object(self, pk):
#         try:
#             return Brochures.objects.get(pk=pk)
#         except Brochures.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         serializer = BrochuresSerializer(snippet)
#         return Response({"brochures": serializer.data}, status=status.HTTP_200_OK)

#     def patch(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         user = request.user
#         requestObj = get_brochures_From_request_Object(request)       
#         requestObj['updated_by'] = user.userName
#         serializer = BrochuresSerializer(snippet, data=requestObj)
#         if 'path' in request.data and not request.data['path']:
#             serializer.remove_fields(['path','originalname','contentType'])
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"brochures": serializer.data}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk, format=None):
#         snippet = self.get_object(pk)
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)



# class ClientViewBrochures(generics.CreateAPIView):
#     permission_classes = [permissions.AllowAny]
#     queryset = Brochures.objects.all()
#     serializer_class = BrochuresSerializer

#     """
#     List all App news, or create a Brochures
#     """

#     def get(self, request, format=None):
#         snippets = Brochures.objects.all()
#         results = get_custom_paginated_data(self, snippets)
#         if results is not None:
#             return results

#         serializer = BrochuresSerializer(snippets, many=True)
#         return Response({"brochures": serializer.data}, status=status.HTTP_200_OK)
    


class RaqFormAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = RaqForm.objects.all()
    serializer_class = RaqFormSerializer
    pagination_class = CustomPagination

    """
    List all contact us, or create a new contactus.
    """

    def get(self, request, format=None):
        snippets = RaqForm.objects.all()
        results = get_custom_paginated_data(self, snippets)
        if results is not None:
            return results
        
        serializer = RaqFormSerializer(snippets, many=True)
        return Response({"raqform": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = RaqFormSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()            
            
            admin_ctx = {
                'name': serializer.data["name"],
                'company':  serializer.data["company"],
                'email' : serializer.data["email"],
                'phoneNumber' : serializer.data["phoneNumber"],
                'cityAddress' : serializer.data["cityAddress"],
                'stateProvince' : serializer.data["stateProvince"],
                'natureofProject' : serializer.data["natureofProject"],
                'country' : serializer.data["country"],
                'description' : serializer.data["description"],
                'teams' : serializer.data["teams"],
                'hangout' : serializer.data["hangout"],
                'other' : serializer.data["other"],
            }
            admin_message = get_template('admin_raq_mesg.html').render(admin_ctx)
            admin_msg = EmailMessage(
                    serializer.data["name"] + ' - RAQ Enquiry form' ,
                    admin_message,
                    serializer.data["email"],
                    [settings.EMAIL_HOST_USER]
            )
            admin_msg.content_subtype ="html"# Main content is now text/html
            admin_msg.send()
            
            client_ctx = {
                'user': serializer.data["name"], 
                "message": settings.EMAIL_CUSTOMER_THANK_YOU_MESSAGE + settings.APP_NAME + settings.EMAIL_CUSTOMER_AUTO_REPLY_MESSAGE
            }
            client_message = get_template('customer-mesg.html').render(client_ctx)
            client_msg = EmailMessage(
                    settings.EMAIL_CUSTOMER_THANK_YOU_MESSAGE + settings.APP_NAME,
                    client_message,
                    settings.EMAIL_HOST_USER,
                    [serializer.data["email"]]
            )          
          
            client_msg.content_subtype ="html"# Main content is now text/html
            client_msg.send()
             
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class RaqSearchAPIView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RaqFormSerializer
    pagination_class = CustomPagination

    def get_object(self, query):
        try:
            return RaqForm.objects.filter(
                Q(name__icontains=query) | Q(email__icontains=query) | Q(phoneNumber__icontains=query)
            )
        except RaqForm.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        results = get_custom_paginated_data(self, snippet)
        if results is not None:
            return results
        
        serializer = RaqFormSerializer(snippet, many=True)
        return Response({"contactus": serializer.data}, status=status.HTTP_200_OK)

class RaqDeleteAPIView(DestroyAPIView):
    queryset = RaqForm.objects.all()
    serializer_class = RaqFormSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class RaqExportToExcel(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RaqFormSerializer
    pagination_class = CustomPagination

    def get(self, request):
        # Get data from database
        queryset = RaqForm.objects.all()
        serializer = RaqFormSerializer(queryset, many=True)
        
        # Create Excel workbook and worksheet
        wb = Workbook()
        ws = wb.active
        ws.append(['name','company', 'email', 'phoneNumber','cityAddress','stateProvince','natureofProject','country','description','teams','hangout','other'])  # Add headers
        ws.title = "RAQ list"

        # Write headers
        for item in queryset:
            ws.append([
                item.name,
                item.company,
                item.email,
                item.phoneNumber,
                item.cityAddress,
                item.stateProvince,
                item.natureofProject,
                item.country,
                item.description,
                item.teams,
                item.hangout,
                item.other,
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
        filename = f"raq_list_export_{file_time_stamp}.xlsx"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        # Save workbook to response
        wb.close()
        buffer.close()
        
        return response