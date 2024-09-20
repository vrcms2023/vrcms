import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

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
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { getImagePath, urlStringFormat } from "../../../util/commonUtil";
import { sortByCreatedDate } from "../../../util/dataFormatUtil";
import { getCookie } from "../../../util/cookieUtil";

// CSS Imports
import { ServicesStyled } from "../../../Common/StyledComponents/Styled-Services";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
    const id = document.getElementById("ServicesnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

  useEffect(() => {
    getSelectedServiceObject(pageLoadServiceID);
    setSelectedServiceName(pageLoadServiceName);
    setSelectedServiceProject({
      id: pageLoadServiceID,
      services_page_title: pageLoadServiceName,
    });
  }, [uid, pageLoadServiceID]);

  useEffect(() => {
    if (selectedServiceProject?.id) {
      setEditCarousel({
        serviceID: selectedServiceProject ? selectedServiceProject?.id : "",
        services_page_title: selectedServiceProject
          ? selectedServiceProject?.services_page_title
          : "",
      });
      setSelectedServiceName(
        urlStringFormat(selectedServiceProject?.services_page_title)
      );
      getSelectedServiceObject(selectedServiceProject.id);
    }
  }, [selectedServiceProject]);

  const getSelectedServiceObject = async (id) => {
    if (!id && !getCookie("access")) {
      navigate("/");
      return;
    }
    try {
      let response = await axiosClientServiceApi.get(
        `/services/getSelectedClientService/${id}/`
      );
      setSelectedServiceList(sortByCreatedDate(response.data.servicesFeatures));
      window.scrollTo(0, 0);
      if (window.history.replaceState && isAdmin) {
        const url = `${getReactHostDetils()}/services/${pageLoadServiceName}/`;
        window.history.pushState({}, null, url);
      }
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  const deleteSelectedSectionInPage = (item) => {
    const id = item.id;
    const name = item.feature_title;

    const deleteSelectedSection = async () => {
      const response = await axiosServiceApi.delete(
        `/services/updateFeatureService/${id}/`
      );
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
            message={`deleting the ${name} Service?`}
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
    }
    document.body.style.overflow = "hidden";
  };
  // console.log(selectedServiceProject)
  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-${pageLoadServiceName}-banner/`}
          bannerState={componentEdit.banner}
          pageLoadServiceName={pageLoadServiceName}
        />
      </div>

      <div className={`adminEditTestmonial ${componentEdit.banner  ? "selected" : "dismiss" } `}>
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-${pageLoadServiceName}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(
              `${pageType}-${selectedServiceName}-banner`
            )}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>

      {/* {componentEdit.banner ? (
        
      ) : (
        ""
      )} */}

      {/* End Of Page Banner Component */}

      <ServicesStyled>
        {/* Introduction */}
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        )}
        <BriefIntroFrontend
          introState={componentEdit.briefIntro}
          pageType={pageType}
          introTitleCss = "fs-3 fw-medium text-md-center"
          introSubTitleCss = "fw-medium text-muted text-md-center"
          introDecTitleCss = "fs-6 fw-normal w-75 m-auto text-md-center"
        />

        <div className={`adminEditTestmonial ${componentEdit.briefIntro  ? "selected" : "dismiss" } `}>
            <AdminBriefIntro
              editHandler={editHandler}
              componentType="briefIntro"
              pageType={pageType}
            />
          </div>

        {/* {componentEdit.briefIntro ? (
         
        ) : (
          ""
        )} */}

        {/* End Of Introduction */}

        {/* Add Service Page */}
        {/* {isAdmin && hasPermission && (
          <AddService
            setSelectedServiceProject={setSelectedServiceProject}
            selectedServiceProject={selectedServiceProject}
            pageType="service"
          />
        )} */}
        {/* End of Add Service Page */}

        <div
          className={
            isAdmin && hasPermission
              ? "container-fluid my-md-5 py-md-4 servicesPage"
              : "container my-md-5 py-md-4 servicesPage"
          }
          id="servicesPage"
        >
          <div className="row">
            <div
              className={isAdmin && hasPermission ? "col-md-12" : "col-md-12"}
            >
              {isAdmin && hasPermission && selectedServiceProject?.id && (
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <span className="mx-2 text-dark">
                    {" "}
                    Add new section in
                    <span className="badge bg-warning text-dark fs-6 mx-1">
                      {selectedServiceProject.services_page_title}
                    </span>
                    page
                  </span>
                  <button
                    type="submit"
                    className="btn btn-primary px-3"
                    onClick={() => editHandler("addSection", true)}
                    // style={{ position: "absolute", right: "60px" }}
                  >
                    {/* Add data */}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
              )}

                <div className={`adminEditTestmonial ${componentEdit.editSection || componentEdit.addSection  ? "selected" : "dismiss" } `}>
                  <AddEditAdminNews
                    editHandler={editHandler}
                    category="services"
                    editCarousel={editCarousel}
                    setEditCarousel={setEditCarousel}
                    componentType={`${
                      componentEdit.editSection ? "editSection" : "addSection"
                    }`}
                    imageGetURL="services/createServiceFeatures/"
                    imagePostURL="services/createServiceFeatures/"
                    imageUpdateURL="services/updateFeatureService/"
                    imageDeleteURL="services/updateFeatureService/"
                    imageLabel="Add Service Banner"
                    showDescription={false}
                    showExtraFormFields={getServiceFormFields(
                      selectedServiceProject ? selectedServiceProject?.id : "",
                      selectedServiceProject
                        ? selectedServiceProject?.services_page_title
                        : ""
                    )}
                    dimensions={imageDimensionsJson("addService")}
                  />
                </div>

              {/* {componentEdit.editSection || componentEdit.addSection ? (
                
              ) : (
                ""
              )} */}

              <div className="row ">
                <div className="col-12 col-md-8">
                  <Title title={"Services"} cssClass="fs-3 mb-2 pageTitle" />
                  {/* <Title
                title={TitleStringFormat(
                  selectedServiceProject.services_page_title,
                )}
                cssClass="fs-1 mb-2 pageTitle"
              /> */}
                </div>
              </div>
              {selectedServiceList.map((item, index) => (
                <div
                  className={`row mb-5 ${
                    isAdmin
                      ? "border border-warning mb-3 position-relative"
                      : ""
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                  key={item.id}
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
                        onClick={() => deleteSelectedSectionInPage(item)}
                      >
                        <i
                          className="fa fa-trash-o text-danger fs-4"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  )}
                  <div className="col-md-8 p-5">
                    <Title
                      title={
                        item.feature_title
                          ? item.feature_title
                          : "Update Feature title"
                      }
                      cssClass="fs-1 fw-bold mt-3 mb-1"
                    />
                    <Title
                      title={
                        item.feature_sub_title
                          ? item.feature_sub_title
                          : "Update Feature sub title"
                      }
                      cssClass="fs-5 text-secondary mb-2"
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.feature_description,
                      }}
                    />
                  </div>
                  <div className="col-md-4">
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
