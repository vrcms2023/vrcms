import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";

// Components
import Title from "../../../Common/Title";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import DeleteDialog from "../../../Common/DeleteDialog";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

import AddEditAdminNews from "../../../Frontend_Admin/Components/News";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";

import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getFormDynamicFields,
  getAboutUSSectionFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { getImagePath } from "../../../util/commonUtil";
import { sortByUpdatedDate } from "../../../util/dataFormatUtil";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";

// CSS
import { AboutPageStyled } from "../../../Common/StyledComponents/Styled-AboutPage";
import RichTextView from "../../../Common/RichTextView";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";

const About = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };
  const dispatch = useDispatch();
  const pageType = "aboutus";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [aboutList, setAboutList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});
  const [showHideCompList, setShowHideCompList] = useState([]);
  const showHideCompPageLoad = useRef(true);

  const { error, success, showHideList } = useSelector(
    (state) => state.showHide
  );

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  useEffect(() => {
    if (showHideList.length === 0 && showHideCompPageLoad.current) {
      dispatch(getShowHideComponentsListByPage(pageType));
      showHideCompPageLoad.current = false;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    getAboutUsList();
  }, []);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    } else {
      setEditCarousel({});
    }
    document.body.style.overflow = "hidden";
  };

  const getAboutUsList = async (id) => {
    try {
      let response = await axiosClientServiceApi.get(`aboutus/clientAboutus/`);
      let data = sortByUpdatedDate(response.data.aboutus);
      setAboutList(data);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  useEffect(() => {
    if (!componentEdit.editSection && !componentEdit.addSection) {
      getAboutUsList();
      setEditCarousel({});
    }
  }, [componentEdit.editSection, componentEdit.addSection]);

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.aboutus_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/aboutus/updateAboutus/${id}/`
      );
      if (response.status === 204) {
        const list = aboutList.filter((list) => list.id !== id);
        setAboutList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };

  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        {/* <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        /> */}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>
      {componentEdit.banner && (
        <div className={`adminEditTestmonial selected `}>
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            popupTitle="About Banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      )}
      <div
        className={
          showHideCompList?.aboutbriefintro?.visibility &&
          isAdmin &&
          hasPermission
            ? "border border-info mb-2"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.aboutbriefintro?.visibility}
            title={"A Brief Introduction Component"}
            componentName={"aboutbriefintro"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.aboutbriefintro?.id}
          />
        )}

        {/* INTRODUCTION COMPONENT */}
        {showHideCompList?.aboutbriefintro?.visibility && (
          <div className="breiftopMargin">
            {/* Brief Introduction  */}
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              linkCss="btn btn-outline d-flex justify-content-center align-items-center gap-3"
              linkLabel="Read More"
              moreLink=""
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
              detailsContainerCss="col-md-10 offset-md-1 py-3"
              anchorContainer="d-flex justify-content-center align-items-center mt-4"
              anchersvgColor="#17427C"
              pageType={pageType}
            />
            {componentEdit.briefIntro && (
              <div className={`adminEditTestmonial selected `}>
                <AdminBriefIntro
                  editHandler={editHandler}
                  componentType="briefIntro"
                  popupTitle="About Brief Intro"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <AboutPageStyled>
        <div className="container-fluid container-lg ">
          <div className="row my-3 d-flex align-items-center">
            {/* <div className="col-md-6 fs-3 mt-4 mt-md-0">
              <Title title="About Us" cssClass="fs-1 pageTitle" />
            </div> */}
            {isAdmin && hasPermission && (
              <div className="col-12 text-end">
                <span className="d-inline-block me-2">Add content</span>
                <button
                  type="submit"
                  className="btn btn-primary "
                  onClick={() => editHandler("addSection", true)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </div>
          {componentEdit.editSection || componentEdit.addSection ? (
            <div className={`adminEditTestmonial selected `}>
              <AddEditAdminNews
                editHandler={editHandler}
                category="about"
                popupTitle="About"
                editCarousel={editCarousel}
                setEditCarousel={setEditCarousel}
                componentType={`${
                  componentEdit.editSection ? "editSection" : "addSection"
                }`}
                imageGetURL="aboutus/clientAboutus/"
                imagePostURL="aboutus/createAboutus/"
                imageUpdateURL="aboutus/updateAboutus/"
                imageDeleteURL="aboutus/updateAboutus/"
                imageLabel="Add About us Banner"
                showDescription={false}
                showExtraFormFields={getAboutUSSectionFields()}
                dimensions={imageDimensionsJson("aboutus")}
              />
            </div>
          ) : (
            ""
          )}

          <div className="aboutPage">
            {aboutList.length > 0 ? (
              aboutList.map((item, index) => (
                <div
                  key={item.id}
                  className={`row ${
                    isAdmin
                      ? "border border-warning mb-4 position-relative"
                      : ""
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                >
                  {isAdmin && hasPermission && (
                    <>
                      <EditIcon
                        editHandler={() =>
                          editHandler("editSection", true, item)
                        }
                      />
                      <Link
                        className="deleteSection"
                        onClick={() => deleteAboutSection(item)}
                      >
                        <i
                          className="fa fa-trash-o text-danger fs-4"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  )}
                  <div className="col-12 col-lg-7 p-4 py-0 p-md-4 d-flex justify-content-center align-items-start flex-column leftColumn">
                    {item.aboutus_title ? (
                      <Title
                        title={item.aboutus_title}
                        cssClass=""
                        mainTitleClassess="fs-3 mb-2 title"
                        subTitleClassess=""
                      />
                    ) : (
                      ""
                    )}

                    {item.aboutus_sub_title ? (
                      <Title
                        title={item.aboutus_sub_title}
                        cssClass=""
                        mainTitleClassess="fs-6 text-secondary mb-2 subTitle"
                        subTitleClassess=""
                      />
                    ) : (
                      ""
                    )}
                    {/* <p>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</p> */}
                    <RichTextView
                      data={item?.aboutus_description}
                      className={""}
                    />
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: item.aboutus_description,
                      }}
                    /> */}
                  </div>

                  <div className="col-lg-5 p-4 p-md-0 d-flex justify-content-center align-items-start flex-column rightColumn">
                    {/* <Title
                          title={"OUR WORK LOCATIONS"}
                          cssClass="fs-5 my-5 title"
                        /> */}
                    <img
                      src={getImagePath(item.path)}
                      alt=""
                      className="w-75 object-fit-cover shadow m-auto"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted py-5">
                Please add page contents...
              </p>
            )}
          </div>
        </div>
      </AboutPageStyled>

      {show && <ModelBg />}
    </>
  );
};

export default About;
