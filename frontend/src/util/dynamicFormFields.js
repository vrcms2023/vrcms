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
      type: "richText",
      fieldName: "banner_descripiton",
    },
    moreLink: {
      label: "Page To Link",
      type: "text",
      fieldName: "moreLink",
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
      type: "richText",
      fieldName: "banner_descripiton",
    },
    moreLink: {
      label: "Page To Link",
      type: "text",
      fieldName: "moreLink",
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
      type: "richText",
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
      type: "richText",
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
      validationObject: { required: "Please enter Testimonial Name" },
    },
    testimonial_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "testimonial_sub_title",
    },
    testimonial_description: {
      label: "Writeup",
      type: "richText",
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

export const getServiceFormFields = (id, title, page_url) => {
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
    services_page_url: {
      label: "hidden",
      readonly: true,
      type: "hidden",
      value: page_url ? page_url : "",
      fieldName: "services_page_url",
    },
  };
};

export const getTeamMemberFields = (position) => {
  return {
    team_member_name: {
      label: "Name",
      type: "text",
      fieldName: "team_member_name",
      validationObject: { required: "Please enter Team Member name" },
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
    image_WebURL: {
      label: "Image URL",
      type: "text",
      id: "image_video_WebURL",
      fieldName: "image_WebURL",
      validationObject: fieldValidation.URL,
    },
    image_title: {
      label: "Image Title",
      type: "text",
      fieldName: "image_title",
    },
    image_description: {
      label: "Description",
      type: "richText",
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
export const getVideoGalleryFields = (category) => {
  return {
    video_WebURL: {
      label: "YouTube URL",
      type: "text",
      id: "image_video_WebURL",
      fieldName: "video_WebURL",
      validationObject: fieldValidation.URL,
    },
    image_title: {
      label: "Image Title",
      type: "text",
      fieldName: "image_title",
    },
    image_description: {
      label: "Description",
      type: "richText",
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
      type: "richText",
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
      type: "richText",
      fieldName: "description",
    },
    seo_title: {
      label: "SEO Title",
      type: "text",
      fieldName: "seo_title",
    },
    seo_link: {
      label: "SEO Link",
      type: "text",
      fieldName: "seo_link",
    },
    seo_author: {
      label: "SEO Author",
      type: "text",
      fieldName: "seo_author",
    },
    seo_keywords: {
      label: "SEO keywords",
      type: "richText",
      fieldName: "seo_keywords",
    },
    seo_description: {
      label: "SEO Description",
      type: "richText",
      fieldName: "seo_description",
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

export const getTitleAndDescriptionFields = (pageType) => {
  return {
    intro_title: {
      label: "Title",
      type: "text",
      fieldName: "intro_title",
      validationObject: { required: "Please enter Title" },
    },
    intro_morelink: {
      label: "More link",
      type: "text",
      fieldName: "intro_morelink",
      validationObject: { required: "Please enter Title" },
    },
    intro_desc: {
      label: "Description",
      type: "richText",
      fieldName: "intro_desc",
    },
    pageType: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
    pageType: {
      label: "intro_position",
      readonly: true,
      type: "hidden",
      value: "",
      fieldName: "intro_position",
    },
  };
};

export const getAdvertisementFormDynamicFields = (advertisement) => {
  return {
    showAndHide: {
      label: "Show / Off",
      readonly: true,
      type: "hidden",
      value: advertisement?.showAndHide ? advertisement?.showAndHide : false,
      fieldName: "showAndHide",
    },
    title: {
      label: "Advertisement Title",
      type: "text",
      fieldName: "title",
      validationObject: { required: "Please enter Title" },
    },
    advertisement_description: {
      label: "Advertisement Description",
      type: "textarea",
      fieldName: "advertisement_description",
    },
    phonen_number: {
      label: "Phone Number",
      type: "text",
      fieldName: "phonen_number",
    },
    category: {
      label: "category",
      readonly: true,
      type: "hidden",
      value: "",
      fieldName: "category",
    },

    // alternitivetext: {
    //   label: "alternitivetext",
    //   type: "text",
    //   fieldName: "alternitivetext",
    // },
  };
};

export const getBrochuresFormDynamicFields = (brochures) => {
  return {
    brochures_name: {
      label: "Broucher Title",
      type: "text",
      fieldName: "brochures_name",
    },
    brochures_downloadName: {
      label: "Brochures DownloadName",
      type: "text",
      fieldName: "brochures_downloadName",
    },

    category: {
      label: "category",
      readonly: true,
      type: "hidden",
      value: "",
      fieldName: "category",
    },
  };
};

export const getProjectCategoryFormDynamicFields = (editCategory, options, disabled) => {
  console.log("readonly ==", editCategory);
  return {
    category_Label: {
      label: "Category",
      type: `${editCategory?.id ? "text" : "dropdown"}`,
      readonly: disabled,
      options: options,
      disabled: disabled,
      selectedValue: editCategory?.category_Value,
      fieldName: "category_Label",
      validationObject: { required: "Please enter Category Title" },
    },
    category_description: {
      label: "Description",
      type: "textarea",
      fieldName: "category_description",
    },
    readMore_link: {
      label: "More Link",
      type: "text",
      value: "/projects",
      fieldName: "readMore_link",
    },
  };
};

export const getKeyPointsDynamicFields = (pageType) => {
  return {
    banner_title: {
      label: "Key Point",
      type: "text",
      fieldName: "banner_title",
      validationObject: { required: "Please enter Key Point" },
    },
    banner_subTitle: {
      readonly: true,
      type: "hidden",
      value: "KeyPoints",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      readonly: true,
      type: "hidden",
      value: "KeyPointsdescription",
      fieldName: "banner_descripiton",
    },

    moreLink: {
      label: "Link",
      type: "text",
      fieldName: "moreLink",
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
      w: "2000px",
      h: "600px",
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
    advertisement: {
      w: "300px",
      h: "200px",
    },
    logo: {
      w: "300px",
      h: "200px",
    },
  };
  return imgDimension[component];
};

export const getLogoFormFields = (pageType) => {
  return {
    banner_title: {
      readonly: true,
      type: "hidden",
      fieldName: "banner_title",
    },
    banner_subTitle: {
      readonly: true,
      type: "hidden",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      readonly: true,
      type: "hidden",
      fieldName: "banner_descripiton",
    },
    moreLink: {
      readonly: true,
      type: "hidden",
      fieldName: "moreLink",
    },
    pageType: {
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
  };
};
