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
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";

// CSS
import { AboutPageStyled } from "../../../Common/StyledComponents/Styled-AboutPage";
import RichTextView from "../../../Common/RichTextView";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  getShowHideComponentsListByPage,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";
import AdminSingleRecordUpload from "../../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";

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
      //let data = sortByUpdatedDate(response.data);
      setAboutList(response.data);
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
      const response = await axiosServiceApi.delete(`/aboutus/updateAboutus/${id}/`);
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
            // message={`deleting the ${name} Service?`}
            message={
              <>
                Confirm deletion of <span>{name}</span> service?
              </>
            }
          />
        );
      },
    });
  };

  return (
    <>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"about-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"About Banner"}
        showHideComponentName={"aboutbanner"}
      />
      <div
        className={
          showHideCompList?.aboutbriefintro?.visibility && isAdmin && hasPermission
            ? "componentOnBorder"
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
              pageType={pageType}
              introState={componentEdit.briefIntro}
              detailsContainerCss="col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center"
              // border="border-light border-bottom border-5"
              introTitleCss=""
              introSubTitleCss="py-3 d-inline-block"
              introDecTitleCss=""
              linkLabel="Read More"
              linkCss="btn btn-outline"
              moreLink=""
              anchorContainer=""
              anchersvgColor=""
              mainTitleClassess={"fs-3"}
              seoTitle={true}
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
              <div className="col-12 text-end p-0">
                <span className="me-2">Add Content</span>
                <button
                  type="submit"
                  className="btn btn-outline "
                  onClick={() => editHandler("addSection", true)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </div>
          {componentEdit.editSection ||
            (componentEdit.addSection && (
              <div className={`adminEditTestmonial selected `}>
                <AdminSingleRecordUpload
                  editHandler={editHandler}
                  componentType={`${componentEdit.editSection ? "editSection" : "addSection"}`}
                  parentEditObject={editCarousel}
                  onPageLoadServiceCall={componentEdit.editSection}
                  popupTitle={"About"}
                  imageGetURL="aboutus/clientAboutus/"
                  imagePostURL="aboutus/createAboutus/"
                  imageUpdateURL="aboutus/updateAboutus/"
                  imageDeleteURL="aboutus/updateAboutus/"
                  imageLabel="Upload Image"
                  showExtraFormFields={getAboutUSSectionFields()}
                  dimensions={imageDimensionsJson("aboutus")}
                />
              </div>
            ))}

          <div className="aboutPage">
            {aboutList.length > 0 ? (
              aboutList.map((item, index) => (
                <div
                  key={item.id}
                  className={`row ${
                    isAdmin ? "border border-warning mb-4 position-relative" : "border"
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                >
                  {isAdmin && hasPermission && (
                    <>
                      <EditIcon editHandler={() => editHandler("editSection", true, item)} />
                      <Link className="deleteSection" onClick={() => deleteAboutSection(item)}>
                        <i className="fa fa-trash-o text-danger fs-4" aria-hidden="true"></i>
                      </Link>
                    </>
                  )}
                  <div className="col-12 col-lg-7 p-4 pb-0 p-sm-5 d-flex justify-content-center align-items-start flex-column leftColumn">
                    {item.aboutus_title ? (
                      <Title
                        title={item.aboutus_title}
                        cssClass=""
                        mainTitleClassess="mb-1 title"
                        subTitleClassess=""
                      />
                    ) : (
                      ""
                    )}

                    {item.aboutus_sub_title ? (
                      <Title
                        title={item.aboutus_sub_title}
                        cssClass=""
                        mainTitleClassess=" mb-3 subTitle"
                        subTitleClassess=""
                      />
                    ) : (
                      ""
                    )}

                    <RichTextView
                      data={item?.aboutus_description}
                      className={""}
                      showMorelink={false}
                    />
                  </div>

                  <div className="col-lg-5 p-4 p-md-0 d-flex justify-content-center align-items-start flex-column rightColumn">
                    <img
                      src={getImagePath(item.path)}
                      alt={item.alternitivetext}
                      className="object-fit-cover shadow m-auto"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted py-5">Please add page contents...</p>
            )}
          </div>
        </div>
      </AboutPageStyled>

      {show && <ModelBg />}
    </>
  );
};

export default About;
