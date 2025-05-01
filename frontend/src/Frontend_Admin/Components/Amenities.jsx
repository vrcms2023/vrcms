import React, { useEffect } from "react";
import Title from "../../Common/Title";
import { axiosServiceApi } from "../../util/axiosUtil";

export const AmenitiesList = ({ project, amenities, setAmenities }) => {
  /**
   * get selected Specification for edit
   */
  useEffect(() => {
    const getSelectedAmenities = async () => {
      try {
        const response = await axiosServiceApi.get(
          `/project/getAmenitiesById/${project?.id}/`
        );
        if (response?.status === 200) {
          setAmenities(response.data.amenitie);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (project?.id) {
      getSelectedAmenities();
    }
  }, []);

  return (
    <>
      <Amenities
        title="Add Features (Press Enter after every feature) "
        value={amenities?.feature}
        amenities={amenities}
        setAmenities={setAmenities}
        name="feature"
        rows="5"
      />
      <Amenities
        title="Add Amenities (Press Enter after every amenitie)"
        value={amenities?.amenitie}
        amenities={amenities}
        setAmenities={setAmenities}
        name="amenitie"
        rows="5"
      />
    </>
  );
};

export const Amenities = ({ title, value, amenities, setAmenities, name, rows }) => {
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = { ...amenities };
    onchangeVal[name] = value !== "" ? value : null;
    setAmenities(onchangeVal);
  };
  return (
    <div className="animities">
      <Title title={title} cssClass="mb-2" />
      <div className="mb-4">
        {/* <label htmlFor="addImages" className="form-label  ">Add Image's</label> */}
        <textarea
          className="form-control"
          name={name}
          value={value ? value : ""}
          onChange={(e) => handleChange(e)}
          id="amenitiesDescription"
          rows={rows}
        ></textarea>
      </div>
    </div>
  );
};

export default Amenities;
