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
      <Title title={formvalues?.intro_title} cssClass="fs-5 fw-medium mb-2" />
      <p>{formvalues?.intro_desc}</p>
      <Link to={formvalues?.intro_morelink} className="btn btn-outline mt-3">
        More
      </Link>
    </>
  );
};

export default SimpleTitleDescComponent;
