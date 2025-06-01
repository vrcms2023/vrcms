import React from "react";
import { InputFields } from "./FormFields";

function SEOForm({ register, onChangeHanlder }) {
  return (
    <>
      <InputFields
        key={2}
        label={"Title"}
        type={"text"}
        fieldName={"seo_title"}
        register={register}
        onChange={onChangeHanlder}
      />
      <InputFields
        key={3}
        label={"Link"}
        type={"text"}
        fieldName={"seo_link"}
        register={register}
        onChange={onChangeHanlder}
      />
      <InputFields
        key={4}
        label={"Author"}
        type={"text"}
        fieldName={"seo_author"}
        register={register}
        onChange={onChangeHanlder}
      />
      <InputFields
        key={5}
        label={"Keywords"}
        type={"textarea"}
        fieldName={"seo_keywords"}
        register={register}
        onChange={onChangeHanlder}
      />
      <InputFields
        key={6}
        label={"Description"}
        type={"textarea"}
        fieldName={"seo_description"}
        register={register}
        onChange={onChangeHanlder}
      />
    </>
  );
}

export default SEOForm;
