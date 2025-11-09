import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Components
import { InputField, InputFields } from "./FormFields";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { fieldValidation } from "../../../util/validationUtil";

const FooterAdminFeilds = ({ editHandler, componentType, popupTitle, footerValues }) => {
  const [userName, setUserName] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: useMemo(() => {
      return footerValues;
    }, [footerValues]),
  });

  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  /**
   * Save Footer values
   */
  const onSubmit = async (data) => {
    let response = "";
    try {
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(`/footer/updateAddress/${data.id}/`, data);
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(`/footer/createAddress/`, data);
      }

      if (response.status === 200 || response.status === 201) {
        reset(response.data[0]);
        toast.success(`Footer Values are updated successfully `);
        closeHandler();
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row p-4">
            {/* <div className="col-md-6 mb-md-0">
              <InputField
                label="Door Number"
                fieldName="address_dr_no"
                register={register}
              />
              <InputField
                label="Location"
                fieldName="location"
                register={register}
              />
              <InputField
                label="Street"
                fieldName="street"
                register={register}
              />
              <InputField label="City" fieldName="city" register={register} />
              <InputField label="State" fieldName="state" register={register} />
              <InputField
                label="Postcode"
                fieldName="postcode"
                register={register}
              />
              <InputField
                label="Email"
                fieldName="emailid"
                register={register}
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
              />
              <InputField
                label="WhatsApp No."
                fieldName="phonen_number_2"
                register={register}
              />
            </div> */}

            <div className="col-md-12 mb-md-0">
              <InputFields
                label="WhatsApp"
                type="number"
                fieldName="whatsapp_number"
                register={register}
                validationObject={fieldValidation.phonen_number_2}
                error={errors?.whatsapp_number?.message}
                onChange={() => handleChange("whatsapp_number")}
              />
              <InputFields
                label="Facebook"
                fieldName="facebook_url"
                register={register}
                validationObject={fieldValidation.URL}
                error={errors?.facebook_url?.message}
                onChange={() => handleChange("facebook_url")}
              />
              <InputFields label="Twitter" fieldName="twitter_url" register={register} />
              <InputFields label="Linked In" fieldName="linkedIn_url" register={register} />
              <InputFields label="You Tube" fieldName="youtube_url" register={register} />
              <InputFields label="Instagram" fieldName="instagram_url" register={register} />
              <InputFields label="Vimeo" fieldName="vimeo_url" register={register} />
              <InputFields label="Pinterest" fieldName="pinterest_url" register={register} />
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center flex-wap flex-column flex-sm-row align-items-center gap-2 mb-4">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Button
                type="submit"
                cssClass="btn btn-more"
                label={"Close"}
                handlerChange={closeHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FooterAdminFeilds;
