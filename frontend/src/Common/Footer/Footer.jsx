import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import FooterAdminFeilds from "../../Frontend_Admin/Components/forms/FooterInputs";
import ContactInputs from "../../Frontend_Admin/Components/forms/ContactInputs";
import AdminTermsPolicy from "../../Frontend_Admin/Components/TermsPrivacy/index";
import { getFooterValues } from "../../redux/footer/footerActions";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";
import { getAddressList } from "../../redux/address/addressActions";

// Modal
import Model from "../../Common/Model";
import ModelBg from "../ModelBg";

// Images
import EditIcon from "../AdminEditIcon";
// import Logo from "../../Images/logo.png";
import svgLogo from "../../Images/logo.svg";

// Styles
import { FooterStyled } from "../StyledComponents/Styled-Footer";
import Ancher from "../Ancher";
import Title from "../Title";
import Button from "../Button";
import DownloadBrochures from "../../Frontend_Views/Components/DownloadBrochures";

const Footer = () => {
  const editComponentObj = {
    termsPolacy: false,
    address: false,
    contact: false,
    social: false,
  };

  const [footerValues, setFooterValues] = useState(false);
  const [address, setAddress] = useState({});
  const [show, setShow] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const { isAdmin } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [termsAndPolicyData, setTermsAndPolicyData] = useState({});
  const [termsAndConditionData, setTermsAndConditionData] = useState({});
  const { footerData } = useSelector((state) => state.footerData);
  const { addressList } = useSelector((state) => state.addressList);
  const dispatch = useDispatch();

  const { menuList } = useSelector((state) => state.auth);
  const [counter, setCounter] = useState(0);
  const date = new Date();
  const fullYear = date.getFullYear();

  // console.log(footerData)
  // console.log(addressList, "addressList")

  useEffect(() => {
    if (!componentEdit?.address || (footerData?.length === 0 && counter < 3)) {
      dispatch(getFooterValues());
      setCounter(counter + 1);
    }
  }, [componentEdit.address, footerData.length, dispatch]);

  useEffect(() => {
    if (footerData?.address?.length > 0) {
      setFooterValues(footerData.address[0]);
    }
  }, [footerData]);

  useEffect(() => {
    if (addressList?.length === 0 && counter < 3) {
      dispatch(getAddressList());
      setCounter(counter + 1);
    }
    if (addressList?.length > 0) {
      setAddress(addressList[0]);
    }
  }, [dispatch, addressList, addressList.length]);

  const showModel = (type) => {
    if (type === "PP") {
      setTermsAndConditionData({
        title: "Privacy Polacy",
        data: termsAndPolicyData.privacy_policy,
      });
    } else {
      setTermsAndConditionData({
        title: "Terms And Conditions",
        data: termsAndPolicyData.terms_condition,
      });
    }
    setModelShow(!modelShow);
  };
  const closeModel = () => {
    setModelShow(!modelShow);
  };

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/footer/getTermsAndCondition/`
        );
        if (response?.data?.terms?.length > 0) {
          setTermsAndPolicyData(response?.data?.terms[0]);
        }
      } catch (error) {
        console.log("unable to save the terms and condition form");
      }
    };
    if (!componentEdit.termsPolacy) {
      getFooterValues();
    }
  }, [componentEdit.termsPolacy]);

  return (
    <FooterStyled>
      <div className="container-fluid footerCompanyBrief py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-3 d-flex align-items-center">
              <img
                src={svgLogo}
                width="90%"
                alt="ICONS ENGINEERING WITH EXCELLENCE"
                className="footerLogo"
              />
            </div>
            <div className="col-md-8 col-lg-9 d-flex align-items-center">
              <p className="description m-0 text-center text-md-start p-4 pb-0 p-md-0">
                ICONS has Integrated Management System in accordance to ISO ,
                focused mainly on continuous improvement and learning based on
                the successes and failures that occur during our day-to-day
                activities. This system is a fundamental element in the
                innovation process and encompasses the entire value chain.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="pt-0">
        <div className="container footerDetails">
          {/* <div className="logo text-center text-md-start">
            <img src={Logo} alt="SAP Design Studio" className="footerLogo" />
          </div> */}
          {/* <hr className="d-block d-md-none my-4" /> */}
          {/* <div className="row">
            <div className="col-md-4 col-lg-3 d-flex align-items-center">
              <img
                src={svgLogo}
                width="90%"
                alt="ICONS ENGINEERING WITH EXCELLENCE"
                className="footerLogo"
              />
            </div>
            <div className="col-md-8 col-lg-9 d-flex align-items-center">
              <p className="description m-0 text-center text-md-start p-4 pb-0 p-md-0">
                ICONS has Integrated Management System in accordance to ISO ,
                focused mainly on continuous improvement and learning based on
                the successes and failures that occur during our day-to-day
                activities. This system is a fundamental element in the
                innovation process and encompasses the entire value chain.
              </p>
            </div>
          </div> */}
          {/* <hr className="my-4" /> */}
          <div className="row py-5">
            <div className="col-md-4 text-center text-md-start">
              <Title title="Company" />

              <ul className="row ps-2">
                {menuList?.map((menu) => {
                  return <ChildMenuContent menu={menu} key={menu.id} />;
                })}

                {/* <li>
                  <Link to="/" className="ms-0">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link
                    to={`/services/${urlStringFormat(
                      getCookie("pageLoadServiceName")
                    )}/`}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/news">News & Updates</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li> */}
                {/* <li>
                  <Link to="" onClick={showModel}>
                    Privacy Policy
                  </Link>
                </li> */}
              </ul>
            </div>
            <hr className="d-block d-md-none my-4" />

            {/* <div 
              className={`col-md-3 text-center text-md-start ${
                isAdmin
                  ? "border border-warning mb-3 position-relative"
                  : ""
              }`}
            >
               {isAdmin && (
                  <Ancher 
                    Ancherpath="/contact"
                    AncherClass="btn btn-warning float-end"
                    handleModel=""
                    AncherLabel="Edit"
                    icon=""
                    // icon="fa-arrow-right"
                    iconCss="ms-2 m-auto"
                  />
                )}
              {address && (
                <>
                  <Title title="Address"  />

                  <p className="m-0 fw-bold">{address.company_name}</p>
                  <p className="m-0">{address.address_dr_no}</p>
                  <p className="m-0">{address.street} </p>
                  <p className="m-0">{address.location} </p>
                  <p className="m-0">{address.city} </p>
                  <p className="m-0">{address.state}</p>
                  <p className="mb-4">{address.location_title}</p>
                </>
              )}              
            </div> */}

            <div
              className={`col-md-4 col-lg-4 text-center text-md-start reachUs ${
                isAdmin ? "" : ""
              }`}
            >
              {/* {isAdmin && (
                  <Ancher 
                    Ancherpath="/contact"
                    AncherClass="btn btn-warning float-end"
                    handleModel=""
                    AncherLabel="Edit"
                    icon=""
                    iconCss="ms-2 m-auto"
                  />
                )} */}
              <Title title="Reach Us" />
              {address.phonen_number ? (
                <p className="m-0 pb-2">
                  {/* <i className="fa fa-phone fs-5 me-2" aria-hidden="true"></i> */}
                  {address?.phonen_number}
                </p>
              ) : (
                ""
              )}
              {address.phonen_number_2 ? (
                <p className="m-0 pb-2">
                  {/* <i className="fa fa-phone fs-5 me-2" aria-hidden="true"></i> */}
                  {address?.phonen_number_2}
                </p>
              ) : (
                ""
              )}
              {address.phonen_number_3 ? (
                <p className="m-0 pb-2">
                  {/* <i
                    className="fa fa-whatsapp fs-5 me-2"
                    aria-hidden="true"
                  ></i> */}
                  {address?.phonen_number_3}
                </p>
              ) : (
                ""
              )}

              {address.emailid ? (
                <>
                  <p className="m-0 pb-2">
                    {/* <i
                      className="fa fa-paper-plane fs-5 me-2"
                      aria-hidden="true"
                    ></i> */}
                    <Link to={`mailto: ${address?.emailid}`}>
                      {address?.emailid}
                    </Link>
                  </p>
                </>
              ) : (
                ""
              )}
              {address.emailid_2 ? (
                <>
                  <p className="m-0 pb-3 ">
                    {/* <i
                      className="fa fa-paper-plane fs-5 me-2"
                      aria-hidden="true"
                    ></i> */}
                    <Link to={`mailto: ${address?.emailid_2}`}>
                      {address?.emailid_2}
                    </Link>
                  </p>
                </>
              ) : (
                ""
              )}
              {address.emailid_3 ? (
                <>
                  <p className="m-0 ">
                    {/* <i
                      className="fa fa-envelope fs-5 me-2"
                      aria-hidden="true"
                    ></i> */}
                    <Link to={`mailto: ${address?.emailid_3}`}>
                      {address?.emailid_3}
                    </Link>
                  </p>
                </>
              ) : (
                ""
              )}

              {/* <div className="d-flex flex-column justify-content-center align-items-center text-center justify-content-md-start align-items-md-start text-md-start mt-4">
                <Title title="Downloads" />
                <Button label="Download Brochure" cssClass="btn btn-primary" />

                <div>
                  <DownloadBrochures />
                </div>
              </div> */}
            </div>
            <hr className="d-block d-md-none my-4" />
            {
              <div
                // align-items-center justify-content-md-center justify-content-lg-end align-items-md-end align-items-end justify-content-md-end
                // ${ isAdmin ? "border border-warning mb-3 position-relative" : "" }
                className={`col-md-4 col-lg-4 pb-md-0 socialMedia d-flex flex-column gap-5 gap-md-0 align-items-center align-items-md-start justify-content-between pb-4 pb-md-0`}
              >
                <div className="FooterAddress">
                  <Title title="We Are At" />
                  {/* <img
                  src={Logo}
                  alt="SAP Design Studio"
                  className="footerLogo"
                />  */}

                  <h4 className="mb-3 ">{address?.company_name}</h4>
                  <p className="m-0 ">{address?.address_dr_no}</p>
                  <p className="m-0 ">{address?.city}</p>

                  <p className="m-0 ">{address?.street}</p>
                  <p className="m-0 ">{address?.state}</p>
                  <p className="m-0 ">{address?.postcode}</p>
                </div>

                <div
                  className={`socialLinks ${
                    isAdmin
                      ? "border border-warning mb-3 position-relative p-3"
                      : ""
                  }`}
                >
                  {isAdmin && (
                    <EditIcon
                      editHandler={() => editHandler("address", true)}
                    />
                  )}

                  {footerValues.whatsapp_number && (
                    <Link
                      to={`https://wa.me/${footerValues.whatsapp_number}?text=Thank you for contact us`}
                      target="_blank"
                    >
                      <i
                        className="fa fa-brands fa-whatsapp"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}

                  {footerValues.facebook_url && (
                    <Link to={footerValues.facebook_url} target="_blank">
                      <i
                        className="fa fa-facebook-square"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}

                  {footerValues.twitter_url && (
                    <Link to={footerValues.twitter_url} target="_blank">
                      <i
                        className="fa fa-twitter-square"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}

                  {footerValues.youtube_url ? (
                    <Link to={footerValues.youtube_url} target="_blank">
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </Link>
                  ) : (
                    ""
                  )}

                  {footerValues.linkedIn_url && (
                    <Link to={footerValues.linkedIn_url} target="_blank">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )}

                  {footerValues.instagram_url && (
                    <Link to={footerValues.instagram_url} target="_blank">
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </Link>
                  )}

                  {footerValues.vimeo_url && (
                    <Link to={footerValues.vimeo_url} target="_blank">
                      <i className="fa fa-vimeo" aria-hidden="true"></i>
                    </Link>
                  )}

                  {footerValues.pinterest_url && (
                    <Link to={footerValues.pinterest_url} target="_blank">
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </Link>
                  )}
                </div>
                {/* <small className="mt-3 fw-medium text-center text-md-end copyRight">
                  {" "}
                  {fullYear} 2025 Copyright ICONS Engineering. All rights reserved.
                </small> */}
              </div>
            }
          </div>
        </div>

        <div className="p-3 footerCopyRights">
          {isAdmin && (
            <EditIcon editHandler={() => editHandler("termsPolacy", true)} />
          )}

          <div className="container">
            <div className="row">
              <div className="">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center  gap-2">
                  &copy; {fullYear} - All rights reserved
                  {/* <span className="d-inline-block  d-none d-md-block">|</span> */}
                  <div className="d-flex gap-2">
                    <Link
                      to="#"
                      className="text-decoration-underline"
                      onClick={() => showModel("TC")}
                    >
                      Terms & Conditions
                    </Link>{" "}
                    <span className="d-inline-block d-none d-md-block">|</span>
                    <Link
                      to="#"
                      className="text-decoration-underline"
                      onClick={() => showModel("PP")}
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
                {/* <span className="d-block mt-2 ">
                  Designed & developed by{" "}
                  <a href="http://www.varadesigns.com" className="dby">
                    <small className="p-1 fw-bold d-inline-block">
                      VARA-DESIGNS
                    </small>
                  </a>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {modelShow && (
        <Model
          obj={termsAndConditionData}
          privacy={""}
          closeModel={closeModel}
          flag="footer"
        />
      )}
      {componentEdit.address && (
        <div className="adminEditTestmonial selected">
          <FooterAdminFeilds
            editHandler={editHandler}
            componentType="address"
            popupTitle="Address"
            footerValues={footerValues}
          />
        </div>
      )}
      {componentEdit.termsPolacy && (
        <div className="adminEditTestmonial selected">
          <AdminTermsPolicy
            termsAndConditionData={termsAndPolicyData}
            editHandler={editHandler}
            popupTitle="Terms and Policy"
            componentType="termsPolacy"
          />
        </div>
      )}
      {componentEdit.contact && (
        <div className="adminEditTestmonial selected">
          <ContactInputs
            editHandler={editHandler}
            componentType="contact"
            popupTitle="Contact"
          />
        </div>
      )}
      {modelShow && <ModelBg closeModel={closeModel} />}
    </FooterStyled>
  );
};
export default Footer;

const ChildMenuContent = ({ menu }) => {
  return (
    <li className="col-6">
      <Link to={menu?.page_url}>{menu?.page_label}</Link>
    </li>
  );
};
