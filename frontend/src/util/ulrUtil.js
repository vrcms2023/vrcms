import { getCookie } from "./cookieUtil";

export function getBaseURL() {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : "http://127.0.0.1:8000";
}

// export function getBaseURL() {
//   return "https://demo.vitsols.com";
// }

export function removeActiveClass() {
  const menuIDs = [
    "ServicesnavbarDropdown",
    "KnowledgeHubnavbarDropdown",
    "AdminSettingnavbarDropdown",
  ];
  menuIDs.forEach((menuID) => {
    const id = document.getElementById(menuID);
    if (id) {
      id.classList.remove("active");
    }
  });
}

export function isPathExit(pathList) {
  return pathList.indexOf(window.location.pathname) >= 0 ? true : false;
}

export const getUserName = () => {
  return getCookie("userName");
};

export const getReactHostDetils = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : "http://localhost:3000";
};
