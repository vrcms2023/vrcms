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

export const generateExperienceOptions = () => {
  let optionList = [
    {
      id: 1000,
      label: "Select",
      value: "",
    },
    {
      id: 1001,
      label: "Full-Time",
      value: "fulltime",
    },
    {
      id: 1002,
      label: "Part-Time",
      value: "parttime",
    },
    {
      id: 1003,
      label: "Temporary",
      value: "temporary",
    },
    {
      id: 1004,
      label: "Contract",
      value: "contract",
    },
    {
      id: 1005,
      label: "Seasonal",
      value: "seasonal",
    },
    {
      id: 1006,
      label: "Leased",
      value: "leased",
    },
  ];

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

export const getDateAndTimeValue = (dt) => {
  return moment(dt).format("DD-MM-YYYY | h:mm");
};

export const getTodayDate = (dt) => {
  const todayDate = moment().startOf("day");
  const createdDate = moment(dt);
  const diff = createdDate.diff(todayDate, "day");

  if (diff === 0) {
    return true;
  } else {
    return false;
  }
};

export const getImageURL = (item) => {
  if (item?.video_thumbnail_url) {
    return getImagePath(item?.video_thumbnail_url);
  } else if (item?.image_WebURL) {
    return getImagePath(item?.image_WebURL);
  } else if (item?.path) {
    return getImagePath(item?.path);
  } else {
    return getDummyImage();
  }
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
  if (type === "carousel" || type === "serviceOffered") return item[carouse_Field];
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
  removeCookie("pageLoadServiceURL");
  setCookie("pageLoadServiceID", item.id);
  setCookie("pageLoadServiceName", urlStringFormat(item?.page_label));
  setCookie("pageLoadServiceURL", item?.page_url);
};

export const urlStringFormat = (str) => {
  if (!str) return null;
  return str.replace(/\s+/g, "").toLowerCase();
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
export const getselectedUserMenu = (permisions, menuList) => {
  const _userMenu = [];
  let clonedMenu = getClonedObject(menuList);
  let parentIDs = _.filter(permisions, (item) => {
    if (item.parentid) return item;
  });
  parentIDs = _.uniqBy(parentIDs, "parentid");
  permisions.forEach((permission) => {
    clonedMenu.map((menu, index) => {
      if (permission.name === menu.page_url) {
        _userMenu.push(menu);
      }
    });
  });
  parentIDs.forEach((parent) => {
    clonedMenu.map((menu, index) => {
      if (parent.parentid === menu.id) {
        _userMenu.push(menu);
      }
    });
  });

  return _userMenu;
};
export const getServiceMainMenu = (data) => {
  return _.filter(data, (item) => {
    return item?.page_url.toLowerCase() === "/services";
  })[0];
};

export const getClonedObject = (list) => {
  return JSON.parse(JSON.stringify(list));
};

export const getPublishedSericeMenu = (menuList, publishedMenuList) => {
  let clonedMenu = getClonedObject(menuList);
  let mainServiceMenu = getServiceMainMenu(clonedMenu);
  const childMenu = mainServiceMenu?.childMenu;
  let selectedMenu = [];
  childMenu?.forEach((item) => {
    publishedMenuList.forEach((publishedMenu) => {
      if (item.page_label.toLowerCase() === publishedMenu.page_label.toLowerCase()) {
        selectedMenu.push(item);
      }
    });
  });

  _.map(clonedMenu, (item) => {
    if (item?.page_url?.toLowerCase() === "/services") {
      item["childMenu"] = selectedMenu;
    }
  });
  return clonedMenu;
};

export const getMenuObject = (data) => {
  let clonedMenu = getClonedObject(data);
  const parentMenu = _.filter(clonedMenu, (item) => {
    return item.is_Parent;
  });
  const sortParentMenu = _.sortBy(parentMenu, (item) => {
    return item.page_position;
  });
  const childList = _.filter(clonedMenu, (item) => {
    return !item.is_Parent;
  });

  sortParentMenu.map((parent) => {
    return childList.map((child) => {
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

export const NO_FOOTER_ROUTES = [
  "/login",
  "/register",
  "/unauthorized",
  "/activate/",
  "/reset_password",
  "/authForm",
  "/resend_activation",
  "/password/",
  "/useradmin",
  "/theme",
  "/adminpagesconfiguration",
  "/addproject",
  "/settings",
  "/dashboard",
  "/raqformadministration",
  "/useradmin",
  "/settings",
  "/addcategory",
  "/userpermission",
  "/contactuslist",
  "/change_password",
  "/appliedjobsadministration",
];
export const NO_HEADER_ROUTES = [
  "/login",
  "/register",
  "/unauthorized",
  "/activate/",
  "/reset_password",
  "/authForm",
  "/resend_activation",
];

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if ([removed]) {
    result.splice(endIndex, 0, removed);
  }
  return result;
};

export const updateArrIndex = (list, property, parentIndex) => {
  return list.map((item, index) => {
    if (item) {
      let _ind = index + 1;
      if (parentIndex) {
        _ind = parentIndex * 10 + _ind;
      }
      item[property] = _ind;

      return item;
    }
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

export const getImageFileFromUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const file = new File([blob], getFileNameFromUrl(imageUrl), {
      type: blob.type,
    });
    return file;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

function getFileNameFromUrl(url) {
  return url.substring(url.lastIndexOf("/") + 1);
}

export const getParentObject = (rawData, id, formatedMenu) => {
  let parentMenuObject = {};

  const dragObject = getFilterObjectByID(rawData, id)[0];

  if (dragObject.page_parent_ID) {
    parentMenuObject = getFilterObjectByID(formatedMenu, dragObject.page_parent_ID)[0];
  }
  return parentMenuObject;
};

export const getFilterObjectByID = (list, id) => {
  return list.filter((item) => {
    return item.id === id;
  });
};

export const isNotEmptyObject = (_object) => {
  if (Object?.keys(_object).length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getProjectwithImageMap = (data) => {
  const project = data.projectList;
  const images = data.imageList;
  const projList = [];
  const list = project.reduce((acc, val, ind) => {
    const imgs = [];
    images.forEach((el, i) => {
      if (el.projectID === val.id) {
        imgs.push(el);
      }
    });
    return acc.concat({ ...val, imgs });
  }, []);
  return list;
};

export const getUniqueValuesFromarray = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const unique = [];

  for (const item of set1) {
    if (!set2.has(item)) unique.push(item);
  }
  for (const item of set2) {
    if (!set1.has(item)) unique.push(item);
  }

  return unique;
};

export const getFilterObjectLabel = (list, identifier, value) => {
  return list.filter((item) => {
    return item[identifier]?.toLowerCase() === value.toLowerCase();
  })[0];
};

export const getCategoryPorjectList = (data) => {
  const projList = [];

  data?.forEach((proj) => {
    if (!projList[proj.projectStatus]) {
      projList[proj.projectStatus] = [];
    }
    projList[proj.projectStatus].push(proj);
  });

  return projList;
};

export const buildFormData = (formData, data, showExtraFormFields) => {
  formData.append("alternative_text", data.alternative_text);

  Object.keys(showExtraFormFields || {}).forEach((key) => {
    const field = showExtraFormFields[key];
    formData.append(key, field.type === "hidden" ? field.value : data[key]);
  });

  return formData;
};

export const validateDataNotEmpty = (data) =>
  Object.keys(data).some((key) => data[key] && key !== "category" && key !== "alternative_text");

export const getSelectedImage = (galleryList, category) => {
  return galleryList.filter((item) => {
    return item.category?.toLowerCase() === category.toLowerCase();
  });
};
