import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import Button from "../../../Common/Button";
import Title from "../../../Common/Title";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";
import { Link } from "react-router-dom";

export const SimpleTitleDescComponent = ({
  componentEdit,
  formgetURL,
  formvalues,
  setFormValues,
}) => {
  useEffect(() => {
    const getintroValues = async () => {
      try {
        let response = await axiosServiceApi.get(formgetURL);
        setFormValues(response.data.intro);
      } catch (error) {
        console.log("Unable to get the intro");
      }
    };
    if (!componentEdit) {
      getintroValues();
    }
  }, [componentEdit]);

  return (
    <>
      <Title title={formvalues?.intro_title} cssClass="fs-5 fw-medium mb-3" />
      <p>{formvalues?.intro_desc}</p>
      <Link to={formvalues?.intro_morelink}>More</Link>
    </>
  );
};

export default SimpleTitleDescComponent;
