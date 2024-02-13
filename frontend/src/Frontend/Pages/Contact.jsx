import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// Components
import Title from "../../Common/Title";
import BriefIntroFrontend from "../../Common/BriefIntro";
import Alert from "../../Common/Alert";
import Banner from "../../Common/Banner";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import AddressTextArea from "../../Admin/Components/forms/FooterInputs";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import GoogleMap from "../../Admin/Components/forms/GoogleMap";

import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getCookie, removeCookie, setCookie } from "../../util/cookieUtil";
import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import { getFooterValues } from "../../features/footer/footerActions";

// Styles
import { ContactPageStyled } from "../../Common/StyledComponents/Styled-ContactPage";

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
  const [mesg, setMesg] = useState("");
  const [show, setShow] = useState(false);
  const [formerror, setFormerror] = useState({});
  const [success, setsuccess] = useState(false);
  const [footerValues, setFooterValues] = useState(false);
  const navigate = useNavigate();
  const [mapValues, setMapValues] = useState("");
  const { footerData, error } = useSelector((state) => state.footerData);

  const dispatch = useDispatch();

  useEffect(() => {
    removeActiveClass();
  }, []);

  const handleChange = (event) => {
    setsuccess(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormerror((prevFormData) => ({ ...prevFormData, [name]: "" }));
  };

  /**
   * contactus form submit
   */
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validationform(formData);
    setFormerror(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      const response = await axiosClientServiceApi.post(`/contactus/`, {
        ...formData,
      });
      if (response.status === 201) {
        toast.success("Your request is submit succuessfully");
        removeCookie("clientInformation");
        setCookie("clientInformation", formData.email, { maxAge: 86400 });
        setFormData(formObject);
        setFormerror("");
        setsuccess(true);
      } else {
        toast.error("unable to process your request");
      }
    } catch (error) {
      toast.error("unable to process your request");
    }
  };
  const validationform = (value) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value.firstName) {
      errors.firstName = "Please Enter Name";
    }

    if (!value.phoneNumber) {
      errors.phoneNumber = "Please Enter Phone Number";
    }

    if (!value.email) {
      errors.email = "Please Enter Email";
    } else if (!emailPattern.test(value.email)) {
      errors.email = "Enter Valid Email";
    }

    return errors;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!componentEdit.address && footerData?.address?.length > 0) {
      dispatch(getFooterValues());
    }
  }, [componentEdit.address]);

  useEffect(() => {
    if (footerData?.address?.length > 0) {
      setFooterValues(footerData.address[0]);
    }
  }, [footerData]);

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
        `footer/getGoogleMapURL/`,
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
          <div className="contactAddress position-relative col-md-4 text-white d-flex justify-content-start align-items-start blueBg-500 p-5 py-3 p-md-5">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("address", true)} />
            )}
            <div className="address`">
              <Title title="Address" cssClass="fs-3" />
              {/* <Title
                title="We’d Love to Hear From You, Get In Touch With Us!"
                cssClass="fs-6 mb-4"
              /> */}
              <p className="mb-5">
                {footerValues.address_dr_no}, {footerValues.location} <br />
                {footerValues.street} <br />
                {footerValues.city} - {footerValues.postcode} <br />
                {footerValues.state}
              </p>

              <div>
                <Title title="Phone Number :" cssClass="mb-2" />
                {/* {footerValues.phonen_number} 
                {footerValues.phonen_number_2} */}
                <p className="">{footerValues.phonen_number}</p>
                <p>
                  {footerValues.phonen_number_2 ? (
                    <>
                      {footerValues.phonen_number_2}{" "}
                      <i
                        className="fa fa-whatsapp text-white fs-1 ms-2"
                        aria-hidden="true"
                      ></i>
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <Title title="Email Id :" cssClass="mt-5 mb-2" />
                <p>
                  <a
                    className="fs-6 text-white"
                    href={`mailto:${footerValues.emailid}`}
                  >
                    {footerValues.emailid}{" "}
                  </a>
                  {/* <a
                    href="mailto:contact@hprinfraprojects.com"
                    className="fs-6 text-white"
                  >
                    {" "}
                    contact@hprinfraprojects.com
                  </a> */}
                </p>
              </div>
            </div>
            {componentEdit.address ? (
              <div className="adminEditTestmonial">
                <AddressTextArea
                  editHandler={editHandler}
                  componentType="address"
                  footerValues={footerValues}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            {success && (
              <Alert
                mesg={"Thank you for contact us"}
                cssClass={`alert text-white w-75 mt-3 p-2 text-center bg-success`}
              />
            )}

            <form
              className="my-2 py-3 py-md-5 contactForm"
              onSubmit={onFormSubmit}
            >
              <Title
                title="Quick contact"
                cssClass="fw-bold fs-4 mb-5 text-center formTitle"
              />

              <div className="mb-3 row">
                <label
                  htmlFor="exampleInputFName"
                  className="col-sm-2 col-form-label"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="textbox"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputFName"
                    aria-describedby="emailHelp"
                  />

                  {formerror.firstName !== null ? (
                    <div id="emailHelp" className="form-text text-danger">
                      {formerror.firstName}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="exampleInputEmail1"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  {formerror.email !== null ? (
                    <div id="emailHelp" className="form-text text-danger">
                      {formerror.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="exampleInputPhone"
                  className="col-sm-2 col-form-label"
                >
                  Phone
                </label>
                <div className="col-sm-10">
                  <input
                    type="textbox"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPhone"
                    aria-describedby="emailHelp"
                  />
                  {formerror.phoneNumber !== null ? (
                    <div id="emailHelp" className="form-text text-danger">
                      {formerror.phoneNumber}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="exampleFormMesg"
                  className="col-sm-2 col-form-label"
                >
                  Message
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    id="exampleFormMesg"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
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

        <div className="row">
          <div className="col">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("map", true)} />
            )}

            <iframe
              className="googlemap"
              src={
                mapValues?.google_map_url ? mapValues.google_map_url : defautURL
              }
              height="450"
              width="100%"
            ></iframe>

            {/* <iframe
              className="googlemap"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"
              height="450"
              width="100%"
            ></iframe> */}
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
