import React from "react";

const Amenities = ({ amenities }) => {
  const { amenitie, feature } = amenities ? amenities : {};
  return (
    <div className="amenities container my-4">
      <div className="row">
        {amenitie === "" ? (
          ""
        ) : (
          <div className="col-6">
            <h4>Amenities</h4>
            <div>{amenitie}</div>
          </div>
        )}

        {feature === "" ? (
          ""
        ) : (
          <div className="col-6">
            <h4>Features</h4>
            <div>{feature}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;
