import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";

// Component

import { getImagePath } from "../../util/commonUtil";
import Title from "../../Common/Title";
import RichTextView from "../../Common/RichTextView";

const AboutSection = ({ getBannerAPIURL, bannerState }) => {
  const [bannerdata, setBannerData] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200) {
          setBannerData(response.data.imageModel);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!bannerState) {
      getBannerData();
    }
  }, [bannerState]);

  return (
    <div className="row shadow-lg my-5">
      <div className="col-12 col-md-6 py-4 p-md-5">
        <img
          src={getImagePath(bannerdata?.path)}
          alt={bannerdata?.alternitivetext}
          className="d-md-none w-100 mb-3 shadow-md rounded-2"
        />

        <Title
          title={
            bannerdata?.banner_title ? bannerdata?.banner_title : "Update Title"
          }
          cssClass="text-dark fs-4 fw-bold"
        />
        <RichTextView
          data={
            bannerdata?.banner_descripiton
              ? bannerdata.banner_descripiton
              : "<p>Please update Section</p>"
          }
        />
      </div>
      <div className="col-12 col-md-6 d-none d-md-block p-5 text-center">
        <img
          src={getImagePath(bannerdata?.path)}
          alt={bannerdata?.alternitivetext}
          className="img-fluid"
          style={{ objectFit: "cover", backgroundPosition: "center" }}
        />
      </div>
    </div>
  );
};

export default AboutSection;
