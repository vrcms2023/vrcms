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
        requestObj['moreLink'] = request.data["moreLink"]
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
        
def get_imageAndVidoe_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['image_title'] = request.data["image_title"]
        requestObj['image_description'] = request.data["image_description"]
        return requestObj

def get_Team_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['team_member_name'] = request.data["team_member_name"]
        requestObj['team_member_email'] = request.data["team_member_email"]
        requestObj['team_member_designation'] = request.data["team_member_designation"]
        requestObj['team_member_phone_number'] = request.data["team_member_phone_number"]
        requestObj['team_member_about_us'] = request.data["team_member_about_us"]
        requestObj['team_member_position'] = request.data["team_member_position"]
        requestObj['twitter_url'] = request.data["twitter_url"]
        requestObj['facebook_url'] = request.data["facebook_url"]
        requestObj['linkedIn_url'] = request.data["linkedIn_url"]
        requestObj['youtube_url'] = request.data["youtube_url"]
        requestObj['instagram_url'] = request.data["instagram_url"]
        requestObj['vimeo_url'] = request.data["vimeo_url"]
        requestObj['team_member_position'] = request.data["team_member_position"]
        return requestObj

def get_product_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['category_id'] = request.data["category_id"]
        requestObj['company_name'] = request.data["company_name"]
        requestObj['category_name'] = request.data["category_name"]
        requestObj['description'] = request.data["description"]
        requestObj['is_available'] = request.data["is_available"]
        requestObj['price'] = request.data["price"]
        requestObj['product_name'] = request.data["product_name"]
        requestObj['seo_title'] = request.data["seo_title"]
        requestObj['seo_author'] = request.data["seo_author"]
        requestObj['seo_description'] = request.data["seo_description"]
        requestObj['seo_keywords'] = request.data["seo_keywords"]
        requestObj['seo_link'] = request.data["seo_link"]
        return requestObj

def exclude_fields(self, fields_to_exclude=None):
    if isinstance(fields_to_exclude, list):
      for f in fields_to_exclude:
          f in self.fields.fields and self.fields.fields.pop(f) or next()


def get_advertisement_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['title'] = request.data["title"]
        requestObj['advertisement_description'] = request.data["advertisement_description"]
        requestObj['phonen_number'] = request.data["phonen_number"]
        requestObj['showAndHide'] = request.data["showAndHide"]
        return requestObj


def get_Category_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['category_Label'] = request.data["category_Label"]
        requestObj['category_Value'] = request.data["category_Label"].split( )[0].lower()
        requestObj['category_description'] = request.data["category_description"]
        requestObj['readMore_link'] = request.data["readMore_link"]
        return requestObj


def get_brochures_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['brochures_name'] = request.data["brochures_name"]
        requestObj['brochures_downloadName'] = request.data["brochures_downloadName"]
        return requestObj