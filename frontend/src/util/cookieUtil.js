import Cookies from "js-cookie";

export function setCookie(name, value) {
  Cookies.set(name, value, { sameSite: "Strict" });
}

export function setCookieWithExpire(name, value, expire) {
  Cookies.set(name, value, { sameSite: "Strict", expire });
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function removeCookie(name) {
  Cookies.remove(name);
}

export function removeAllCookies() {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
}
