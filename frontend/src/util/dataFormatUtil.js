import moment from "moment";
import _ from "lodash";
import { sortByFieldName } from "./commonUtil";

export const dataFormatedByCatergoryName = (data) => {
  const project = data;
  const images = data?.imageList;
  const projList = [];

  const list = project.reduce((acc, val, ind) => {
    const imgs = [];
    images?.forEach((el, i) => {
      if (el.projectID === val.id) {
        imgs.push(el);
      }
    });
    return acc.concat({ ...val, imgs });
  }, []);

  list.forEach((proj) => {
    if (!projList[proj.projectStatus]) {
      projList[proj.projectStatus] = [];
    }
    projList[proj.projectStatus].push(proj);
  });
  return projList;
};

export const getImagesByDate = (img) => {
  const imgByDate = [];
  const sortedImageArray = img.sort(
    (a, b) => new moment(b.updated_at).valueOf() - new moment(a.updated_at).valueOf()
  );
  sortedImageArray.forEach((img) => {
    const dt = new moment(img.updated_at).format("YYYY/DD/MM");
    if (!imgByDate[dt]) {
      imgByDate[dt] = [];
    }
    imgByDate[dt].push(img);
  });
  return imgByDate;
};

export const sortByDate = (array) => {
  return array.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
};

export const sortByCreatedDate = (array) => {
  return _.sortBy(array, function (o) {
    return new moment(o.created_at);
  });
};

export const sortCreatedDateByDesc = (array) => {
  return _.orderBy(
    array,
    function (o) {
      return new moment(o.created_at);
    },
    ["desc"]
  );
};

export const sortByUpdatedDate = (array) => {
  return _.sortBy(array, function (o) {
    return new moment(o.updated_at);
  });
};

export const sortUpdatedDateByDesc = (array) => {
  return _.orderBy(
    array,
    function (o) {
      return new moment(o.updated_at);
    },
    ["desc"]
  );
};

export const getFirstShortDescription = (data) => {
  return data?.substring(0, 50);
};

export const mapServicePagetoComponent = (data, maxCount = 9) => {
  const services = sortByCreatedDate(data.services);
  const serviceSection = data.serviceSection;

  const sortedChildren = [...serviceSection].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const firstChildMap = {};

  for (const child of sortedChildren) {
    if (!firstChildMap[child.serviceID]) {
      firstChildMap[child.serviceID] = child;
    }
  }

  // Attach one child (if exists) to each parent
  const mapped = services.map((parent) => ({
    ...parent,
    child: firstChildMap[parent.id] ? [firstChildMap[parent.id]] : [],
  }));

  // Sort by created_at and return only maxCount parents
  const sortedMapped = sortByFieldName(mapped, "service_postion");

  if (maxCount) {
    return sortedMapped.slice(0, maxCount);
  } else {
    return sortedMapped;
  }
};
