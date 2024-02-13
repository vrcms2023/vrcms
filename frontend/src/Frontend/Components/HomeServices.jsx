import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles
import "./HomeServices.css";

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ServiceForm from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import ModelBg from "../../Common/ModelBg";
import EditIcon from "../../Common/AdminEditIcon";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import {
  mapServicePagetoComponent,
  sortByDate,
  sortByCreatedDate,
} from "../../util/dataFormatUtil";
import { getImagePath } from "../../util/commonUtil";

const HomeServices = ({ title }) => {
  const editComponentObj = {
    service: false,
  };

  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [clientServiceList, setClientServiceList] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    getClinetServiceList();
  }, []);

  const getClinetServiceList = async () => {
    try {
      let response = await axiosClientServiceApi.get(
        `/services/getClientHomePageService/`,
      );

      let data = mapServicePagetoComponent(response.data);
      setClientServiceList(data);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  return (
    <>
      {clientServiceList.map((servicelist, index) =>
        servicelist?.service.map((item) => (
          <div
            className="row service mb-3 mb-md-5"
            key={`${index}+homeService`}
          >
            <div className="col-md-6 p-2 homeServiceImg">
              <img
                src={
                  item.path
                    ? getImagePath(item.path)
                    : getImagePath("/media/images/dummy-image-square.png")
                }
                alt={item.alternitivetext}
                className="img-fluid w-100 h-100"
              />
            </div>
            <div className="col-md-6 p-2 p-md-4 homeServiceDetails">
              <Title
                title={item.feature_title}
                cssClass="fw-bold serviceTitle"
              />
              {item.feature_description ? (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: item.feature_description }}
                />
              ) : (
                ""
              )}
              <Link
                to={`/services/${item.serviceID}/`}
                className="btn btn-primary mt-4"
              >
                Know More
              </Link>
            </div>
          </div>
        )),
      )}

      {componentEdit.service ? (
        <div className="adminEditTestmonial">
          <ServiceForm editHandler={editHandler} componentType="service" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default HomeServices;
