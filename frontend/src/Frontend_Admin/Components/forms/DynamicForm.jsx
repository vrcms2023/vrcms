import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Error from "../Error";
import { InputFields, RichTextInputEditor } from "./FormFields";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { Link } from "react-router-dom";
import { getBaseURL } from "../../../util/ulrUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";

export default function DynamicForm({
  editHandler,
  componentType,
  componentTitle = "Form ",
  editObject,
  setEditState,
  setSaveState,
  dynamicFormFields = [],
  formPostURL,
  formUpdateURL,
}) {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return editObject;
    }, [editObject]),
  });
  const [editorState, setEditorState] = useState("");
  const baseURL = getBaseURL();

  const saveForm = async (data) => {
    const _body = JSON.stringify(data);
    let formData = new FormData();

    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = "";

    try {
      if (data?.id) {
        response = await axiosServiceApi.put(
          `${formUpdateURL}${data.pageType}/`,
          formData
        );
      } else {
        response = await axiosServiceApi.post(formPostURL, formData);
      }
      //setSaveState(response.data.category);
      closeHandler();
    } catch (e) {
      toast.error(e[0]);
    }
  };

  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentTitle}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error && (
              <div className="fw-bold">{error && <Error>{error}</Error>}</div>
            )}
            <form onSubmit={handleSubmit(saveForm)}>
              {Object.keys(dynamicFormFields).map((e, index) => {
                const { label, type, fieldName, value } = dynamicFormFields[e];

                if (type == "richText") {
                  return (
                    <RichTextInputEditor
                      key={index}
                      label={label}
                      editorSetState={setEditorState}
                      initialText={""}
                    />
                  );
                } else {
                  return (
                    <InputFields
                      key={index}
                      label={label}
                      type={type}
                      value={value}
                      error={errors?.[fieldName]?.message}
                      fieldName={fieldName}
                      register={register}
                      {...dynamicFormFields[e]}
                    />
                  );
                }
              })}

              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-5">
                <button className="btn btn-secondary mx-3">save</button>
                <Button
                  type="submit"
                  cssClass="btn btn-outline"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
