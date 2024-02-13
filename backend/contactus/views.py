from .models import ContactUS
from .serializers import ContactUSSerializer
from rest_framework import generics, permissions
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import  EmailMessage
from django.template.loader import get_template
from django.conf import settings
from django.http import Http404
from django.db.models import Q
from common.CustomPagination import CustomPagination
from common.utility import get_custom_paginated_data

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
            }
            client_message = get_template('customer-mesg.html').render(client_ctx)
            client_msg = EmailMessage(
                   ' Thank you contact LEOMTech' ,
                    client_message,
                    settings.EMAIL_HOST_USER,
                    [serializer.data["email"]]
            )
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
    
