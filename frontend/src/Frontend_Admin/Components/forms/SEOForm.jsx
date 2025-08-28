import React, { useEffect, useState } from "react";
import { InputFields, RichTextInputEditor_V2 } from "./FormFields";
import Information from "../../../Common/info";

function SEOForm({ Controller, control, register, onChangeHanlder, seoLink, seoAuthor, setValue }) {
  const fields = {
    seo_title: false,
    seo_keywords: false,
    seo_description: false,
  };
  const fieldsValues = {
    seo_title: 0,
    seo_keywords: 0,
    seo_description: 0,
  };

  const [seoErrors, setSEOErrors] = useState(fields);
  const [fieldValues, setFieldValues] = useState(fieldsValues);

  const onKeyDownHandler = (e, maxLen) => {
    const input = e.target;
    setFieldValues((prevFormData) => ({ ...prevFormData, [input.name]: input.value.length }));
    if (input.value.length >= maxLen) {
      setSEOErrors((prevFormData) => ({ ...prevFormData, [input.name]: true }));
    } else {
      setSEOErrors((prevFormData) => ({ ...prevFormData, [input.name]: false }));
    }
  };
  useEffect(() => {
    setValue("seo_link", seoLink);
    setValue("seo_author", seoAuthor);
  }, []);

  const onKeyDownKeyWorrdHandler = (e) => {
    const input = e.target;
    const keywords = input?.value?.split(",");
    setFieldValues((prevFormData) => ({ ...prevFormData, [input.name]: keywords.length }));
  };

  return (
    <>
      <InputFields
        key={2}
        label={"Title"}
        type={"text"}
        fieldName={"seo_title"}
        register={register}
        onChange={onChangeHanlder}
        maxLength={200}
        onKeyDown={(e) => onKeyDownHandler(e, 60)}
      />
      <div className="d-flex justify-content-between align-items-center">
        <Information info="Meta title tags should be between 50 to 60 characters long" />
        <span className={`border border-1 border-success p-2 py-0 ${seoErrors?.seo_title ? "error border-danger" : "text-secondary"}`}>
          {fieldValues.seo_title}
        </span>
      </div>

      <InputFields key={3} label={"Link"} type={"text"} fieldName={"seo_link"} register={register} onChange={onChangeHanlder} />

      <InputFields key={4} label={"Author"} type={"text"} fieldName={"seo_author"} register={register} onChange={onChangeHanlder} />

      <InputFields
        key={5}
        label={"Keywords"}
        type={"textarea"}
        fieldName={"seo_keywords"}
        register={register}
        onChange={onChangeHanlder}
        maxLength={500}
        onKeyDown={(e) => onKeyDownKeyWorrdHandler(e, 400)}
      />
      <div className="d-flex justify-content-end align-items-center">
        <span className={`border border-1 border-dark p-2 py-0`}>{fieldValues.seo_keywords}</span>
      </div>

      {/* <Information
        info="Meta title tags should be between 400 to 500 characters long"
        cssClass={`${seoErrors?.seo_keywords ? "error" : "text-secondary"}`}
      /> */}
      <InputFields
        key={6}
        label={"Description"}
        type={"textarea"}
        fieldName={"seo_description"}
        register={register}
        onChange={onChangeHanlder}
        maxLength={5000}
        onKeyDown={(e) => onKeyDownHandler(e, 1000)}
      />
      <div className="d-flex justify-content-between align-items-center">
        <Information info="Meta title tags should be between 900 to 1000 characters long" />
        <span className={`border border-1 border-success p-2 py-0 ${seoErrors?.seo_description ? "error border-danger" : "text-secondary"}`}>
          {fieldValues.seo_description}
        </span>
      </div>
    </>
  );
}

export default SEOForm;
