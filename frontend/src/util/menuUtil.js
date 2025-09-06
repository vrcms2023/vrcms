import _ from "lodash";
import { getCookie } from "./cookieUtil";
import { axiosServiceApi } from "./axiosUtil";

export const updatedMenu = async (data) => {
  const _body = JSON.stringify(data);
  let response = "";
  if (data?.id) {
    response = await axiosServiceApi.patch(`/pageMenu/updatePageMenu/${data?.id}/`, _body);
  } else {
    response = await axiosServiceApi.post(`/pageMenu/createPageMenu/`, _body);
  }
  return response;
};

export const updatePageIndex = async (id, data, name) => {
  data[name] = !data[name];
  try {
    const response = await axiosServiceApi.patch(`/pageMenu/updatePageMenu/${id}/`, data);
    return response;
  } catch (error) {
    console.log("Unable to load user details");
  }
};

export const deleteMenuItemByID = async (id) => {
  try {
    const response = await axiosServiceApi.delete(`/pageMenu/updatePageMenu/${id}/`);
    return response;
  } catch (error) {
    console.log("Unable to load user details");
  }
};

export const getMenuPosition = (ParentObject) => {
  const childLength = ParentObject?.childMenu?.length;
  const pagePosition = ParentObject?.page_position;
  if (childLength > 0) {
    return parseInt(pagePosition) * 10 + childLength + 1;
  } else {
    return parseInt(pagePosition) * 10 + 1;
  }
};

export const getMenuParent = (menuList, labelName) => {
  return _.filter(menuList, (item) => {
    return labelName?.toLowerCase().match(item?.page_label?.toLowerCase());
  })[0];
};

export const getMenuByID = (menuList, id) => {
  return _.filter(menuList, (item) => {
    return item?.service_menu_ID === id;
  })[0];
};

export const getParentMenuByURL = (menuList, labelName) => {
  return _.filter(menuList, (item) => {
    return labelName?.toLowerCase().match(item?.page_url?.toLowerCase());
  })[0];
};

export const getServiceMenuRawData = (label, url, parentID, editObject, _indexPosition) => {
  return {
    id: editObject?.id ? editObject?.id : null,
    page_label: label,
    page_url: url,
    is_Parent: false,
    is_Maintainer_menu: true,
    is_Client_menu: editObject?.is_Client_menu ? editObject?.is_Client_menu : false,
    seo_title: editObject?.seo_title ? editObject?.seo_title : "",
    seo_link: editObject?.seo_link ? editObject?.seo_link : "",
    seo_author: editObject?.seo_author ? editObject?.seo_author : "",
    seo_keywords: editObject?.seo_keywords ? editObject?.seo_keywords : "",
    seo_description: editObject?.seo_description ? editObject?.seo_description : "",
    page_parent_ID: parentID,
    page_position: _indexPosition,
    page_isActive: true,
    is_Admin_menu: true,
  };
};
