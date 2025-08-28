import React from "react";
import Title from "../../../Common/Title";

const Location = ({ amenities }) => {
  const { googleMap } = amenities ? amenities : {};
  return (
    <>
      {googleMap === "" ? (
        ""
      ) : (
        <div className="px-2">
          <Title title = "TURBINE ELECTROMECHANICAL EQUIPMENT SERVICES LLC - Project Location" cssClass="fs-5 mb-4 text-center" />
          <iframe
            className="googlemap"
            src={googleMap}
            height="600"
            width="100%"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Location;
