import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";
// Components
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import Title from "../../../Common/Title";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

import DeleteDialog from "../../../Common/DeleteDialog";
import AddService from "../../../Frontend_Admin/Components/Services";
import AddEditAdminNews from "../../../Frontend_Admin/Components/News";
import { getReactHostDetils, removeActiveClass } from "../../../util/ulrUtil";
import {
  getFormDynamicFields,
  getServiceFormFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import {
  getImagePath,
  sortByFieldName,
  storeServiceMenuValueinCookie,
  urlStringFormat,
} from "../../../util/commonUtil";
import { sortByCreatedDate } from "../../../util/dataFormatUtil";
import { getCookie } from "../../../util/cookieUtil";

// CSS Imports
import { ServicesStyled } from "../../../Common/StyledComponents/Styled-Services";

import RichTextView from "../../../Common/RichTextView";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import ShareButtons from "../../../Common/Share";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";

const Services = () => {
  const editComponentObj = {
    addSection: false,
    editSection: false,
    banner: false,
    briefIntro: false,
  };

  const pageType = "services";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [selectedServiceProject, setSelectedServiceProject] = useState({});
  const [selectedServiceList, setSelectedServiceList] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState();
  const [editCarousel, setEditCarousel] = useState({});
  let { uid } = useParams();
  const navigate = useNavigate();
  const pageLoadServiceID = getCookie("pageLoadServiceID");
  const pageLoadServiceName = getCookie("pageLoadServiceName");
  const pageLoadServiceURL = getCookie("pageLoadServiceURL");
  const location = useLocation();
  const isNewServiceCreated = useRef(false);
  const { serviceMenu, serviceerror } = useSelector((state) => state.serviceMenu);

  useEffect(() => {
    const pageURL = location.pathname;
    if (pageURL && serviceMenu.length > 0 && !isNewServiceCreated.current) {
      const sortedMapped = sortByFieldName(serviceMenu, "service_postion");
      const selectedMneu = _.filter(sortedMapped, (item) => {
        return item?.page_url?.toLowerCase() === pageURL;
      })[0];
      if (selectedMneu) {
        storeServiceMenuValueinCookie(selectedMneu);
        setSelectedServiceProject(selectedMneu);
      } else {
        navigate(sortedMapped[0]?.page_url);
        storeServiceMenuValueinCookie(sortedMapped[0]);
        setSelectedServiceProject(sortedMapped[0]);
      }
      setSelectedServiceList([]);
    }
  }, [location, serviceMenu]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const id = document.getElementById("ServicesnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  // useEffect(() => {
  //   if (pageLoadServiceID && pageLoadServiceName && pageLoadServiceURL)
  //     getSelectedServiceObject(pageLoadServiceID);
  //   setSelectedServiceName(pageLoadServiceName);
  //   setSelectedServiceProject({
  //     id: pageLoadServiceID,
  //     services_page_title: pageLoadServiceName,
  //     page_url: pageLoadServiceURL,
  //   });
  // }, [uid, pageLoadServiceID]);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    if (selectedServiceProject?.id) {
      setEditCarousel({
        serviceID: selectedServiceProject ? selectedServiceProject?.id : "",
        services_page_title: selectedServiceProject
          ? selectedServiceProject?.services_page_title
          : "",
      });
      setSelectedServiceName(urlStringFormat(selectedServiceProject?.services_page_title));
      getSelectedServiceObject(selectedServiceProject.id);
    }
  }, [selectedServiceProject]);

  const getSelectedServiceObject = async (id) => {
    if (!id && !getCookie("access")) {
      navigate("/");
      return;
    }
    try {
      let response = await axiosClientServiceApi.get(`/services/getSelectedClientService/${id}/`);
      const createdDate = sortByCreatedDate(response.data.servicesFeatures);
      setSelectedServiceList(createdDate);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  const deleteSelectedSectionInPage = (item) => {
    const id = item.id;
    const name = item.feature_title;

    const deleteSelectedSection = async () => {
      const response = await axiosServiceApi.delete(`/services/updateFeatureService/${id}/`);
      if (response.status === 204) {
        const list = selectedServiceList.filter((list) => list.id !== id);
        setSelectedServiceList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSelectedSection}
            // message={`deleting the ${name} Service?`}
            message={
              <>
                Confirm deletion of <span>{name}</span> Service?
              </>
            }
          />
        );
      },
    });
  };

  useEffect(() => {
    if (
      !componentEdit.editSection &&
      !componentEdit.addSection &&
      selectedServiceProject?.id !== undefined
    ) {
      getSelectedServiceObject(selectedServiceProject.id);
    }
  }, [componentEdit.editSection, componentEdit.addSection]);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      let data = item;
      data.services_page_title = selectedServiceProject?.services_page_title;
      setEditCarousel(data);
      isNewServiceCreated.current = false;
    }
    document.body.style.overflow = "hidden";
  };
  // console.log(selectedServiceProject)

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
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

  return (
    <>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={`${pageType}-${pageLoadServiceName ? "-" + pageLoadServiceName : "mainservice"}`}
        category={"service-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={`Service ${pageLoadServiceName ? "-" + pageLoadServiceName : ""} Banner`}
        showHideComponentName={"servicebanner"}
      />

      {/* End Of Page Banner Component */}

      <ServicesStyled>
        {/* Introduction 
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <BriefIntroFrontend
          introState={componentEdit.briefIntro}
          pageType={pageType}
          introTitleCss="fs-3 fw-medium text-md-center"
          introSubTitleCss="fw-medium text-muted text-md-center"
          introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
        />
        {componentEdit.briefIntro && (
          <div className={`adminEditTestmonial selected `}>
            <AdminBriefIntro
              editHandler={editHandler}
              popupTitle="Service Details"
              componentType="briefIntro"
              pageType={pageType}
            />
          </div>
        )} */}
        {/* End Of Introduction */}

        {/* Add Service Page */}
        {isAdmin && hasPermission && (
          <AddService
            setSelectedServiceProject={setSelectedServiceProject}
            selectedServiceProject={selectedServiceProject}
            pageType="service"
            isNewServiceCreated={isNewServiceCreated}
          />
        )}
        {/* End of Add Service Page */}

        <div className={"container my-md-3 servicesPage"} id="servicesPage">
          <div className="row">
            <div className={isAdmin && hasPermission ? "col-md-12" : "col-md-12"}>
              {isAdmin &&
                hasPermission &&
                selectedServiceProject?.id &&
                selectedServiceProject.page_url !== "/services/addservices" && (
                  <div className="d-flex justify-content-center align-items-center my-4 p-2 border border-info">
                    <span className="mx-2 text-dark">
                      {" "}
                      Add new section in
                      <span className="text-dark fw-bold mx-1">
                        {selectedServiceProject.services_page_title}
                      </span>
                      page
                    </span>
                    <button
                      type="submit"
                      className="btn btn-outline px-3"
                      onClick={() => editHandler("addSection", true)}
                      // style={{ position: "absolute", right: "60px" }}
                    >
                      {/* Add data */}
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                )}
              {componentEdit.editSection || componentEdit.addSection ? (
                <div className={`adminEditTestmonial selected`}>
                  <AddEditAdminNews
                    editHandler={editHandler}
                    category="services"
                    editCarousel={editCarousel}
                    setEditCarousel={setEditCarousel}
                    componentType={`${componentEdit.editSection ? "editSection" : "addSection"}`}
                    imageGetURL="services/createServiceFeatures/"
                    imagePostURL="services/createServiceFeatures/"
                    imageUpdateURL="services/updateFeatureService/"
                    imageDeleteURL="services/updateFeatureService/"
                    imageLabel="Upload Image"
                    popupTitle={`Add Content ${pageLoadServiceName ? " - " + pageLoadServiceName : ""} `}
                    showDescription={false}
                    showExtraFormFields={getServiceFormFields(
                      selectedServiceProject ? selectedServiceProject?.id : "",
                      selectedServiceProject ? selectedServiceProject?.services_page_title : "",
                      selectedServiceProject ? selectedServiceProject?.page_url : ""
                    )}
                    dimensions={imageDimensionsJson("addService")}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="d-flex justify-content-end align-items-end position-relative">
                <ShareButtons />
              </div>
              <div className="row">
                <div className="col-12 col-md-8">
                  {/* <Title title={"Services"} cssClass="fs-3 mb-2 pageTitle" /> */}
                  {/* <Title
                title={TitleStringFormat(
                  selectedServiceProject.services_page_title,
                )}
                cssClass="fs-1 mb-2 pageTitle"
              /> */}
                </div>
              </div>
              {selectedServiceProject.page_url !== "/services/addservices" &&
                selectedServiceList.map((item, index) => (
                  <div
                    className={`row ${isAdmin ? "border border-warning mb-3 position-relative" : ""} ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                    key={item.id}
                  >
                    {isAdmin && hasPermission && (
                      <>
                        <EditIcon editHandler={() => editHandler("editSection", true, item)} />
                        <Link
                          className="deleteSection"
                          onClick={() => deleteSelectedSectionInPage(item)}
                        >
                          <i className="fa fa-trash-o text-danger fs-4" aria-hidden="true"></i>
                        </Link>
                      </>
                    )}
                    <div className="col-lg-8 p-4 px-lg-5 d-flex flex-column jusity-content-center">
                      {item.feature_title && (
                        <Title
                          title={item.feature_title ? item.feature_title : "Update Feature title"}
                          cssClass="fs-3 mb-2 title"
                        />
                      )}

                      {item.feature_sub_title && (
                        <Title
                          title={
                            item.feature_sub_title
                              ? item.feature_sub_title
                              : "Update Feature sub title"
                          }
                          cssClass="fs-5 text-secondary mb-2"
                        />
                      )}

                      {item.feature_description && (
                        <RichTextView
                          data={item.feature_description}
                          className={""}
                          showMorelink={false}
                        />
                      )}
                      {/*                  
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.feature_description,
                      }}
                    /> */}
                    </div>
                    <div className="col-lg-4 px-0 d-flex align-items-center justify-content-center">
                      <img src={getImagePath(item.path)} alt="" />
                    </div>
                  </div>
                ))}
            </div>

            {/* {isAdmin && hasPermission && (
              <div className="col-md-4">
                <AddService
                  setSelectedServiceProject={setSelectedServiceProject}
                  selectedServiceProject={selectedServiceProject}
                  pageType="service"
                />
              </div>
            )} */}
          </div>
        </div>
      </ServicesStyled>

      {show && <ModelBg />}
    </>
  );
};

export default Services;
