export const getObjectsByKey = (data) => {
  const objectbyname = [];
  data.forEach((item) => (objectbyname[item.componentName] = item));
  return objectbyname;
};
