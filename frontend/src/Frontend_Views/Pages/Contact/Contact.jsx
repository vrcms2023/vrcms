import React, { useState, useEffect, useRef } from "react";
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
import { getFormDynamicFields, imageDimensionsJson } from "../../../util/dynamicFormFields";

// Styles
import { ContactPageStyled } from "../../../Common/StyledComponents/Styled-ContactPage";

// images
import { getAddressList } from "../../../redux/address/addressActions";
import { InputField, TextAreaField } from "../../../Frontend_Admin/Components/forms/FormFields";
import { fieldValidation } from "../../../util/validationUtil";
import Title from "../../../Common/Title";
import ContactForm from "../../../Common/Forms/ContactForm";
import { Link } from "react-router-dom";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import RaqUseForm from "../../Components/RaqUseForm";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";
import BriefWithShowHideToggleComponent from "../../../Common/Brief/BriefWithShowHideToggleComponent";

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
      const response = await axiosClientServiceApi.get(`footer/getGoogleMapURL/`);
      if (response?.data?.mapURL?.length > 0) {
        const data = response.data.mapURL[0];
        setMapValues(data);
      }
    } catch (e) {
      console.log("unable to access ulr because of server is down");
    }
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  const showHideHandler = async (id, compName) => {
    if (id) {
      dispatch(updateShowHideComponent(id));
    } else {
      const newData = {
        componentName: compName.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent(newData));
    }
  };

  return (
    <ContactPageStyled>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"contactus-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"Contact Banner"}
        showHideComponentName={"contactusbanner"}
      />

      <BriefWithShowHideToggleComponent
        editHandler={editHandler}
        componentType="briefIntro"
        popupTitle="Contact Brief Introduction Component"
        pageType={pageType}
        componentEdit={componentEdit}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        editlabel={"Brief"}
        showHideComponentName={"contactbriefintro"}
        detailsContainerCss="col-lg-10 offset-lg-1 text-center"
        showHideComponentTitle={"Contact Brief Intro "}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="contactPage position-relative col-md-12 text-white blueBg-500 p-0 p-md-3 p-md-5">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("address", true)} editlabel="Address" />
            )}
            {componentEdit.address && (
              <div className={`adminEditTestmonial selected `}>
                <AddressForm
                  editHandler={editHandler}
                  popupTitle="Address Details"
                  componentType="address"
                  address={addressList}
                />
              </div>
            )}

            <div className="container">
              <div className="row flipCSS">
                <>
                  {/* <div
                    className={`my-4 my-nd-0 ${addressList.length === 1 ? "col-md-8 text-center" : addressList.length === 2 ? "col-md-6" : addressList.length === 3 ? "col-md-4" : "col-md-3"}`}
                    
                  > */}

                  <div className="col-md-12 col-lg-8">
                    <div className="row">
                      {addressList?.map((item, index) => (
                        <div
                          className={`my-4 px-4 px-sm-auto addressItem ${addressList.length === 1 ? "col-md-12" : addressList.length === 2 ? "col-md-6" : addressList.length === 3 ? "col-md-6" : "col-md-3"}`}
                        >
                          {item.location_title && (
                            <Title title={item.location_title} cssClass="mb-2 title" />
                          )}

                          <div className="mb-2 contactAddress" key={index}>
                            {item.company_name && (
                              <p className="m-0 fs-4 fw-medium"> {item.company_name} </p>
                            )}

                            {item.address_dr_no && <p className="m-0">{item.address_dr_no}</p>}
                            {item.street && <p className="m-0">{item.street} </p>}
                            {item.location && <p className="m-0">{item.location} </p>}
                            {item.city && <p className="m-0">{item.city} </p>}
                            {item.state && <p className="mb-3">{item.state}</p>}

                            {/* <p className="m-0">Pincode - {item.postcode}</p> */}
                            {item.phonen_number && (
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
                            )}

                            {item.phonen_number_2 && (
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
                            )}

                            {item.phonen_number_3 && (
                              <p className="mt-2">
                                {item.phonen_number_3 && (
                                  <>
                                    <i className="fa fa-whatsapp fs-4 me-2" aria-hidden="true"></i>{" "}
                                    {item.phonen_number_3}{" "}
                                  </>
                                )}
                              </p>
                            )}

                            {item.emailid && (
                              <p className="mt-0">
                                {item.emailid && (
                                  <>
                                    <i
                                      className="fa fa-envelope-o fs-4 me-2"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {/* <a href="">{item.emailid_2}</a> */}
                                    <Link to={`mailto: ${item.emailid && item.emailid}`}>
                                      ${item.emailid && item.emailid}
                                    </Link>
                                  </>
                                )}
                              </p>
                            )}

                            {item.emailid_2 && (
                              <p className="mt-0">
                                {item.emailid_2 && (
                                  <>
                                    <i
                                      className="fa fa-envelope-o fs-4 me-2"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {/* <a href="">{item.emailid_2}</a> */}
                                    <Link to={`mailto: ${item.emailid_2 && item.emailid_2}`}>
                                      ${item.emailid_2 && item.emailid_2}
                                    </Link>
                                  </>
                                )}
                              </p>
                            )}

                            {item.emailid_3 && (
                              <p className="mt-0">
                                {item.emailid_3 && (
                                  <>
                                    <i
                                      className="fa fa-envelope-o fs-4 me-2"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    <Link to={`mailto: ${item.emailid_3 && item.emailid_3}`}>
                                      ${item.emailid_3 && item.emailid_3}
                                    </Link>
                                  </>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {addressList.length === 0 && (
                        <p className="text-center">No addresses found</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-4 ">
                    {success && (
                      <Alert
                        mesg={"Thank you for contact us"}
                        cssClass={`alert text-white w-50 mx-auto mt-3 p-2 text-center bg-success`}
                      />
                    )}
                    <div className="p-3 quickContact">
                      <RaqUseForm buttonLabel="SEND REQUEST" />
                    </div>
                  </div>
                </>
              </div>
            </div>

            <div className="address">
              <div className="d-flex flex-wrap gap-4"></div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-md-12 text-center py-0 py-md-4">
            <Title
              title="Quick contact"
              cssClass="fs-3 text-center fw-medium mb-2 pt-5"
            />
          </div> */}
          {/* <div className="col-md-5 contact mb-5">
            {success && (
              <Alert
                mesg={"Thank you for contact us"}
                cssClass={`alert text-white w-50 mx-auto mt-3 p-2 text-center bg-success`}
              />
            )}

            <ContactForm />
          </div> */}
          <div className="col-md-12 p-0 position-relative" style={{ bottom: "-10px" }}>
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("map", true)} editlabel="Map" />
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
        </div>
      </div>
      {componentEdit.map && (
        <div className={`adminEditTestmonial selected `}>
          <GoogleMap
            mapValues={mapValues}
            editHandler={editHandler}
            componentType="map"
            popupTitle="Google Map"
          />
        </div>
      )}

      {show && <ModelBg />}
    </ContactPageStyled>
  );
};
export default Contact;
