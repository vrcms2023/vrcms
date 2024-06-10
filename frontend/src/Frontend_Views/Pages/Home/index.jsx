import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

// Components
import Title from "../../../Common/Title";
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntroAdmin from "../../../Frontend_Admin/Components/BriefIntro/";
import EditIcon from "../../../Common/AdminEditIcon";
import ABrief from "../../Components/ABrief";
import ABriefAbout from "../../Components/ABriefAbout";
import HomeNews from "../../Components/HomeNews";
import HomeServices from "../../Components/HomeServices";
import ServiceOfferedComponent from "../../Components/ServiceOfferedComponent";
import Features from "../../Components/Features";
import { HomeClientItem } from "../../Components/HomeClientItem";

// Common Compoenents
import Banner from "../../../Common/Banner";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import { ImageGalleryStyled } from "../../../Common/StyledComponents/Styled-ImageGallery";
import { HomeClientsStyled } from "../../../Common/StyledComponents/Styled-HomeClients";

// Utilities
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getObjectPositionKey,
  sortByFieldName,
  genereateCategoryProducts,
} from "../../../util/commonUtil";
import {
  getCarouselFields,
  getFormDynamicFields,
  getTestimonialsFields,
  getTitleAndDescriptionFields,
  getserviceOfferedFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";

// // import Img1 from '../../../Images/future.png';
// import randomImg1 from '../../../Images/randomService1.png'
// import randomImg2 from '../../../Images/randomService2.png'
// import randomImg3 from '../../../Images/randomService3.png'

// Styles
import "./Home.css";

// Images
import imgOngoing from "../../../Images/carousel1.jpg";
import imgCompleted from "../../../Images/carousel2.jpg";
import imgFuture from "../../../Images/carousel3.jpg";
import ProductsList from "../Products/ProductsList";
import { ProductHilightsStyled } from "../../../Common/StyledComponents/Styled-Products-Hilights";
import { TestimonialCarouselPageStyled } from "../../../Common/StyledComponents/Styled-TestimonialCarousel";
import { RandomHomeServicesStyled } from "../../../Common/StyledComponents/Random-HomeServices";
import Button from "../../../Common/Button";
import { ABriefIntroStyled } from "../../../Common/StyledComponents/Styled-ABriefAbout";
import { getAllCategories } from "../../../redux/products/categoryActions";
import Product from "../Products/Product";
import { SimpleTitleDescComponent } from "../../../Frontend_Admin/Components/BriefIntro/SimpleTitleDescComponent";
import DynamicForm from "../../../Frontend_Admin/Components/forms/DynamicForm";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
    serviceOffered: false,
    product_development: false,
    product_distribution: false,
  };

  const productComp = {
    product_development: "product_development",
    product_distribution: "product_distribution",
    product_registration: "product_registration",
  };

  const pageType = "home";
  const serviceOffered = "serviceOffered";
  const [testimonis, setTestmonis] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [homeCategoriesList, setHomeCategoriesList] = useState([]);
  const { categories } = useSelector((state) => state.categoryList);
  const { isLoading } = useSelector((state) => state.loader);

  const [productDevelopment, setProductDevelopment] = useState("");
  const [productDistribution, setProductDistribution] = useState("");
  const [productRegistration, setProductRegistration] = useState("");
  const dispatch = useDispatch();

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  const setResponseData = (data) => {
    if (data?.results.length > 0) {
      const _positionKey = getObjectPositionKey(data.results[0]);
      const _newslList = sortByFieldName(data.results, _positionKey);
      setNews(_newslList.slice(0, 4));
    } else {
      setNews([]);
    }
  };

  useEffect(() => {
    const getHomePageCategoryList = async () => {
      const ids = categories.map((item) => item.id);
      let categoryId = "";
      const arrURL = [];
      categories.forEach((item, index) => {
        arrURL.push(
          axiosClientServiceApi.get(`/products/getClinetProduct/${item.id}/`)
        );
      });

      await Promise.all(arrURL).then(function (values) {
        const result = genereateCategoryProducts(values, categories);
        setHomeCategoriesList(result);
      });
    };

    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
    if (categories.length > 0 && homeCategoriesList.length === 0) {
      getHomePageCategoryList();
    }
  }, [categories]);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`
        );
        if (response?.status === 200) {
          const _testimonialsList = sortByFieldName(
            response.data.results,
            "testimonial_position"
          );
          setTestmonis(_testimonialsList);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.testmonial) {
      getTestimonial();
    }
  }, [componentEdit.testmonial]);

  useEffect(() => {
    const getClientList = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/client/getAllClientLogos/`
        );
        if (response?.status === 200) {
          const _clientList = sortByFieldName(
            response.data.results,
            "client_position"
          );

          setClientsList(_clientList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getClientList();
  }, []);

  return (
    <>
      <div className="container-fluid">
        {/* BANNER COMPONENT  */}
        {/* <div className="row">
          <div className="col-md-12 p-0 position-relative homePage">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("banner", true)} />
            )}
            <Banner
              getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
              bannerState={componentEdit.banner}
            />
          </div>
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
        )} */}

        {/* CAROUSEL COMPONENT  */}
        <div className="row">
          <div className="col-md-12 p-0 carousel">
            {isAdmin && hasPermission && <EditIcon editHandler={editHandler} />}
            <Carousel carouselState={componentEdit.carousel} />
          </div>
        </div>

        {componentEdit.carousel && (
          <div className="adminEditTestmonial">
            <AdminBanner
              editHandler={editHandler}
              componentType="carousel"
              getImageListURL="carousel/createCarousel/"
              deleteImageURL="carousel/updateCarousel/"
              imagePostURL="carousel/createCarousel/"
              imageUpdateURL="carousel/updateCarousel/"
              imageIndexURL="carousel/updateCarouselindex/"
              imageLabel="Add Carousel Image"
              showDescription={false}
              showExtraFormFields={getCarouselFields("carousel")}
              dimensions={imageDimensionsJson("carousel")}
            />
          </div>
        )}

        {/* LEON Pharma Products  */}

        <ProductHilightsStyled>
          <div className="container position-relative d-none d-md-block">
            <div className="row text-white rounded-3 overflow-hidden position-absolute hiligntsContainer">
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_development, true)
                      }
                    />
                  )}

                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_development}/`}
                    componentEdit={componentEdit.product_development}
                    setFormValues={setProductDevelopment}
                    formvalues={productDevelopment}
                  />
                  {componentEdit.product_development && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_development}
                        componentTitle="Product Development component"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productDevelopment}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_development
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_distribution, true)
                      }
                    />
                  )}
                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_distribution}/`}
                    componentEdit={componentEdit.product_distribution}
                    setFormValues={setProductDistribution}
                    formvalues={productDistribution}
                  />

                  {componentEdit.product_distribution && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_distribution}
                        componentTitle="Product Distribution component"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productDistribution}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_distribution
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                <div className="position-relative">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() =>
                        editHandler(productComp.product_registration, true)
                      }
                    />
                  )}
                  <SimpleTitleDescComponent
                    formgetURL={`/carousel/clientHomeIntro/${productComp.product_registration}/`}
                    componentEdit={componentEdit.product_registration}
                    setFormValues={setProductRegistration}
                    formvalues={productRegistration}
                  />

                  {componentEdit.product_registration && (
                    <div className="adminEditTestmonial">
                      <DynamicForm
                        editHandler={editHandler}
                        componentType={productComp.product_registration}
                        componentTitle="Product Distribution component"
                        formPostURL={`/carousel/createHomeIntro/`}
                        formUpdateURL={`/carousel/updateHomeIntro/`}
                        editObject={productRegistration}
                        dynamicFormFields={getTitleAndDescriptionFields(
                          productComp.product_registration
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ProductHilightsStyled>

        <div className="container mt-0 mt-md-5 pt-md-5">
          <Title
            title="Product Categories"
            cssClass="fs-2 text-center my-5 my-md-5 pt-0 pt-md-5"
          />
          <div className="row">
            {homeCategoriesList.map(
              (category) =>
                category?.products?.length > 0 && (
                  <>
                    <Product
                      item={category.products[0]}
                      categoryId={category.id}
                    />
                    {/* {category.category_name} */}
                  </>
                )
            )}
          </div>
        </div>

        {/* INTRODUCTION COMPONENT */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <div className="container">
          <div className="row my-4">
            {/* <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType="Home"
            /> */}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              linkCss="btn btn-outline d-flex justify-content-center align-items-center gap-3"
              linkLabel="Read More"
              moreLink=""
              introTitleCss = "fs-3 fw-medium text-md-center"
              introSubTitleCss = "fw-medium text-muted text-md-center"
              introDecTitleCss = "fs-6 fw-normal w-75 m-auto text-md-center"
              detailsContainerCss="col-md-10 offset-md-1 py-3"
              anchorContainer="d-flex justify-content-center align-items-center mt-4"
              anchersvgColor="#17427C"
              pageType={pageType}
            />
          </div>
        </div>

        {componentEdit.briefIntro && (
          <div className="adminEditTestmonial">
            <BriefIntroAdmin
              editHandler={editHandler}
              componentType="briefIntro"
              pageType="Home"
            />
          </div>
        )}

        {/* Random Hilights */}
        <ABriefIntroStyled>
          <div className="container-lg mx-0 mx-md-0 px-md-0 mx-lg-auto randomServices">
            <div className="row">
              <ABriefAbout
                col1="col-md-6 ps-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingLeft shadow"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"productPortfolio"}
                componentFlip={false}
              />
            </div>

            <div className="row d-flex flex-row-reverse my-3 my-md-5">
              <ABriefAbout
                col1="col-md-6 pe-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingRight shadow imgStyling"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"promoting"}
                componentFlip={false}
              />
            </div>
            <div className="row">
              <ABriefAbout
                col1="col-md-6 ps-sm-0"
                col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                cssClass="fs-3 fw-medium title"
                imageClass="w-100 object-fit-cover imgStylingLeft shadow"
                dimensions={imageDimensionsJson("whoweare")}
                pageType={"whatwedo"}
                componentFlip={false}
              />
            </div>
          </div>
        </ABriefIntroStyled>

        {/* Random Home Services 
        <RandomHomeServicesStyled>
          <div className="container py-5 randomServices">
            <div className="row">
              <div className="col-md-6">
                <img src={imgOngoing} alt="" className="w-100 shadow" />
              </div>
              <div className="col-md-6 p-3 p-md-5 d-flex flex-column justify-content-center">
                <Title
                  title="Product portfolio"
                  cssClass="text-black fs-3 fw-medium"
                />
                <p>
                  Through our relentless pursuit of quality and innovation, we
                  have achieved several milestones that highlight our success in
                  the healthcare industry.
                </p>
                <Link to="" className="moreLink">
                  More...
                </Link>
              </div>
            </div>

            <div className="row my-2 my-md-5 d-flex flex-row flex-md-row-reverse">
              <div className="col-md-6">
                <img src={imgCompleted} alt="" className="w-100 shadow" />
              </div>
              <div className="col-md-6 p-3 p-md-5 d-flex flex-column justify-content-center">
                <Title
                  title="Promoting healt and well being"
                  cssClass="text-black fs-3 fw-medium"
                />
                <p>
                  Through our relentless pursuit of quality and innovation, we
                  have achieved several milestones that highlight our success in
                  the healthcare industry.
                </p>
                <Link to="" className="moreLink">
                  More...
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <img src={imgFuture} alt="" className="w-100 shadow" />
              </div>
              <div className="col-md-6 p-3 p-md-5 d-flex flex-column justify-content-center">
                <Title
                  title="What we do"
                  cssClass="text-black fs-3 fw-medium"
                />
                <p>
                  Through our relentless pursuit of quality and innovation, we
                  have achieved several milestones that highlight our success in
                  the healthcare industry.
                </p>
                <Link to="" className="moreLink">
                  More...
                </Link>
              </div>
            </div>
          </div>
        </RandomHomeServicesStyled>
        */}
        {/* TESTIMONIAL COMPONENT */}
        <TestimonialCarouselPageStyled>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Title
                  title="Testimonials"
                  cssClass="fs-2 text-center fw-medium mb-5 pt-5"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 p-5 testimonials text-center">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler("testmonial", true)}
                  />
                )}

                {testimonis.length < 1 ? (
                  (testimonis.length, "No Testimonials Found")
                ) : testimonis.length === 1 ? (
                  <h4>Please add 2 or more testimonials.</h4>
                ) : testimonis.length > 1 ? (
                  <Testimonials testimonis={testimonis} />
                ) : (
                  ""
                )}
              </div>

              {componentEdit.testmonial ? (
                <div className="adminEditTestmonial">
                  <AdminBanner
                    editHandler={editHandler}
                    componentType="testmonial"
                    getImageListURL="testimonials/clientTestimonials/"
                    deleteImageURL="testimonials/updateTestimonials/"
                    imagePostURL="testimonials/createTestimonials/"
                    imageUpdateURL="testimonials/updateTestimonials/"
                    imageIndexURL="testimonials/updateTestimonialsindex/"
                    imageLabel="Add your Image"
                    titleTitle="Testmonial Name"
                    descriptionTitle="Testimonial Writeup "
                    showDescription={false}
                    showExtraFormFields={getTestimonialsFields("testmonial")}
                    dimensions={imageDimensionsJson("testimonial")}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </TestimonialCarouselPageStyled>

        {/* HOME News */}
        <div className="row py-5 homeNews">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              <Title
                title="News"
                cssClass="fs-2 text-center fw-medium mb-5 pt-5"
              />
              <HomeNews
                news={news}
                setNews={setResponseData}
                pagetype={pageType}
              />

              <div className="d-flex justify-content-center align-items-center mt-4">
                <Ancher
                  AncherLabel="Read more"
                  Ancherpath="/news"
                  AncherClass="btn btn-outline d-flex justify-content-center align-items-center "
                  AnchersvgColor="#17427C"
                />
              </div>
            </div>
          </div>
        </div>

        {/* HOME List of Services DEVELOPED FOR LEOMTECH  */}
        {/* <div className="container py-5 homeServices">
          <h2 className="mb-5">What We Do</h2>
          <HomeServices />
        </div>
        */}

        {/* FEATURES SPECICALLY DEVELOPED FOR RISHISYSTEMS */}
        {/* <Features /> */}

        {/* HOME WHY CHOOSE RISHSYSTEMS */}
        {/* <div className="row ABriefAbout mb-5">
          <ABriefAbout
            cssClass="mb-2 fw-bold title text-black"
            dimensions={imageDimensionsJson("whoweare")}
          />
        </div> */}

        {/*  HOME Services SPECICALLY DEVELOPED FOR RISHISYSTEMS */}
        {/* <div className="row">
          <div className="col-md-12 ABrief">
            <ABrief
              cssClass="fw-bold title"
              dimensions={imageDimensionsJson("homeCareers")}
            />
          </div>
        </div> */}

        {/* BANNER COMPONENT  */}
        {/* <div className="row">
          <div className="col-md-12 p-0 position-relative homePage">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("banner", true)} />
            )}
            <Banner
              getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
              bannerState={componentEdit.banner}
            />
          </div>
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
        )} */}

        {/* HOME Careers */}
        {/* <div className="row homeCareers py-5">
          <div className="col-lg-6"></div>
          <div className="col-md-12 col-lg-6 pe-lg-5">
            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType="careers"
              introTitleCss = "fs-3 fw-medium text-md-center"
              introSubTitleCss = "fw-medium text-muted text-md-center"
              introDecTitleCss = "fs-6 fw-normal w-75 m-auto text-md-center"
            />
            <div className="bg-white px-5 pb-4 d-flex justify-content-center align-items-center">
              <Ancher
                AncherLabel="Careers"
                Ancherpath="/careers"
                AncherClass="btn btn-primary d-flex justify-content-center align-items-center gap-3 w-50"
                AnchersvgColor="#ffffff"
              />
            </div>
          </div>
        </div> */}
      </div>

      {/* <hr /> */}
      {/* <Title title="SAP DESIGN STUDIO" cssClass="text-center fs-1" /> */}

      {/* IMAGE GALLERY SPECIFICALLY DESIGNED FOR SAP DESIGN STUDIO */}
      {/* It will be work only one carosel in the page */}
      {/* <ImageGalleryStyled>
          <div className="text-center mb-5" style={{ marginTop: "100px" }}>
            <span
              className="fs-1 px-4 py-2"
              style={{ borderBottom: "1px solid #444444" }}
            >
              View Gallery
            </span>
          </div>
          <div className="row ">
            <div className="col-md-10 offset-md-1 homeGalleryCarousel">
              <div className="container">
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <Carousel carouselState={componentEdit.carousel} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-center py-4 position-relative "
            style={{ marginTop: "200px" }}
          >
            <Link to="/imageGallery" className="btn btn-outline">
              View All
            </Link>
          </div>
        </ImageGalleryStyled> */}

      {/* SAP DESIGN STUDIO */}

      {/* SERVICES OFFERED COMPONENT -
        DEVELOPED FOR SPECIFICALLY SAP DESIGNS */}

      {/* <div className="text-center mb-5" style={{ marginTop: "100px" }}>
          <span
            className="fs-1 px-4 py-2"
            style={{ borderBottom: "1px solid #444444" }}
          >
            Services Offered
          </span>
        </div>
        <div className="row">
          <div className="col-md-12 carousel">
            {isAdmin && hasPermission && (
              <EditIcon
                editHandler={() => editHandler("serviceOffered", true)}
              />
            )}

            <ServiceOfferedComponent
              getBannerAPIURL={`carousel/clientCarouselbyCategory/${serviceOffered}/`}
              componentEdit={componentEdit}
            />
          </div>
        </div>

        {componentEdit.serviceOffered && (
          <div className="adminEditTestmonial">
            <AdminBanner
              editHandler={editHandler}
              componentType="serviceOffered"
              getImageListURL={`carousel/getCarousel/${serviceOffered}/`}
              deleteImageURL="carousel/updateCarousel/"
              imagePostURL="carousel/createCarousel/"
              imageUpdateURL="carousel/updateCarousel/"
              imageIndexURL="carousel/updateCarouselindex/"
              imageLabel="Add Images"
              showDescription={false}
              showExtraFormFields={getserviceOfferedFields(serviceOffered)}
              dimensions={imageDimensionsJson("carousel")}
            />
          </div>
        )} */}

      {/* CLIENTS - COMPONENTS DEVELOPER IN SAP DESIGNS */}
      {/* <HomeClientsStyled>
          <div className="text-center mb-5" style={{ marginTop: "100px" }}>
            <span
              className="fs-1 px-4 py-2"
              style={{ borderBottom: "1px solid #444444" }}
            >
              Clients
            </span>
          </div>
          <div className="clients-image-slider">
            <div className="image-slider-track">
              {clientsList.map((client) => {
                return <HomeClientItem client={client} key={client.id} />;
              })}
            </div>
          </div>
          <div className="text-center py-4 position-relative viewAllBtn">
            <Link to="/clients" className="btn btn-outline">
              View All
            </Link>
          </div>
        </HomeClientsStyled> */}

      {/* END OF SAP DESIGN STUDIO COMPONENTS */}

      {/* HPR INFRA */}

      {/* Project Cards */}
      {/* <hr />
      <Title title="HPR INFRA" cssClass="text-center fs-1" />
      <div className="row my-5 homeProjectsBg">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <img
                    src={imgOngoing}
                    className="card-img-top"
                    alt="Ongoing Projects"
                  />
                  <div className="card-body">
                    <Title title="Ongoing Projects" cssClass="blue-900" />
                    <p className="card-text mb-4">
                      At HPR Infra, innovation meets excellence as we craft
                      spaces that reflect our commitment to quality and
                      contemporary design. With projects seamlessly blending
                      into the city's dynamic landscape, each development is a
                      testament to our dedication to creating not just
                      structures, but vibrant communities. Join us on this
                      journey towards the future of real estate, where HPR Infra
                      is shaping the skyline and your dreams. Discover ongoing
                      excellence with us!
                    </p>
                    <Link to="/projects">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4 my-3 my-md-0">
                <div className="card cardGreenBg">
                  <img
                    src={imgFuture}
                    className="card-img-top"
                    alt="Completed Projects"
                  />
                  <div className="card-body">
                    <Title
                      title="Completed Projects"
                      cssClass="text-white blue-900"
                    />
                    <p className="card-text mb-5">
                      Step into the legacy of excellence as we proudly showcase
                      our successfully completed projects that stand as
                      testaments to our commitment to quality and innovation in
                      Hyderabad. From meticulously designed open plot layouts to
                      signature apartment constructions, each completed
                      endeavour reflects the essence of HPR Infra's dedication
                      to crafting not just structures, but thriving communities.
                    </p>
                    <br />
                    <Link to="/projects">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <img
                    src={imgCompleted}
                    className="card-img-top"
                    alt="Future Projects"
                  />
                  <div className="card-body">
                    <Title title="Future Projects" cssClass="blue-900" />
                    <p className="card-text mb-4">
                      Welcome to HPR Infra, a beacon of innovation in
                      Hyderabad's real estate landscape. With a legacy of
                      completing multiple open plot layouts, we now set our
                      sights on the future. Our upcoming projects redefine
                      modern living, blending innovation and sustainability for
                      a dynamic urban experience. Join us as we shape not just
                      structures but vibrant communities that echo the
                      aspirations of generations to come. Explore the future of
                      living with HPR Infra – where innovation meets your
                      dreams.
                    </p>
                    <Link to="/projects" className="">
                      Continue{" "}
                      <svg
                        width="15"
                        height="8"
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                          fill="#165D3D"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* END OF HPR INFRA COMPONENTS */}

      {componentEdit.projects ? (
        <div className="adminEditTestmonial">
          <AdminBanner editHandler={editHandler} componentType="projects" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
      {/* {showEditPop && <ModelBg />} */}
    </>
  );
};

export default Home;
