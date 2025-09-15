import React from "react";
import Title from "../../Common/Title";
import { InputFields, RichTextInputEditor_V2 } from "./forms/FormFields";

export const AmenitiesList = ({ register }) => {
  return (
    <>
      <Amenities
        title="Add Features (Press Enter after every feature) "
        register={register}
        fieldName="features_amenities.amenitie"
      />
      <Amenities
        title="Add Amenities (Press Enter after every amenitie)"
        register={register}
        fieldName="features_amenities.feature"
      />
    </>
  );
};

export const Amenities = ({ title, register, fieldName }) => {
  return (
    <div className="animities">
      <Title title={title} cssClass="mb-1 fs-6" />
      <InputFields type="textarea" fieldName={fieldName} register={register} />
      {/* <RichTextInputEditor_V2
        label={"feature"}
        Controller={Controller}
        name="feature"
        control={control}
        onChange={(e) => handleChange(e)}
      /> */}
      {/* <div className="mb-4">
        <textarea
          className="form-control"
          name={name}
          value={value ? value : ""}
          onChange={(e) => handleChange(e)}
          id="amenitiesDescription"
          rows={rows}
        ></textarea>
      </div> */}
    </div>
  );
};

export default Amenities;
