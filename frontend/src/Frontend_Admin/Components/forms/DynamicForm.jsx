import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Error from "../Error";
import { InputFields, RichTextInputEditor } from "./FormFields";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { Link } from "react-router-dom";
import { getBaseURL } from "../../../util/ulrUtil";

export default function DynamicForm({
  editHandler,
  componentType,
  componentTitle,
  editObject,
  setEditState,
  setSavedObject,
  dynamicFormFields = [],
  formPostURL,
  formUpdateURL,
}) {
  const closeHandler = () => {
    setEditState(false);
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const [error, setError] = useState(false);
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
    const _fieldKeys = Object.keys(data);
    _fieldKeys.forEach((item) => {
      if (item === "fileuplod") {
        formData.append(
          "category_fileuplod",
          data[item].length > 0 ? data[item][0] : []
        );
      } else formData.append(item, data[item]);
    });

    let response = "";
    const header = {
      "Content-Type": "multipart/form-data",
    };
    if (data?.id) {
      response = await axiosServiceApi.patch(
        `${formUpdateURL}${data.id}/`,
        formData,
        {
          headers: header,
        }
      );
    } else {
      response = await axiosServiceApi.post(formPostURL, formData, {
        headers: header,
      });
    }

    setSavedObject(response.data.category);
    closeHandler();
  };

  const downloadFile = (path) => {
    const link = document.createElement("a");
    link.download = editObject.category_name;
    link.href = baseURL + path;
    link.click();
  };
  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentTitle}
      />
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
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
              {editObject?.category_fileuplod ? (
                <Link
                  onClick={() => downloadFile(editObject?.category_fileuplod)}
                >
                  Download File
                </Link>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-5">
                <button className="btn btn-secondary mx-3">save</button>
                <Button
                  type="submit"
                  cssClass="btn border"
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
