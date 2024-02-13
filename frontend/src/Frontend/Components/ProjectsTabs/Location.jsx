import React from "react";

const Location = ({ amenities }) => {
  const { googleMap } = amenities ? amenities : {};
  return (
    <>
      {googleMap === "" ? (
        ""
      ) : (
        <div className="py-4">
          <h4 className="mb-4">Project location map</h4>
          <iframe
            className="googlemap"
            src={googleMap}
            height="450"
            width="100%"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Location;
