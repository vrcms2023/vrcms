import React from "react";
import Title from "../../Common/Title";

const Specifications = () => {
  return (
    <div>
      <Title title="Plan & Sepcifications" cssClass="fw-normal fs-1 mb-4" />
      <Title title="STRUCTURE" cssClass="fw-normal fs-5 text-white" />
      <p className="fs-5">
        R.C.C framed structure to withstand wind & seismic loads.
      </p>

      <Title
        title="SUPER STRUCTURE"
        cssClass="fw-normal fs-5 mt-4 text-white"
      />
      <p className="fs-5">
        6" Thick solid concrete block work for external walls & 4" thick solid
        concrete block work for internal walls.
      </p>

      <Title title="BATHROOMS" cssClass="fw-normal fs-5 mt-4 text-white" />
      <p className="fs-5">
        Premium quality ceramic wash basins of good brand (Hindware, Parryware,
        Johnson or equivalent). Premium quality EWC of good brand (Hindware,
        Parryware, Johnson or equivalent). Premium quality single lever C.P.
        Fittings of good brand Hindware, Parryware, Johnson or equivalent.
      </p>
    </div>
  );
};
export default Specifications;
