import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
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

// Common Compoenents
import Banner from "../../../Common/Banner";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import HomeServices from "../../Components/HomeServices";
import ServiceOfferedComponent from "../../Components/ServiceOfferedComponent";
import Features from "../../Components/Features";
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
  getserviceOfferedFields,
  getTestimonialsFields,
  getTitleAndDescriptionFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

// Images
import imgOngoing from "../../../Images/carousel1.jpg";
import imgCompleted from "../../../Images/carousel2.jpg";
import imgFuture from "../../../Images/carousel3.jpg";
import { ProductHilightsStyled } from "../../../Common/StyledComponents/Styled-Products-Hilights";
import { TestimonialCarouselPageStyled } from "../../../Common/StyledComponents/Styled-TestimonialCarousel";
import { RandomHomeServicesStyled } from "../../../Common/StyledComponents/Random-HomeServices";
import { ABriefIntroStyled } from "../../../Common/StyledComponents/Styled-ABriefAbout";
import { getAllCategories } from "../../../redux/products/categoryActions";
import Product from "../Products/Product";
import { SimpleTitleDescComponent } from "../../../Frontend_Admin/Components/BriefIntro/SimpleTitleDescComponent";
import DynamicForm from "../../../Frontend_Admin/Components/forms/DynamicForm";

import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { HomeClientItem } from "../../Components/HomeClientItem";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import HomeProjects from "../../Components/HomeProjects";
import HomeProjectCarousel from "../../Components/HomeProjectCarousel";
import HomeDynamicServices from "../../Components/HomeDynamicServices";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import { HomeClientList } from "../../Components/HomeClientList";
import DownloadBrochures from "../../Components/DownloadBrochures";
import ListofTitleandDescription from "../../../Frontend_Admin/Components/forms/ListofTitleandDescription";
import { getHomeIntroList } from "../../../redux/homeintroList/homeIntroListActions";
import TitleWithDescripton from "../../Components/TitleWithDescripton";
import { HomeServiceStylesComponent } from "../../../Common/StyledComponents/Styled-HomeServices-Compoent";
import { HomeDynamicServiceStylesComponent } from "../../../Common/StyledComponents/Styled-HomeDynamicServices-Compoent";

import Button from "../../../Common/Button";
import WeServeCarousel from "../../Components/WeServeCarousel";

import { BrochureDownloadStyling } from "../../../Common/StyledComponents/Styled-BrochureDownload";
import { WeServedStyled } from "../../../Common/StyledComponents/Styled-WeServe-Component";
import { HomeProjectCauroselComponentStyles } from "../../../Common/StyledComponents/Styled-HomeProjectCarousel-Component";
import CounterForm from "../../../Frontend_Admin/Components/forms/CounterForm";
import CounterCompnentView from "../../../Common/CounterCompnentView";
import { CounterComponentStyles } from "../../../Common/StyledComponents/Styled-Count-Component";
import { HomeCauroselComponentStyles } from "../../../Common/StyledComponents/Styled-HomeCarousel";
import { TwoColumnCarouselStyles } from "../../../Common/StyledComponents/Styled-2-Column-Carousel";

// Styles
import { HomePageStyles } from "../../../Common/StyledComponents/Styled-HomePage";
import AdminSingleRecordUpload from "../../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import HeroBannerComponent from "../../../Common/Banner/HeroBannerComponent";
import CarouselComponent from "../../../Common/Carousel/CarouselComponent";
import IndustriesWeServeCarouselComponent from "../../../Common/Carousel/IndustriesweserveCarouselComponent";
import BriefWithShowHideToggleComponent from "../../../Common/Brief/BriefWithShowHideToggleComponent";
import BriefComponent from "../../../Common/Brief/BriefComponent";
import AdminListOfRecordsUpload from "../../../Frontend_Admin/Components/forms/V2/AdminListOfRecordsUpload";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    homeServicebriefIntro: false,
    projects: false,
    projectsBrief: false,
    testmonial: false,
    serviceOffered: false,
    product_development: false,
    product_distribution: false,
    iconsHelightsBrief: false,
    projectbriefIntro: false,
    homeService0: false,
    homeService1: false,
    homeService2: false,
    homeService3: false,
    homeService4: false,
    homeService5: false,
    homeDynamciServices: false,
    homeDynamciServicesBrief: false,
    counterlist: false,
    trainings: false,
    homecorporate: false,
    clientBrief: false,
    countBrief: false,
  };

  const productComp = {
    product_development: "product_development",
    product_distribution: "product_distribution",
    product_registration: "product_registration",
  };

  const homeServices = [1, 2, 3, 4, 5];

  const [counter, setCounter] = useState(0);
  const pageType = "home";
  const serviceOffered = "serviceOffered";
  const [testimonis, setTestmonis] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);

  const [homeCategoriesList, setHomeCategoriesList] = useState([]);
  const { categories } = useSelector((state) => state.categoryList);
  const { isLoading } = useSelector((state) => state.loader);
  const showHideCompPageLoad = useRef(true);

  const [productDevelopment, setProductDevelopment] = useState("");
  const [productDistribution, setProductDistribution] = useState("");
  const [productRegistration, setProductRegistration] = useState("");

  const [showHideCompList, setShowHideCompList] = useState([]);
  const { serviceMenu } = useSelector((state) => state.serviceMenu);
  const { homeIntroList } = useSelector((state) => state.homeIntroList);

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
    if (homeIntroList.length == 0) {
      dispatch(getHomeIntroList());
    }
  }, [homeIntroList?.length]);

  useEffect(() => {
    const getHomePageCategoryList = async () => {
      const ids = categories.map((item) => item.id);
      let categoryId = "";
      const arrURL = [];
      categories.forEach((item, index) => {
        arrURL.push(axiosClientServiceApi.get(`/products/getClinetProduct/${item.id}/`));
      });

      await Promise.all(arrURL).then(function (values) {
        const result = genereateCategoryProducts(values, categories);
        setHomeCategoriesList(result);
      });
    };

    if (categories?.length > 0 && homeCategoriesList?.length === 0) {
      getHomePageCategoryList();
    }
  }, [categories]);

  useEffect(() => {
    removeActiveClass();
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(`/testimonials/clientTestimonials/`);
        if (response?.status === 200) {
          const _testimonialsList = sortByFieldName(response.data.results, "testimonial_position");
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
    window.scrollTo(0, 0);
  }, []);

  const { error, success, showHideList } = useSelector((state) => state.showHide);

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

  /** End Visibility ON / OFF logic  */
  return (
    <HomePageStyles>
      <div className="container-fluid p-0">
        {/* ==== Download Broucher ======================================== */}
        <BrochureDownloadStyling>
          <div className="homeBrochure">
            <DownloadBrochures />
          </div>
        </BrochureDownloadStyling>
        {/* ==== END ======================================== */}

        {/* BANNER COMPONENT START ======================================== */}
        <HeroBannerComponent
          isAdmin={isAdmin}
          hasPermission={hasPermission}
          editHandler={editHandler}
          componentEdit={componentEdit}
          pageType={pageType}
          category={"hero-banner"}
          popupTitle="Hero Banner"
          componentType="banner"
          showHideComponentName="banner"
          showHideCompList={showHideCompList}
          showHideHandler={showHideHandler}
          showHideComponentTitle={"Hero Banner "}
        />

        {/* ==== END ======================================== */}

        {/* ==== CAROUSEL COMPONENT  ===================================== */}

        <CarouselComponent
          editHandler={editHandler}
          componentEdit={componentEdit}
          pageType={pageType}
          category={"hero-carousel"}
          popupTitle="Hero Carousel edit"
          componentType="carousel"
          showHideComponentName="carousel"
          showHideCompList={showHideCompList}
          showHideHandler={showHideHandler}
          showHideComponentTitle={"Hero Carousel "}
        />
        {/* ==== END CAROUSEL =============================== */}

        {/* BRIEF INTRODUCTION ========================================= */}

        <BriefWithShowHideToggleComponent
          editHandler={editHandler}
          componentType="briefIntro"
          popupTitle="Home page Brief Intro"
          pageType="home"
          componentEdit={componentEdit}
          showHideCompList={showHideCompList}
          showHideHandler={showHideHandler}
          editlabel={"briefIntro"}
          showHideComponentName={"briefintro"}
          ShowHideToggle={ShowHideToggle}
          detailsContainerCss="col-lg-10 offset-lg-1 text-center"
          showHideComponentTitle={"Brief Intro "}
        />
        {/* ==== END ===================================================== */}

        {/* ==== PROJECT + BRIEF INTRODUCTION START ===================================================================================================== */}

        <div
          className={
            showHideCompList?.hprinfra?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          <div className="commonBg homeProjectsContainer">
            {isAdmin && hasPermission && (
              <ShowHideToggle
                showhideStatus={showHideCompList?.hprinfra?.visibility}
                title={"Projects data fetched from the Project Dashboard [ LIMITED TO 3 ]"}
                componentName={"hprinfra"}
                showHideHandler={showHideHandler}
                id={showHideCompList?.hprinfra?.id}
              />
            )}
            {showHideCompList?.hprinfra?.visibility && (
              <>
                <BriefComponent
                  editHandler={editHandler}
                  componentType={"projectbriefIntro"}
                  popupTitle="Projects Brief"
                  pageType={`${pageType}projectbriefIntro`}
                  componentEdit={componentEdit}
                  editlabel={"Projects"}
                  detailsContainerCss="col-lg-10 offset-lg-1 text-center"
                  linkCss="btn btn-outline"
                />
                <HomeProjects />
              </>
            )}
          </div>
        </div>
        {/* ==== PROJECT END ===================================================================================================== */}

        {/* Dynamic ALL SERVICES ============================ */}
        <div
          className={
            showHideCompList?.homedynamciservicesbrief?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homedynamciservicesbrief?.visibility}
              title={"Services data fetched from the Services page [ LIMITED TO 6 ] "}
              componentName={"homedynamciservicesbrief"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homedynamciservicesbrief?.id}
            />
          )}
          {showHideCompList?.homedynamciservicesbrief?.visibility && (
            <HomeDynamicServiceStylesComponent>
              <div className="homeDynamciServicesIntro">
                <BriefComponent
                  editHandler={editHandler}
                  componentType={"homeDynamciServicesBrief"}
                  popupTitle="Dynamic Services Brief"
                  pageType={"homeDynamciServicesBrief"}
                  componentEdit={componentEdit}
                  editlabel={"Services"}
                  detailsContainerCss="col-lg-10 offset-lg-1 text-center"
                  linkCss="btn btn-outline"
                />

                <div className="container-fluid homeDynamciServices py-5">
                  <div className="container">
                    <div className="row">
                      <HomeServices />
                    </div>
                  </div>
                </div>
              </div>
            </HomeDynamicServiceStylesComponent>
          )}
        </div>
        {/* ==== END ======================= */}

        {/* ======================= HOME List of Services ======================= */}
        <div
          className={
            showHideCompList?.homeservices?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homeservices?.visibility}
              title={
                "Turbine Trainings – Brief Overview + Image with Text Description [ 2-Column ]"
              }
              componentName={"homeservices"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homeservices?.id}
            />
          )}
          {showHideCompList?.homeservices?.visibility && (
            <HomeServiceStylesComponent>
              <div className="container-fluid homeServicesBrief">
                <BriefComponent
                  editHandler={editHandler}
                  componentType={"homeServicebriefIntro"}
                  popupTitle="Dynamic Home Service Brief"
                  pageType={"HomeserviceBrief"}
                  componentEdit={componentEdit}
                  editlabel={"Services"}
                  detailsContainerCss="col-lg-10 offset-lg-1 text-center"
                  linkCss="btn btn-outline"
                />
              </div>
              <div className="homeServicesContainer">
                <div className="container py-5 homeServices randomServices">
                  {homeServices.map((service, i) => (
                    <div className="" key={i}>
                      <HomeDynamicServices
                        key={i}
                        index={i}
                        pageType={`homeService${i}`}
                        category={`dynamicService${i}`}
                        componentFlip={i % 2 === 0 ? true : false}
                        popupTitle={`Home Training Service ${i}`}
                        imageLabel={"Training Banner Image"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </HomeServiceStylesComponent>
          )}
        </div>

        {/* DYNAMIC SERVICE END  ===================================== */}

        {/* ICONS HEILIGHT START ================================= */}

        <BriefWithShowHideToggleComponent
          editHandler={editHandler}
          componentType="iconshelightsbrief"
          popupTitle={"Hilighted Brief "}
          pageType="home-iconshelightsbrief"
          componentEdit={componentEdit}
          editlabel={"Brief"}
          linkCss={"btn btn-outline"}
          linkLabel="Read More"
          detailsContainerCss="col-lg-10 offset-lg-1 text-center"
          showHideCompList={showHideCompList}
          ShowHideToggle={ShowHideToggle}
          showHideHandler={showHideHandler}
          showHideComponentName={"iconshelightsbrief"}
          showHideComponentTitle={"Hilighted Brief with BG Image "}
          briefRootDivClass="homeBriefheilights"
        />

        {/* ==== END ========================= */}

        {/* ==== HOME PROJECT CAROUSEL START ======================================= */}
        <div
          className={
            showHideCompList?.homeprojectcarousel?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homeprojectcarousel?.visibility}
              title={"2 Column Carousel dat fetched from Project Dashboard (Image | Content)"}
              componentName={"homeprojectcarousel"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homeprojectcarousel?.id}
            />
          )}
          {showHideCompList?.homeprojectcarousel?.visibility && (
            <TwoColumnCarouselStyles>
              <HomeProjectCarousel />
            </TwoColumnCarouselStyles>
          )}
        </div>

        {/* ==== END ============================== */}

        {/* ==== Trainings COMPONENT START ====================================================================================================*/}
        <div
          className={
            showHideCompList?.homecorporate?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homecorporate?.visibility}
              title={"Corporate Training [ TEXT SLIDER ]"}
              componentName={"homecorporate"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homecorporate?.id}
            />
          )}

          {showHideCompList?.homecorporate?.visibility && (
            <TestimonialCarouselPageStyled>
              <div className="container-fluid testimonialsContainer">
                <div className="row">
                  <div className="col-md-12 col-lg-8 offset-lg-2 testimonials text-center">
                    {isAdmin && hasPermission && (
                      <EditIcon
                        editHandler={() => editHandler("homecorporate", true)}
                        editlabel="Trainings"
                      />
                    )}

                    {homeIntroList.length > 0 && <TitleWithDescripton list={homeIntroList} />}
                  </div>
                  {componentEdit.homecorporate && (
                    <div className={`adminEditTestmonial selected `}>
                      <ListofTitleandDescription
                        editHandler={editHandler}
                        componentType="homecorporate"
                        popupTitle={`Corporate Training`}
                        homeintros={homeIntroList}
                        pageType={`homecorporate`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </TestimonialCarouselPageStyled>
          )}
        </div>
        {/* END OF Trainings COMPONENT =========================================================================================================== */}

        {/* ==== TESTIMONIAL COMPONENT START ====================================================================================================*/}
        <div
          className={
            showHideCompList?.testimonis?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.testimonis?.visibility}
              title={"Testimonials Slider Showcase"}
              componentName={"testimonis"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.testimonis?.id}
            />
          )}

          {showHideCompList?.testimonis?.visibility && (
            <TestimonialCarouselPageStyled>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <Title
                      title="Testimonials"
                      cssClass="fs-1 fw-bold text-center my-5 text-uppercase"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 testimonials text-center">
                    {isAdmin && hasPermission && (
                      <EditIcon editHandler={() => editHandler("testmonial", true)} />
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
                  {componentEdit.testmonial && (
                    <div className={`adminEditTestmonial selected `}>
                      <AdminListOfRecordsUpload
                        editHandler={editHandler}
                        componentType="testmonial"
                        popupTitle={`Testmonial Banner`}
                        getImageListURL="testimonials/clientTestimonials/"
                        deleteImageURL="testimonials/updateTestimonials/"
                        imagePostURL="testimonials/createTestimonials/"
                        imageUpdateURL="testimonials/updateTestimonials/"
                        imageIndexURL="testimonials/updateTestimonialsindex/"
                        imageLabel="Add your Image"
                        showExtraFormFields={getTestimonialsFields("testmonial")}
                        dimensions={imageDimensionsJson("testimonial")}
                        sideDeck="testimonialpopup"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TestimonialCarouselPageStyled>
          )}
        </div>
        {/* END OF TESTIMONIAL COMPONENT =========================================================================================================== */}

        {/* === CLIENTS - SCROLL START ===========================================================================  */}

        <HomeClientList showHideCompList={showHideCompList} showHideHandler={showHideHandler} />

        {/* === CLIENTS - COMPONENTS DEVELOPER IN SAP DESIGNS END ===========================================================================  */}

        {/* COUNTER COMPONENT START =========================================================================================================== */}
        <div
          className={
            showHideCompList?.counterlist?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.counterlist?.visibility}
              title={"Achievements Counter"}
              componentName={"counterlist"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.counterlist?.id}
            />
          )}

          {showHideCompList?.counterlist?.visibility && (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 p-0 ">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() => editHandler("counterlist", true)}
                      editlabel="Counter"
                    />
                  )}
                  <CounterComponentStyles>
                    <CounterCompnentView
                      getDataAPIURL={`counter/getClientCounterSet/`}
                      componentState={componentEdit.counterlist}
                    />
                  </CounterComponentStyles>
                </div>
              </div>
              {componentEdit.counterlist && (
                <div className="adminEditTestmonial selected">
                  <CounterForm
                    editHandler={editHandler}
                    componentType={"counterlist"}
                    componentTitle="Counter component"
                    formPostURL={`/counter/create/`}
                    formUpdateURL={`/counter/updateCounterlist/`}
                    getDataAPIURL={`/counter/getClientCounterSet/`}
                    componentState={componentEdit.counterlist}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {/* === END COUNTER ======================================== */}

        {/* ==== INDUSTRIES WE SERVE - START ======================================================================================================= */}

        <IndustriesWeServeCarouselComponent
          editHandler={editHandler}
          componentEdit={componentEdit}
          pageType={pageType}
          category={"Industries-we-serve"}
          popupTitle="Industries We Serve"
          componentType="industriesweserve"
          showHideComponentName="industriesweserve"
          showHideCompList={showHideCompList}
          showHideHandler={showHideHandler}
        />

        {/* ==== INDUSTRIES WE SERVE END ========================================================================================================= */}

        {/* LEON Pharma Products START =========================================================================================================== */}
        <div
          className={
            showHideCompList?.producthilight?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
          style={showHideCompList?.producthilight?.visibility ? { height: "160px" } : {}}
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.producthilight?.visibility}
              title={"Key Highlight"}
              componentName={"producthilight"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.producthilight?.id}
            />
          )}
          {showHideCompList?.producthilight?.visibility && (
            <ProductHilightsStyled>
              <div className="container position-relative d-none d-md-block">
                <div className="row rounded-3 overflow-hidden position-absolute hiligntsContainer">
                  <div className="col-sm-4 p-4 p-lg-5 py-lg-4 ">
                    <div className="position-relative">
                      {isAdmin && hasPermission && (
                        <EditIcon
                          editHandler={() => editHandler(productComp.product_development, true)}
                          editlabel="Hilights"
                        />
                      )}

                      <SimpleTitleDescComponent
                        formgetURL={`/carousel/clientHomeIntro/${productComp.product_development}/`}
                        componentEdit={componentEdit.product_development}
                        setFormValues={setProductDevelopment}
                        formvalues={productDevelopment}
                      />
                      {componentEdit.product_development && (
                        <div className={`adminEditTestmonial selected `}>
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
                          editHandler={() => editHandler(productComp.product_distribution, true)}
                          editlabel="Hilights"
                        />
                      )}
                      <SimpleTitleDescComponent
                        formgetURL={`/carousel/clientHomeIntro/${productComp.product_distribution}/`}
                        componentEdit={componentEdit.product_distribution}
                        setFormValues={setProductDistribution}
                        formvalues={productDistribution}
                      />
                      {componentEdit.product_distribution && (
                        <div className={`adminEditTestmonial selected `}>
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
                          editHandler={() => editHandler(productComp.product_registration, true)}
                          editlabel="Hilights"
                        />
                      )}
                      <SimpleTitleDescComponent
                        formgetURL={`/carousel/clientHomeIntro/${productComp.product_registration}/`}
                        componentEdit={componentEdit.product_registration}
                        setFormValues={setProductRegistration}
                        formvalues={productRegistration}
                      />
                      {componentEdit.product_registration && (
                        <div className={`adminEditTestmonial selected `}>
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
          )}
        </div>
        {/* LEON Pharma Products END =========================================================================================================== */}

        {/* === Random Hilights START Duplicate=========================================================================================================== */}
        {/* <div
          className={
            showHideCompList?.services?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.services?.visibility}
              title={"Image with Text Description – 2-Column -Duplicate - Turbine Trainings"}
              componentName={"services"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.services?.id}
            />
          )}
          {showHideCompList?.services?.visibility && (
            <ABriefIntroStyled>
              <h1 className="fs-1 fw-bold text-center text-uppercase">
                Image with Text description
              </h1>
              <div className="container-lg mx-0 mx-md-0 px-md-0 mx-lg-auto randomServices">
                <div className="row">
                  <ABriefAbout
                    col1="col-md-6 ps-sm-0"
                    col2="col-md-6 p-4 p-md-5 d-flex justify-content-center align-items-start flex-column"
                    cssClass="fs-3 mb-3 fw-bolder title"
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
                    cssClass="fs-3 mb-3 fw-bolder title"
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
                    cssClass="fs-3 mb-3 fw-bolder title"
                    imageClass="w-100 object-fit-cover imgStylingLeft shadow"
                    dimensions={imageDimensionsJson("whoweare")}
                    pageType={"whatwedo"}
                    componentFlip={false}
                  />
                </div>
              </div>
            </ABriefIntroStyled>
          )}
        </div> */}
        {/* END OF Random Hilights =========================================================================================================== */}

        {/* ==== PRODUCTS CATEGORIES  START ===================================================================================================== */}
        <div
          className={
            showHideCompList?.homeproducts?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homeproducts?.visibility}
              title={"Home Products"}
              componentName={"homeproducts"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homeproducts?.id}
            />
          )}
          {showHideCompList?.homeproducts?.visibility && (
            <div className="container">
              <Title
                title="Products"
                cssClass="fs-1 fw-bold text-center my-5 pt-0 pt-md-5 text-uppercase"
              />
              <div className="row">
                {homeCategoriesList.map(
                  (category) =>
                    category?.products?.length > 0 && (
                      <div key={category.id}>
                        <Product item={category.products[0]} categoryId={category.id} />
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
        {/* END OF PRODUCTS CATEGORIES =========================================================================================================== */}

        {/* HOME NEWS START =================================================================================================*/}
        <div
          className={
            showHideCompList?.news?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.news?.visibility}
              title={"News | Latest Updates"}
              componentName={"news"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.news?.id}
            />
          )}
          {showHideCompList?.news?.visibility && (
            <div className="container">
              <div className="row py-5 homeNews">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <div className="container">
                    <Title
                      title="News"
                      cssClass="fs-1 fw-bold text-center my-5 pt-0 pt-md-5 text-uppercase"
                    />
                    <HomeNews news={news} setNews={setResponseData} pageType={pageType} />

                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Ancher
                        AncherLabel="More Articles"
                        Ancherpath="/news"
                        AncherClass="btn btn-outline d-flex justify-content-center align-items-center "
                        AnchersvgColor="#17427C"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* END OF HOME NEWS START =================================================================================================*/}

        {/* ===== HOME WHY CHOOSE RISHSYSTEMS START ============================================================================================ */}
        <div
          className={
            showHideCompList?.news?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.whoweare?.visibility}
              title={"Who we are"}
              componentName={"whoweare"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.whoweare?.id}
            />
          )}
          {showHideCompList?.whoweare?.visibility && (
            <div className="row ABriefAbout mb-5">
              <ABriefAbout
                cssClass="mb-2 fw-bold title text-black"
                dimensions={imageDimensionsJson("whoweare")}
              />
            </div>
          )}
        </div>
        {/* ===== HOME WHY CHOOSE RISHSYSTEMS END ============================================================================================ */}

        {/* ==== HOME Services SPECICALLY DEVELOPED FOR RISHISYSTEMS START ==================================================================== */}

        <div
          className={
            showHideCompList?.homeservicedetails?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homeservicedetails?.visibility}
              title={"Service Overview – Custom Layout"}
              componentName={"homeservicedetails"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homeservicedetails?.id}
            />
          )}
          {showHideCompList?.homeservicedetails?.visibility && (
            <div className="row">
              <div className="col-md-12 ABrief">
                <ABrief cssClass="fw-bold title" dimensions={imageDimensionsJson("homeCareers")} />
              </div>
            </div>
          )}
        </div>
        {/* ==== HOME Services SPECICALLY DEVELOPED FOR RISHISYSTEMS END ==================================================================== */}

        {/* ==== HOME Careers START ========================================================================================================== */}
        <div
          className={
            showHideCompList?.homecareers?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.homecareers?.visibility}
              title={"Explore Careers"}
              componentName={"homecareers"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.homecareers?.id}
            />
          )}
          {showHideCompList?.homecareers?.visibility && (
            <div className="row homeCareers py-5">
              <div className="col-lg-6"></div>
              <div className="col-md-12 col-lg-6 pe-lg-5">
                <BriefIntroFrontend
                  introState={componentEdit.briefIntro}
                  pageType="careers"
                  introTitleCss="fs-3 fw-medium text-md-center"
                  introSubTitleCss="fw-medium text-muted text-md-center"
                  introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
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
            </div>
          )}
        </div>
        {/* ==== HOME Careers END ========================================================================================================== */}

        {/* ==== IMAGE GALLERY SPECIFICALLY DESIGNED FOR SAP DESIGN STUDIO START =============================================================== */}

        {/* It will be work only one carosel in the page */}
        <div
          className={
            showHideCompList?.gallery?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.gallery?.visibility}
              title={"Fetched from Images Gallery [ CAROUSEL ]"}
              componentName={"gallery"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.gallery?.id}
            />
          )}
          {showHideCompList?.gallery?.visibility && (
            <ImageGalleryStyled>
              <>
                <div className="container">
                  <div className="row">
                    {/* <Title title="View Gallery" cssClass="text-center fs-3" /> */}
                    {isAdmin && hasPermission && (
                      <EditIcon editHandler={() => editHandler("weserve", true)} />
                    )}

                    <BriefIntroFrontend
                      pageType={pageType}
                      introState={componentEdit.weserve}
                      detailsContainerCss="col-md-10 offset-md-1 text-center"
                      introTitleCss="fs-3"
                      introSubTitleCss=""
                      introDecTitleCss=""
                      linkLabel="Read More"
                      linkCss="btn btn-outline mb-2"
                      moreLink=""
                      anchorContainer=""
                      anchersvgColor=""
                    />
                  </div>
                </div>

                {componentEdit.weserve && (
                  <div className={`adminEditTestmonial selected `}>
                    <BriefIntroAdmin
                      editHandler={editHandler}
                      componentType="weserve"
                      popupTitle="Brief Intro Banner"
                      pageType="Home"
                    />
                  </div>
                )}
              </>
              <div className="container">
                <div className="row ">
                  <div className="col-md-10 offset-md-1 homeGalleryCarousel">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-10 offset-md-1">
                          <Carousel
                            carouselState={componentEdit.carousel}
                            category={"industriesweserve"}
                            containerId="imageGallerycarousel"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center py-4 position-relative ">
                <Link to="/imageGallery" className="btn btn-outline">
                  View All
                </Link>
              </div>
            </ImageGalleryStyled>
          )}
        </div>

        {/* ==== IMAGE GALLERY SPECIFICALLY DESIGNED FOR SAP DESIGN STUDIO END=============================================================== */}

        {/* == SAP DESIGN STUDIO START========================================================================================================== */}

        {/* SERVICES OFFERED COMPONENT -  DEVELOPED FOR SPECIFICALLY SAP DESIGNS */}
        <div
          className={
            showHideCompList?.servicesoffered?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.servicesoffered?.visibility}
              title={"Services Offered"}
              componentName={"servicesoffered"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.servicesoffered?.id}
            />
          )}
          {showHideCompList?.servicesoffered?.visibility && (
            <>
              <div className="text-center mb-5" style={{ marginTop: "100px" }}>
                <span
                  className="fs-4 px-4 py-2"
                  style={{ borderBottom: "1px solid rgba(68, 68, 68, 0.37)" }}
                >
                  Services Offered
                </span>
              </div>
              <div className="row">
                <div className="col-md-12 carousel">
                  {isAdmin && hasPermission && (
                    <EditIcon
                      editHandler={() => editHandler("serviceOffered", true)}
                      editlabel=""
                    />
                  )}

                  <ServiceOfferedComponent
                    getBannerAPIURL={`carousel/clientCarouselbyCategory/${serviceOffered}/`}
                    componentEdit={componentEdit}
                  />
                </div>
              </div>

              {componentEdit.serviceOffered && (
                <div className="adminEditTestmonial selected">
                  <AdminListOfRecordsUpload
                    editHandler={editHandler}
                    componentType={"serviceOffered"}
                    popupTitle={"Services Offered"}
                    getImageListURL={`carousel/createCarousel/${serviceOffered}/`}
                    deleteImageURL="carousel/updateCarousel/"
                    imagePostURL={`carousel/createCarousel/${serviceOffered}/`}
                    imageUpdateURL="carousel/updateCarousel/"
                    imageIndexURL="carousel/updateCarouselindex/"
                    imageLabel="Add Images"
                    showExtraFormFields={getserviceOfferedFields(serviceOffered)}
                    dimensions={imageDimensionsJson("carousel")}
                    sideDeck="carouselpopup"
                  />
                  {/* <AdminBanner
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
                  /> */}
                </div>
              )}
            </>
          )}
        </div>
        {/* == SAP DESIGN STUDIO END========================================================================================================== */}

        {/* ==== FEATURES SPECICALLY DEVELOPED FOR RISHISYSTEMS START ========================================================================== */}
        <div
          className={
            showHideCompList?.features?.visibility && isAdmin && hasPermission
              ? "componentOnBorder"
              : ""
          }
        >
          {isAdmin && hasPermission && (
            <ShowHideToggle
              showhideStatus={showHideCompList?.features?.visibility}
              title={"Features – Static Version"}
              componentName={"features"}
              showHideHandler={showHideHandler}
              id={showHideCompList?.features?.id}
            />
          )}
          {showHideCompList?.features?.visibility && <Features />}
        </div>
        {/* ==== FEATURES SPECICALLY DEVELOPED FOR RISHISYSTEMS END ========================================================================== */}

        {/* {showEditPop && <ModelBg />} */}

        {show && <ModelBg />}
      </div>
    </HomePageStyles>
  );
};

export default Home;
