import { fieldValidation } from "./validationUtil";

export const getProductCategoryBannerFormFields = (pageType) => {
  return {
    banner_title: {
      label: "Title",
      type: "text",
      fieldName: "banner_title",
    },
    banner_subTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      label: "Description",
      type: "textarea",
      fieldName: "banner_descripiton",
    },
    pageType: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
  };
};

export const getFormDynamicFields = (pageType) => {
  return {
    banner_title: {
      label: "Title",
      type: "text",
      fieldName: "banner_title",
    },
    banner_subTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      label: "Description",
      type: "textarea",
      fieldName: "banner_descripiton",
    },
    moreLink: {
      label: "PageToLink",
      type: "text",
      fieldName: "more_link",
    },
    pageType: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
  };
};

export const getAboutUSSectionFields = () => {
  return {
    aboutus_title: {
      label: "Title",
      type: "text",
      fieldName: "aboutus_title",
    },
    aboutus_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "aboutus_sub_title",
    },
    aboutus_description: {
      label: "Description",
      type: "richText",
      fieldName: "aboutus_description",
    },
  };
};

export const getCaseStudiesFields = () => {
  return {
    case_studies_title: {
      label: "Title",
      type: "text",
      fieldName: "case_studies_title",
    },
    case_studies_description: {
      label: "Description",
      type: "richText",
      fieldName: "case_studies_description",
    },
  };
};

export const getClinetLogsFields = () => {
  return {
    client_title: {
      label: "Title",
      type: "text",
      fieldName: "client_title",
    },
    client_description: {
      label: "Description",
      type: "richText",
      fieldName: "client_description",
    },
  };
};

export const getCarouselFields = (category) => {
  return {
    carouse_title: {
      label: "Carouse Title",
      type: "text",
      fieldName: "carouse_title",
    },
    carouse_sub_title: {
      label: "Carouse Sub Title",
      type: "text",
      fieldName: "carouse_sub_title",
    },
    carouse_description: {
      label: "Description",
      type: "textarea",
      fieldName: "carouse_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getserviceOfferedFields = (category) => {
  return {
    carouse_title: {
      label: "Service Title",
      type: "text",
      fieldName: "carouse_title",
    },
    carouse_sub_title: {
      label: "Service Sub Title",
      type: "text",
      fieldName: "carouse_sub_title",
    },
    carouse_description: {
      label: "Description",
      type: "textarea",
      fieldName: "carouse_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getNewslFields = () => {
  return {
    news_title: {
      label: "News Title",
      type: "text",
      fieldName: "news_title",
    },

    news_description: {
      label: "Description",
      type: "richText",
      fieldName: "news_description",
    },
  };
};

export const getTestimonialsFields = (category) => {
  return {
    testimonial_title: {
      label: "Testimonial Name",
      type: "text",
      fieldName: "testimonial_title",
    },
    testimonial_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "testimonial_sub_title",
    },
    testimonial_description: {
      label: "Testimonial Writeup",
      type: "textarea",
      fieldName: "testimonial_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getServiceFormFields = (id, title) => {
  return {
    feature_title: {
      label: "Service Title",
      type: "text",
      fieldName: "feature_title",
    },
    feature_sub_title: {
      label: "Service Sub Title",
      type: "text",
      fieldName: "feature_sub_title",
    },
    feature_description: {
      label: "Description",
      type: "richText",
      fieldName: "feature_description",
    },
    serviceID: {
      label: "hidden",
      readonly: true,
      type: "hidden",
      value: id ? id : "",
      fieldName: "serviceID",
    },
    services_page_title: {
      label: "hidden",
      readonly: true,
      type: "hidden",
      value: title ? title : "",
      fieldName: "services_page_title",
    },
  };
};

export const getTeamMemberFields = (position) => {
  return {
    team_member_name: {
      label: "Name",
      type: "text",
      fieldName: "team_member_name",
    },
    team_member_email: {
      label: "Email",
      type: "text",
      fieldName: "team_member_email",
    },
    team_member_designation: {
      label: "Designation",
      type: "text",
      fieldName: "team_member_designation",
    },
    team_member_phone_number: {
      label: "Phone Number",
      type: "text",
      fieldName: "team_member_phone_number",
    },
    team_member_about_us: {
      label: "About ",
      type: "richText",
      fieldName: "team_member_about_us",
    },
    team_member_position: {
      label: "About ",
      readonly: true,
      type: "hidden",
      value: position ? position : 0,
      fieldName: "team_member_position",
    },
    twitter_url: {
      label: "twitter url",
      type: "text",
      fieldName: "twitter_url",
    },
    facebook_url: {
      label: "facebook url",
      type: "text",
      fieldName: "facebook_url",
    },
    linkedIn_url: {
      label: "linkedIn url",
      type: "text",
      fieldName: "linkedIn_url",
    },
    youtube_url: {
      label: "youtube url",
      type: "text",
      fieldName: "youtube_url",
    },
    instagram_url: {
      label: "instagram url",
      type: "text",
      fieldName: "instagram_url",
    },
    vimeo_url: {
      label: "vimeo url",
      type: "text",
      fieldName: "vimeo_url",
    },
    pinterest_url: {
      label: "pinterest url",
      type: "text",
      fieldName: "pinterest_url",
    },
  };
};

export const getImageGalleryFields = (category) => {
  return {
    image_title: {
      label: "Image Title",
      type: "text",
      fieldName: "image_title",
    },
    image_description: {
      label: "Description",
      type: "textarea",
      fieldName: "image_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getCategoryFormDynamicFields = () => {
  return {
    category_name: {
      label: "Category Name",
      type: "text",
      fieldName: "category_name",
      validationObject: { required: "Please enter Category" },
    },
    is_available: {
      label: "is available",
      readonly: true,
      type: "hidden",
      value: true,
      fieldName: "is_available",
    },
    description: {
      label: "Category Description",
      type: "textarea",
      fieldName: "description",
    },
    category_fileuplod: {
      label: "Upload File",
      type: "file",
      accept:
        "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fieldName: "category_fileuplod",
    },
    company_id: {
      label: "company_id",
      readonly: true,
      type: "hidden",
      value: "d0c2cd08-6948-47bd-8ab6-78bad09ec7a2",
      fieldName: "company_id",
    },
    company_name: {
      label: "company_name",
      readonly: true,
      type: "hidden",
      value: "LeonPharma",
      fieldName: "company_name",
    },
  };
};

export const getProductFormDynamicFields = (selectedCategory) => {
  return {
    product_name: {
      label: "Product Name",
      type: "text",
      fieldName: "product_name",
      validationObject: { required: "Please enter Product name" },
    },
    is_available: {
      label: "is available",
      readonly: true,
      type: "hidden",
      value: true,
      fieldName: "is_available",
    },
    description: {
      label: "Product Description",
      type: "textarea",
      fieldName: "description",
    },
    category_id: {
      label: "category_id",
      readonly: true,
      type: "hidden",
      value: selectedCategory.id,
      fieldName: "category_id",
    },
    category_name: {
      label: "category_name",
      readonly: true,
      type: "hidden",
      value: selectedCategory?.category_name,
      fieldName: "category_name",
    },
    company_id: {
      label: "company_id",
      readonly: true,
      type: "hidden",
      value: "d0c2cd08-6948-47bd-8ab6-78bad09ec7a2",
      fieldName: "company_id",
    },
    company_name: {
      label: "company_name",
      readonly: true,
      type: "hidden",
      value: "LeonPharma",
      fieldName: "company_name",
    },
    price: {
      label: "price",
      readonly: true,
      type: "hidden",
      value: 20,
      fieldName: "price",
    },
  };
};

export const imageDimensionsJson = (component) => {
  const imgDimension = {
    carousel: {
      w: "1500px",
      h: "760px",
    },
    aboutus: {
      w: "400px",
      h: "400px",
    },
    whoweare: {
      w: "800px",
      h: "800px",
    },
    homeCareers: {
      w: "800px",
      h: "800px",
    },
    addService: {
      w: "800px",
      h: "800px",
    },
    addNews: {
      w: "300px",
      h: "200px",
    },
    banner: {
      w: "1500px",
      h: "400px",
    },
    teams: {
      w: "300px",
      h: "200px",
    },
    imageGallery: {
      w: "800px",
      h: "800px",
    },
    VideosGallery: {
      w: "800px",
      h: "800px",
    },
    product: {
      w: "300px",
      h: "200px",
    },
  };
  return imgDimension[component];
};
