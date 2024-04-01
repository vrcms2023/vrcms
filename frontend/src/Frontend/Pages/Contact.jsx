import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// Components
import Title from "../../Common/Title";
import BriefIntroFrontend from "../../Common/BriefIntro";
import Alert from "../../Common/Alert";
import Banner from "../../Common/Banner";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";

import AddressForm from "../../Admin/Components/forms/AddressForm";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import GoogleMap from "../../Admin/Components/forms/GoogleMap";

import { axiosClientServiceApi } from "../../util/axiosUtil";
import { removeCookie, setCookie } from "../../util/cookieUtil";
import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";

// Styles
import "./Contact.css";

// images
import { getAddressList } from "../../features/address/addressActions";
import {
  InputField,
  TextAreaField,
} from "../../Admin/Components/forms/FormFields";
import { fieldValidation } from "../../util/validationUtil";

const Contact = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    address: false,
    contact: false,
    map: false,
  };

  const formObject = {
    firstName: "",
    email: "",
    phoneNumber: "",
    description: "",
  };
  const defautURL =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202";
  const pageType = "contactus";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [formData, setFormData] = useState(formObject);
  const [show, setShow] = useState(false);
  const [formerror, setFormerror] = useState({});
  const [success, setsuccess] = useState(false);

  const [mapValues, setMapValues] = useState("");
  const { addressList } = useSelector((state) => state.addressList);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const dispatch = useDispatch();

  useEffect(() => {
    removeActiveClass();
  }, []);

  /**
   * contactus form submit
   */
  const onFormSubmit = async (data) => {
    try {
      const response = await axiosClientServiceApi.post(`/contactus/`, {
        ...data,
      });
      if (response.status === 201) {
        toast.success("Your request is submit succuessfully");
        removeCookie("clientInformation");
        setCookie("clientInformation", data.email, { maxAge: 86400 });
        reset();
        setsuccess(true);
      } else {
        toast.error("unable to process your request");
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (addressList?.length === 0) {
      dispatch(getAddressList());
    }
  }, []);

  useEffect(() => {
    if (!componentEdit.address) {
      dispatch(getAddressList());
    }
  }, [componentEdit.address]);

  useEffect(() => {
    if (!componentEdit.map) {
      getGoogleMapUrl();
    }
  }, [componentEdit.map]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const getGoogleMapUrl = async () => {
    try {
      const response = await axiosClientServiceApi.get(
        `footer/getGoogleMapURL/`
      );
      if (response?.data?.mapURL) {
        const data = response.data.mapURL[0];
        setMapValues(data);
      }
    } catch (e) {
      console.log("unable to access ulr because of server is down");
    }
  };

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>

      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      {/* Introduction */}
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      <div className="container-fluid">
        <div className="row">
          <div className="contactAddress position-relative col-md-12 text-white blueBg-500 p-5 py-3 p-md-5">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("address", true)} />
            )}

            {componentEdit.address ? (
              <div className="adminEditTestmonial">
                <AddressForm
                  editHandler={editHandler}
                  componentType="address"
                  address={addressList}
                />
              </div>
            ) : (
              ""
            )}
            <div className="container">
              <div className="row">
                {addressList?.map((item, index) => (
                  <div className="col-md-3 my-4 my-nd-0" key={index}>
                    <Title
                      title={item.location_title}
                      cssClass="mb-2 fs-4 text-black"
                    />
                    <div className="mb-2">
                      <p className="m-0">{item.address_dr_no}</p>
                      <p className="m-0">{item.location} </p>
                      <p className="m-0">{item.street} </p>
                      <p className="m-0">{item.city} </p>
                      {/* <p className="m-0">Pincode - {item.postcode}</p> */}
                      <p className="mb-3">{item.state}</p>
                      <p className="mt-2">
                        {item.phonen_number && (
                          <>
                            {/* <Title title="Phone Number :" cssClass="mb-2" /> */}
                            <i
                              className="fa fa-phone-square text-white fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.phonen_number}
                          </>
                        )}
                      </p>
                      <p className="mt-2">
                        {item.phonen_number_2 && (
                          <>
                            <i
                              className="fa fa-whatsapp text-white fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.phonen_number_2}{" "}
                          </>
                        )}
                      </p>
                      <p className="mt-0">
                        {item.emailid && (
                          <>
                            <i
                              className="fa fa-envelope-o text-white fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.emailid}{" "}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="address">
              <div className="d-flex flex-wrap gap-4"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7 position-relative">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("map", true)} />
            )}
            {mapValues.google_map_url && (
              <iframe
                className="googlemap"
                src={mapValues?.google_map_url}
                height="450"
                width="100%"
              ></iframe>
            )}
          </div>
          <div className="col-md-5">
            {success && (
              <Alert
                mesg={"Thank you for contact us"}
                cssClass={`alert text-white w-75 mt-3 p-2 text-center bg-success`}
              />
            )}

            <form
              className="my-5 contactForm"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <Title
                title="Quick contact"
                cssClass="text-black text-center fs-3 fw-bold mb-4"
              />
              <InputField
                label="Name"
                fieldName="firstName"
                register={register}
                validationObject={fieldValidation.firstName}
                error={errors?.firstName?.message}
              />
              <InputField
                label="Email"
                fieldName="emailid"
                register={register}
                validationObject={fieldValidation.emailid}
                error={errors?.emailid?.message}
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
                validationObject={fieldValidation.phonen_number}
                error={errors?.phonen_number?.message}
              />
              <TextAreaField
                label="Message"
                fieldName="description"
                register={register}
                validationObject={fieldValidation.description}
                error={errors?.description?.message}
              />

              <div className="mb-3 row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 text-uppercase py-2"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {componentEdit.map ? (
        <div className="adminEditTestmonial">
          <GoogleMap
            mapValues={mapValues}
            editHandler={editHandler}
            componentType="map"
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};
export default Contact;
