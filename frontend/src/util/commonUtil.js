import moment from "moment";
import { getBaseURL } from "./ulrUtil";
import _ from "lodash";
import { removeCookie, setCookie } from "./cookieUtil";

export const generateOptionLength = (values) => {
  let value = Array.from({ length: values }, (_, i) => i);
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
  const imageGallery_Field = "image_title";
  if (type === "carousel" || type === "serviceOffered")
    return item[carouse_Field];
  if (type === "testmonial") return item[testimonial_Field];
  if (type === "gallery") return item[imageGallery_Field];
};

export const getObjectSubtitle = (type, item) => {
  const carouse_Field = "carouse_description";
  const testimonial_Field = "testimonial_sub_title";

  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const getObjectDescription = (type, item) => {
  const carouse_Field = "carouse_sub_title";
  const testimonial_Field = "testimonial_description";
  const imageGallery_Field = "image_description";
  if (type === "carousel") return item[carouse_Field];
  if (type === "testmonial") return item[testimonial_Field];
  if (type === "gallery") return item[imageGallery_Field];
};

export const storeServiceMenuValueinCookie = (item) => {
  removeCookie("pageLoadServiceID");
  removeCookie("pageLoadServiceName");
  setCookie("pageLoadServiceID", item.id);
  setCookie("pageLoadServiceName", urlStringFormat(item?.services_page_title));
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

export const getServiceMainMenu = (data) => {
  return _.filter(data, (item) => {
    return item.page_label.toLowerCase() === "services";
  });
};

export const getPublishedSericeMenu = (menuList, publishedMenuList) => {
  let clonedMenu = JSON.parse(JSON.stringify(menuList));
  let mainServiceMenu = getServiceMainMenu(clonedMenu);
  const childMenu = mainServiceMenu[0]?.childMenu;
  let selectedMenu = [];
  childMenu.forEach((item) => {
    publishedMenuList.forEach((publishedMenu) => {
      if (
        item.page_label.toLowerCase() ===
        publishedMenu.services_page_title.toLowerCase()
      ) {
        selectedMenu.push(item);
      }
    });
  });

  _.map(clonedMenu, (item) => {
    if (item.page_label.toLowerCase() === "services") {
      item["childMenu"] = selectedMenu;
    }
  });
  return clonedMenu;
};

const addServiceMneu = {
  id: "67c7e334-6008-4690-96e6-e7cac347db6363",
  created_by: "vara",
  updated_by: "Rama",
  created_at: "2020-05-18T09:54:45.814106Z",
  updated_at: "2025-03-19T14:59:30.179898Z",
  page_label: "Add New Service",
  page_url: "/services",
  page_isActive: true,
  is_Parent: false,
  page_parent_ID: "6f4a6c83-14fe-425b-9e59-76faded9363d",
  page_position: 0,
  is_Admin_menu: true,
  is_Client_menu: true,
  is_Maintainer_menu: true,
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
  _.map(sortParentMenu, (item) => {
    if (item.page_label.toLowerCase() === "services") {
      const newChildlist = [addServiceMneu, ...item.childMenu];
      item["childMenu"] = newChildlist;
    }
  });
  return sortParentMenu;
};

export const HideFooterForAdmin = () => {
  const pathList = [
    "/admin/login",
    "/admin/register",
    "/admin/unauthorized",
    "/admin/activate",
    "/admin/reset_password",
    "/admin/authForm",
    "/admin/resend_activation",
    "/admin/password",
    "/admin/adminNews",
    "/admin/main",
    "/admin/dashboard",
    "/admin/testimonial",
    "/admin/contactuslist",
    "/admin/useradmin",
    "/admin/userpermission",
    "/admin/theme",
    "/admin/adminpagesconfiguration",
    "/addproject",
  ];
  const path = window.location.pathname;
  const match = path.match(/^\/editproject(?:\/([a-zA-Z0-9-]+))?$/);
  if (match) {
    return true;
  } else {
    return pathList.indexOf(path) >= 0 ? true : false;
  }
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const updateArrIndex = (list, property, parentIndex) => {
  return list.map((item, index) => {
    let _ind = index + 1;
    if (parentIndex) {
      _ind = parentIndex * 10 + _ind;
    }
    item[property] = _ind;

    return item;
  });
};

export const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
});

export const getObjectPositionKey = (item) => {
  const _keys = Object.keys(item);
  return _keys.filter((key) => {
    return key.indexOf("position") !== -1 ? key : "";
  })[0];
};

export const getShortByDate = (item) => {
  const _keys = Object.keys(item);
  return _keys.filter((key) => {
    return key.indexOf("position") !== -1 ? key : "";
  })[0];
};

export const genereateCategoryProducts = (data, categories) => {
  const results = [];
  categories.forEach((catergory) => {
    let tempObj = "";
    data.forEach((item) => {
      if (item.data.results.length > 0) {
        let _categoryID = item.data.results[0].category_id;
        if (catergory.id === _categoryID) {
          tempObj = {
            ...catergory,
            products: item.data.results,
          };
        }
      }
    });
    if (tempObj) {
      results.push(tempObj);
    } else {
      results.push(catergory);
    }
  });
  return results;
};
