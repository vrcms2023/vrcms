import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import Title from "../../../Common/Title";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
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
        let response = await axiosClientServiceApi.get(formgetURL);
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
      <Title title={formvalues?.intro_title} cssClass="fs-4 fw-bold text-left" />
      <p className="mt-2 mb-3">{formvalues?.intro_desc}</p>
      <Link to={formvalues?.intro_morelink} className="moreLink">
        more..
      </Link>
    </>
  );
};

export default SimpleTitleDescComponent;
