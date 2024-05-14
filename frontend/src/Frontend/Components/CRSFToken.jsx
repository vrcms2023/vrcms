import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";

const CSRFToken = () => {
  const [csrftokenValue, setcrsfTokenValue] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const getcsrfToken = async () => {
      try {
        await axiosClientServiceApi.get(`/user/csrf_cookie/`);
        setcrsfTokenValue(getCookie("csrftoken"));
      } catch (error) {
        const location = window.location.pathname;
        if (location !== "/login") {
          window.location = "/login";
        }
      }
    };
    getcsrfToken();
  }, []);

  return (
    <input
      type="hidden"
      name="csrfmiddlewaretoken"
      value={csrftokenValue ? csrftokenValue : ""}
    />
  );
};

export default CSRFToken;
