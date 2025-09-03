import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
// Components
import Button from "../../../Common/Button";
import Title from "../../../Common/Title";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";
import { InputField, RichTextInputEditor_V2 } from "../forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";

export const BriefIntroAdmin = ({ editHandler, componentType, popupTitle, pageType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [userName, setUserName] = useState("");
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState(false);

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getintroValues = async () => {
      try {
        let response = await axiosServiceApi.get(`/carousel/updateHomeIntro/${pageType}/`);
        setFormValues(response.data);
        reset(response.data);
      } catch (error) {
        console.log("Unable to get the intro");
      }
    };
    getintroValues();
  }, []);

  const saveandUpdateIntro = async (data) => {
    data["pageType"] = pageType;
    try {
      let response = "";
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(`/carousel/updateHomeIntro/${pageType}/`, {
          ...data,
        });
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(`/carousel/createHomeIntro/`, {
          ...data,
        });
      }
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        closeHandler();
      }
    } catch (error) {
      toast.error("Unable to save the intro");
    }
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <form className="" onSubmit={handleSubmit(saveandUpdateIntro)}>
        {/* <hr className="m-0" /> */}
        <div className="container my-3">
          {success ? (
            <>
              <Title title="Saved Successfully" cssClass="text-white text-center bg-success py-2" />
            </>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-md-12">
              <InputField
                label="Title"
                fieldName="intro_title"
                register={register}
                validationObject={fieldValidation.intro_title}
                error={errors?.intro_title?.message}
                isRequired={true}
              />
              <InputField
                label="SubTitle"
                fieldName="subTitle"
                register={register}
                validationObject={fieldValidation.subTitle}
                error={errors?.subTitle?.message}
              />
              <RichTextInputEditor_V2
                label={"Description"}
                Controller={Controller}
                name="intro_desc"
                control={control}
              />
              <InputField label="More links" fieldName="intro_morelink" register={register} />

              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <Button
                  type="submit"
                  cssClass="btn btn-outline"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
                <button type="submit" className="btn btn-primary">
                  {`${formValues?.id ? "Update" : "Save"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BriefIntroAdmin;
