import moment from "moment";
import { getBaseURL } from "./ulrUtil";
import _ from "lodash";
import { removeCookie, setCookie } from "./cookieUtil";

export const generateOptionLength = (values) => {
  let value = Array.from({ length: values }, (_, i) => i + 1);
  let optionList = [];
  value.forEach(function test(item) {
    let option = {
      label: item,
      value: item,
    };
    optionList.push(option);
  });
  return optionList;
};

export const showPosteddate = (dt) => {
  if (!dt) return 0;
  const postD = moment(moment(dt).format("YYYY-MM-DD"));
  const currentD = moment();
  return currentD.diff(postD, "days");
};

export const getDateValue = (dt) => {
  return moment(dt).format("DD-MM-YYYY");
};

export const getImagePath = (path) => {
  if (!path) return null;
  const baseURL = getBaseURL();
  if (path && path.split("/")[0] !== "" && path.split("/")[0] !== "media") {
    return path;
  }
  return `${baseURL}${path}`;
};

export const getDummyImage = () => {
  const baseURL = getBaseURL();
  return `${baseURL}/media/images/dummy-image-square.png`;
};

export const getObjectTitle = (type, item) => {
  const carouse_Field = "carouse_title";
  const testimonial_Field = "testimonial_title";
  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const getObjectSubtitle = (type, item) => {
  const carouse_Field = "carouse_description";
  const testimonial_Field = "testimonial_sub_title";

  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const getObjectDescription = (type, item) => {
  const carouse_Field = "carouse_sub_title";
  const testimonial_Field = "testimonial_description";
  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const storeServiceMenuValueinCookie = (item) => {
  removeCookie("pageLoadServiceID");
  removeCookie("pageLoadServiceName");
  setCookie("pageLoadServiceID", item.id);
  setCookie("pageLoadServiceName", urlStringFormat(item.services_page_title));
};

export const urlStringFormat = (str) => {
  if (!str) return null;
  return str.replace(/\s+/g, "-").toLowerCase();
};

export const TitleStringFormat = (str) => {
  if (!str) return null;
  return str.replace("-", " ").toUpperCase();
};
export const paginationDataFormat = (data) => {
  return {
    total_count: data.total_count,
    per_page_size: data.per_page_size,
    next_url: data.next,
    previous_url: data.previous,
  };
};
export const sortByFieldName = (array, fieldName) => {
  return _.sortBy(array, function (o) {
    return o[fieldName];
  });
};

export const getMenuObject = (data) => {
  const parentMenu = _.filter(data, (item) => {
    return item.is_Parent;
  });
  const sortParentMenu = _.sortBy(parentMenu, (item) => {
    return item.page_position;
  });
  const childList = _.filter(data, (item) => {
    return !item.is_Parent;
  });

  sortParentMenu.forEach((parent) => {
    childList.forEach((child) => {
      if (child?.page_parent_ID === parent?.id) {
        if (parent.childMenu) {
          parent.childMenu.push(child);
        } else {
          parent["childMenu"] = [];
          parent.childMenu.push(child);
        }
      }
      if (parent?.childMenu?.length > 0) {
        parent.childMenu = _.sortBy(parent.childMenu, (item) => {
          return item.page_position;
        });
      }
    });
  });
  return sortParentMenu;
};

export const HideFooterForAdmin = () => {
  const pathList = [
    "/login",
    "/register",
    "/unauthorized",
    "/activate",
    "/reset_password",
    "/authForm",
    "/resend_activation",
    "/password",
    "/adminNews",
    "/main",
    "/dashboard",
    "/editproject",
    "/addproject",
    "/testimonial",
    "/contactUSList",
    "/userAdmin",
    "/userPermission",
  ];
  let isHideMenu =
    pathList.indexOf(window.location.pathname) >= 0 ? true : false;

  return isHideMenu;
};
