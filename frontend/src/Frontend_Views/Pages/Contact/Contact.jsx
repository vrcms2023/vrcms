import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";
import Alert from "../../../Common/Alert";
import Banner from "../../../Common/Banner";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";

import AddressForm from "../../../Frontend_Admin/Components/forms/AddressForm";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import GoogleMap from "../../../Frontend_Admin/Components/forms/GoogleMap";

import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeCookie, setCookie } from "../../../util/cookieUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

// Styles
import "./Contact.css";
import { ContactPageStyled } from "../../../Common/StyledComponents/Styled-ContactPage";

// images
import { getAddressList } from "../../../redux/address/addressActions";
import {
  InputField,
  TextAreaField,
} from "../../../Frontend_Admin/Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import Title from "../../../Common/Title";
import ContactForm from "../../../Common/Forms/ContactForm";

const Contact = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    address: false,
    contact: false,
    map: false,
  };

  const pageType = "contactus";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);

  const [show, setShow] = useState(false);
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
  }, [addressList?.length]);

  useEffect(() => {
    if (!componentEdit.address) {
      dispatch(getAddressList());
    }
  }, [componentEdit?.address]);

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
    <ContactPageStyled>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
          bannerTitleCss = "text-end fs-2"
          bannerSubTitleCss = "text-end fw-normal"
          bannerDescriptionCss = "text-end d-block mt-2 fs-6"
          imageCss = "w-100"
          bannerContainerCss = "d-flex align-items-end justify-content-end flex-column"
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
          <div className="contactAddress position-relative col-md-12 text-white blueBg-500 p-3 p-md-5">
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
                  <div
                    className={`my-4 my-nd-0 ${addressList.length === 1 ? "col-md-12 text-center" : addressList.length === 2 ? "col-md-6" : addressList.length === 3 ? "col-md-4" : "col-md-3"}`}
                    key={index}
                  >
                    <Title
                      title={item.location_title}
                      cssClass="mb-2 fs-4 text-black"
                    />
                    <div className="mb-2 contactAddress">
                      <p className="m-0 fw-bold">{item.company_name}</p>
                      <p className="m-0">{item.address_dr_no}</p>
                      <p className="m-0">{item.street} </p>
                      <p className="m-0">{item.location} </p>
                      <p className="m-0">{item.city} </p>
                      <p className="mb-3">{item.state}</p>
                      {/* <p className="m-0">Pincode - {item.postcode}</p> */}
                      <p className="mt-2">
                        {item.phonen_number && (
                          <>
                            {/* <Title title="Phone Number :" cssClass="mb-2" /> */}
                            <i
                              className="fa fa-phone-square fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.phonen_number}
                          </>
                        )}
                      </p>
                      <p className="mt-2">
                        {item.phonen_number_2 && (
                          <>
                            {/* <Title title="Phone Number :" cssClass="mb-2" /> */}
                            <i
                              className="fa fa-phone-square fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.phonen_number_2}
                          </>
                        )}
                      </p>
                      <p className="mt-2">
                        {item.phonen_number_3 && (
                          <>
                            <i
                              className="fa fa-whatsapp fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.phonen_number_3}{" "}
                          </>
                        )}
                      </p>
                      <p className="mt-0">
                        {item.emailid_2 && (
                          <>
                            <i
                              className="fa fa-envelope-o fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.emailid_2}{" "}
                          </>
                        )}
                      </p>
                      <p className="mt-0">
                        {item.emailid_3 && (
                          <>
                            <i
                              className="fa fa-envelope-o fs-4 me-2"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.emailid_3}{" "}
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
          <div className="col-md-12 text-center py-4">
            <Title
              title="Quick contact"
              cssClass="fs-3 text-center fw-medium mb-2 pt-5"
            />
          </div>
          <div className="col-md-7 position-relative">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("map", true)} />
            )}
            {mapValues?.google_map_url && (
              <iframe
                title="Google map"
                className="googlemap"
                src={mapValues?.google_map_url}
                height="450"
                width="100%"
              ></iframe>
            )}
          </div>
          <div className="col-md-5 contact">
            {success && (
              <Alert
                mesg={"Thank you for contact us"}
                cssClass={`alert text-white w-50 mx-auto mt-3 p-2 text-center bg-success`}
              />
            )}

            {/* <form
              className="my-0 contactForm"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <InputField
                label="Name"
                fieldName="firstName"
                register={register}
                validationObject={fieldValidation.firstName}
                error={errors?.firstName?.message}
              />
              <InputField
                label="Email"
                fieldName="email"
                register={register}
                validationObject={fieldValidation.email}
                error={errors?.email?.message}
              />
              <InputField
                label="Phone"
                fieldName="phoneNumber"
                register={register}
                validationObject={fieldValidation.phoneNumber}
                error={errors?.phoneNumber?.message}
              />
              <TextAreaField
                label="Message"
                fieldName="description"
                register={register}
                validationObject={fieldValidation.description}
                error={errors?.description?.message}
              />

              <div className="mb-3 row">
                <div className="col-sm-12 mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 text-uppercase py-2"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </form> */}

            <ContactForm />
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
    </ContactPageStyled>
  );
};
export default Contact;
