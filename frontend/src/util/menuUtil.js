import _ from "lodash";
import { getCookie } from "./cookieUtil";
import { axiosServiceApi } from "./axiosUtil";

export const getSelectedMenuDetails = async (
  menuList,
  location,
  serviceResponse,
  isEdit,
  oldTitle
) => {
  const _userName = getCookie("userName");
  const _getSelectedParentObject = getMenuParent(menuList, location.pathname);

  let data = {
    is_Admin_menu: true,
    is_Client_menu: true,
    is_Maintainer_menu: true,
    is_Parent: false,
    page_isActive: true,
    page_label: serviceResponse.services_page_title,
    page_parent_ID: _getSelectedParentObject.id,
    page_url: `${_getSelectedParentObject.page_url}/${serviceResponse.services_page_title.replace(/\s/g, "").toLowerCase()}`,
  };

  if (isEdit) {
    const _getSelectedChildMenu = getMenuParent(
      _getSelectedParentObject.childMenu,
      oldTitle
    );
    data["updated_by"] = _userName;
    data["id"] = _getSelectedChildMenu.id;
    data["page_position"] = _getSelectedChildMenu.page_position;
  } else {
    data["created_by"] = _userName;
    data["page_position"] = getMenuPosition(_getSelectedParentObject);
  }
  let _response = await updatedMenu(data);
  return _response;
};

export const updatedMenu = async (data) => {
  const _body = JSON.stringify(data);
  let response = "";
  if (data?.id) {
    response = await axiosServiceApi.patch(
      `/pageMenu/updatePageMenu/${data?.id}/`,
      _body
    );
  } else {
    response = await axiosServiceApi.post(`/pageMenu/createPageMenu/`, _body);
  }
  return response;
};

export const getMenuPosition = (ParentObject) => {
  return ParentObject?.childMenu?.length > 0
    ? parseInt(ParentObject.childMenu.length) + 1
    : parseInt(ParentObject.page_position) * 10 + 1;
};

export const getMenuParent = (menuList, labelName) => {
  return _.filter(menuList, (item) => {
    return labelName?.toLowerCase().match(item?.page_label?.toLowerCase());
  })[0];
};
