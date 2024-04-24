import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import RichTextEditor from "../../../Frontend/Components/RichTextEditor";
import { InputField, SelectField } from "./FormFields";
import { getUserName } from "../../../util/ulrUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import moment from "moment";
import { generateOptionLength } from "../../../util/commonUtil";
import Button from "../../../Common/Button";

const JobPost = ({ editHandler, componentType, type, editPost }) => {
  const [editorState, setEditorState] = useState("");

  const [userName, setUserName] = useState(getUserName());
  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return editPost;
    }, [editPost]),
  });

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    reset(editPost);
  }, [editPost]);

  const onSubmit = async (data) => {
    let response = "";
    try {
      data["description"] = editorState;
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/careers/updateCareer/${data.id}/`,
          data,
        );
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(`/careers/createCareer/`, data);
      }
      if (response.status == 200 || response.status == 201) {
        setEditorState("");
        reset();
        toast.success(`Career Values are updated successfully `);
        closeHandler();
      }
    } catch (error) {
      console.log("unable to save the career form");
    }
  };

  const resetForm = () => {
    reset();
    setEditorState("");
  };

  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentType}
        type={type}
      />
      <hr className="m-0" />
      <div className="container">
        <div className="row p-4">
          <div className="col-md-12 mb-5 mb-md-0">
            <form className="g-3 mb-md-0" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Title"
                fieldName="job_title"
                register={register}
                cssClass="requiredField"
              />
              <InputField
                label="Company name"
                fieldName="company_name"
                register={register}
              />
              <InputField
                label="Location"
                fieldName="job_location"
                register={register}
              />

              <SelectField
                label="From Experience"
                fieldName="experience_from"
                register={register}
                options={generateOptionLength(20)}
              />
              <SelectField
                label="To Experience"
                fieldName="experience_to"
                register={register}
                options={generateOptionLength(20)}
              />

              <InputField
                label="Education"
                fieldName="education"
                register={register}
              />

              <SelectField
                label="Openings"
                fieldName="openings"
                register={register}
                options={generateOptionLength(10)}
              />

              <InputField
                label="ContactEmail"
                fieldName="contactEmail"
                type="email"
                register={register}
              />

              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end"
                >
                  {" "}
                  Posted On
                </label>

                <div className="col-sm-5 mb-3">
                  <input
                    type="date"
                    {...register("posted_date")}
                    name="posted_date"
                    className="form-control p-2"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end"
                >
                  Description
                </label>
                <div className="col-sm-9">
                  <RichTextEditor
                    description="description"
                    initialText={
                      editPost?.description ? editPost?.description : ""
                    }
                    RichEditorState={setEditorState}
                  />
                </div>
              </div>

              <div className="row">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {!editPost?.id ? (
                    <button
                      className="btn btn-secondary m-3"
                      onClick={resetForm}
                    >
                      Clear
                    </button>
                  ) : (
                    ""
                  )}

                  <button className="btn btn-primary">Save</button>
                  <Button
                    type="submit"
                    cssClass="btn btn-more"
                    label={"Close"}
                    handlerChange={closeHandler}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
