import React, { useEffect, useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import RichTextEditor from "../../../Frontend_Views/Components/RichTextEditor";
import { InputField, InputFields, RichTextInputEditor_V2, SelectField } from "./FormFields";
import { getUserName } from "../../../util/ulrUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import moment from "moment";
import { generateExperienceOptions, generateOptionLength } from "../../../util/commonUtil";
import Button from "../../../Common/Button";
import { fieldValidation } from "../../../util/validationUtil";

const JobPost = ({ editHandler, componentType, type, editPost, popupTitle }) => {
  const [editorState, setEditorState] = useState("");

  const [userName, setUserName] = useState(getUserName());
  const {
    control,
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return editPost;
    }, [editPost]),
  });

  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };

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
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(`/careers/updateCareer/${data.id}/`, data);
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(`/careers/createCareer/`, data);
      }
      if (response.status === 200 || response.status === 201) {
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
      <EditAdminPopupHeader closeHandler={closeHandler} title={"Career"} type={type} />
      {/* <hr className="m-0" /> */}
      <div className="container">
        <div className="row p-0">
          <div className="col-md-12 mb-5 mb-md-0">
            <form className="mb-md-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <InputFields
                    label="Title test"
                    fieldName="job_title"
                    register={register}
                    cssClass="requiredField"
                    validationObject={fieldValidation.job_title}
                    error={errors?.job_title?.message}
                    isRequired={true}
                    onChange={() => handleChange("job_title")}
                  />
                </div>
                <div className="col-md-6">
                  <InputFields label="Company name" fieldName="company_name" register={register} />
                </div>

                <div className="col-md-6">
                  <InputFields label="Location" fieldName="job_location" register={register} />
                </div>
                <div className="col-md-6">
                  <InputFields
                    type="dropdown"
                    label="From Experience"
                    fieldName="experience_from"
                    register={register}
                    options={generateOptionLength(20)}
                  />
                </div>

                <div className="col-md-6">
                  <InputFields
                    type="dropdown"
                    label="To Experience"
                    fieldName="experience_to"
                    register={register}
                    options={generateOptionLength(20)}
                  />
                </div>
                <div className="col-md-6">
                  <InputFields label="Education" fieldName="education" register={register} />
                </div>

                <div className="col-md-6">
                  <InputFields
                    type="dropdown"
                    label="Openings"
                    fieldName="openings"
                    register={register}
                    options={generateOptionLength(10)}
                  />
                </div>
                <div className="col-md-6">
                  <InputFields label="Package" fieldName="package" register={register} />
                </div>

                <div className="col-md-6">
                  <InputFields label="Skills" fieldName="skills" register={register} />
                </div>
                <div className="col-md-6">
                  <InputFields
                    label="No of Vacancies"
                    fieldName="no_of_application"
                    register={register}
                  />
                </div>

                <div className="col-md-6">
                  <InputFields
                    type="dropdown"
                    label="Employment Type"
                    fieldName="employment_Type"
                    register={register}
                    options={generateExperienceOptions()}
                  />
                </div>
                <div className="col-md-6">
                  <InputFields label="Mode of work" fieldName="mode_of_work" register={register} />
                </div>

                <div className="col-md-6">
                  <InputFields
                    label="About company"
                    fieldName="about_company"
                    register={register}
                    validationObject={fieldValidation.about_company}
                    error={errors?.about_company?.message}
                  />
                </div>
                <div className="col-md-6">
                  <InputFields
                    label="ContactEmail"
                    fieldName="contactEmail"
                    type="email"
                    register={register}
                  />
                </div>

                <div className="col-md-6"></div>
                <div className="col-md-6"></div>
              </div>

              <div className="mb-2 row">
                <label htmlFor="" className="col-sm-3 col-form-label">
                  Posted On
                </label>

                <div className="">
                  <input
                    type="date"
                    {...register("posted_date")}
                    name="posted_date"
                    className="form-control p-2"
                  />
                </div>
              </div>

              <div className="row">
                <label htmlFor="" className="col-form-label">
                  Description
                </label>
                <div className="">
                  <RichTextInputEditor_V2
                    label={"Description"}
                    Controller={Controller}
                    name="description"
                    control={control}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-2">
                  {!editPost?.id ? (
                    <button className="btn btn-outline " onClick={resetForm}>
                      Clear
                    </button>
                  ) : (
                    ""
                  )}

                  <button className="btn btn-primary">Save</button>
                  {/* <Button
                    type="submit"
                    cssClass="btn btn-more"
                    label={"Close"}
                    handlerChange={closeHandler}
                  /> */}
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
