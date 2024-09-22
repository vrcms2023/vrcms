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
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";

export default function DynamicFormwithFileUplod({
  editHandler,
  componentType,
  componentTitle,
  editObject,
  setEditState,
  setSaveState,
  dynamicFormFields = [],
  formPostURL,
  formUpdateURL,
  formDeleteURL,
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
      if (item === "category_fileuplod") {
        formData.append(
          item,
          typeof data[item] !== "string" && data[item]?.length > 0
            ? data[item][0]
            : ""
        );
      } else formData.append(item, data[item]);
    });

    let response = "";
    const header = {
      "Content-Type": "multipart/form-data",
    };
    try {
      if (data?.id) {
        formData.append("updated_by", getCookie("userName"));
        response = await axiosServiceApi.patch(
          `${formUpdateURL}${data.id}/`,
          formData,
          {
            headers: header,
          }
        );
      } else {
        formData.append("created_by", getCookie("userName"));
        response = await axiosServiceApi.post(formPostURL, formData, {
          headers: header,
        });
      }
      setSaveState(response.data.category);
      closeHandler();
    } catch (e) {
      toast.error(e[0]);
    }
  };

  const downloadFile = (path) => {
    const link = document.createElement("a");
    link.download = editObject.category_name;
    link.href = baseURL + path;
    link.target = "_blank";
    link.click();
  };

  const deleteFileHandler = (item) => {
    const { id, category_name } = item;
    const _body = JSON.parse(JSON.stringify(item));
    _body["category_fileuplod"] = "";
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.patch(
        `${formDeleteURL}${id}/`,
        _body
      );
      if (response) {
        console.log(response);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${category_name} image?`}
          />
        );
      },
    });
  };
  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentTitle}
      />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-12 px-5">
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
                <div className="text-end">
                  <Link
                    className="moreLink "
                    onClick={() => downloadFile(editObject?.category_fileuplod)}
                  >
                    Download File{" "}
                    <i
                      className="fa fa-download ms-1 fs-5 rounded-2 p-2 border border-1 border-info bg-white"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <Link to="" onClick={() => deleteFileHandler(editObject)}>
                    <i
                      className="fa fa-trash-o ms-2 fs-5 rounded-1 p-1 text-danger"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-5">
                <button className="btn btn-secondary mx-3">save</button>
                {/* <Button
                  type="button"
                  cssClass="btn btn-secondary"
                  label={"Save"}
                  handlerChange={()=> {}}
                /> */}
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
