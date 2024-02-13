import os

def get_Base_details(request):
       return {
                'created_by': request.data["created_by"],
        }
    
def get_original_name(request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[0]
        return ""
    
def get_content_type(request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[1]
        return ""

def get_image_data_from_request(request):
        return {
                'path': request.data["path"],
                'originalname': get_original_name(request),
                'contentType': get_content_type(request),
                'category': request.data["category"],
                'alternitivetext' : request.data["alternitivetext"]
        }


def get_banner_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['pageType'] = request.data["pageType"]
        requestObj['banner_title'] = request.data["banner_title"]
        requestObj['banner_subTitle'] = request.data["banner_subTitle"]
        requestObj['banner_descripiton'] = request.data["banner_descripiton"]
        return requestObj

def get_service_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['feature_title'] = request.data["feature_title"]
        requestObj['feature_sub_title'] = request.data["feature_sub_title"]
        requestObj['feature_description'] = request.data["feature_description"]
        requestObj['services_page_title'] = request.data["services_page_title"]
        requestObj['serviceID'] = request.data["serviceID"]
        return requestObj

def get_carousel_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['carouse_title'] = request.data["carouse_title"]
        requestObj['carouse_sub_title'] = request.data["carouse_sub_title"]
        requestObj['carouse_description'] = request.data["carouse_description"]
        return requestObj

def get_testimonial_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['testimonial_title'] = request.data["testimonial_title"]
        requestObj['testimonial_sub_title'] = request.data["testimonial_sub_title"]
        requestObj['testimonial_description'] = request.data["testimonial_description"]
        return requestObj

def get_news_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['news_title'] = request.data["news_title"]
        requestObj['news_description'] = request.data["news_description"]
        return requestObj


def get_about_us_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['aboutus_title'] = request.data["aboutus_title"]
        requestObj['aboutus_sub_title'] = request.data["aboutus_sub_title"]
        requestObj['aboutus_description'] = request.data["aboutus_description"]
        return requestObj

def get_custom_paginated_data(self, snippets):
        page = self.paginate_queryset(snippets)
        if page is not None :
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)