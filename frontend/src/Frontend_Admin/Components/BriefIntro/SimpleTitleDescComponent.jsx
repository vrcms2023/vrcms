import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import Title from "../../../Common/Title";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { Link } from "react-router-dom";
import RichTextView from "../../../Common/RichTextView";

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
        setFormValues(response.data);
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
      <RichTextView data={formvalues?.intro_desc} showMorelink={false} />
      <Link to={formvalues?.intro_morelink} className="moreLink">
        more..
      </Link>
    </>
  );
};

export default SimpleTitleDescComponent;
