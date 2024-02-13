import moment from "moment";
import _ from "lodash";

export const dataFormatedByCatergoryName = (data) => {
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

  list.map((proj) => {
    if (!projList[proj.projectCategoryValue]) {
      projList[proj.projectCategoryValue] = [];
    }
    projList[proj.projectCategoryValue].push(proj);
  });
  return projList;
};

export const getImagesByDate = (img) => {
  const imgByDate = [];
  const sortedImageArray = img.sort(
    (a, b) =>
      new moment(b.updated_at).valueOf() - new moment(a.updated_at).valueOf(),
  );
  sortedImageArray.map((img) => {
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
    ["desc"],
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
    ["desc"],
  );
};

export const getFirstShortDescription = (data) => {
  return data.substring(0, 50);
};

export const mapServicePagetoComponent = (data) => {
  const services = sortByCreatedDate(data.services);
  const serviceSection = data.serviceSection;
  const displayCount = 5;

  return services.reduce((acc, val, ind) => {
    let service = [];
    if (ind >= displayCount) {
      service = getservicelist(service);
      return acc.concat({ ...val, service });
    }
    serviceSection.forEach((el, i) => {
      if (el.serviceID === val.id) {
        service.push(el);
      }
    });

    service = getservicelist(service);
    return acc.concat({ ...val, service });
  }, []);
};

const getservicelist = (service) => {
  let data = sortByCreatedDate(service);
  return (service = data.splice(0, 1));
};
