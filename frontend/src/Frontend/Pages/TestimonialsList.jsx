import React, { useState, useEffect } from "react";
import EditIcon from "../../Common/AdminEditIcon";
import Banner from "../../Common/Banner";
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getImagePath, paginationDataFormat } from "../../util/commonUtil";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import AddEditAdminNews from "../../Admin/Components/News";
import { toast } from "react-toastify";

import { getTestimonialsFields } from "../../util/dynamicFormFields";
import Search from "../../Common/Search";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import CustomPagination from "../../Common/CustomPagination";
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import { useSelector } from "react-redux";
import { TestimonialsListPageStyled } from "../../Common/StyledComponents/Styled-TestimonialsList";

const TestimonialsList = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
    testmonial: false,
  };

  const pageType = "testimonial";
  const { isLoading } = useSelector((state) => state.loader);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [clientsList, setClientsList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const setResponseData = (data) => {
    setClientsList(
      data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  useEffect(() => {
    const getCAseStutiesvalues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`
        );
        if (response?.status === 200) {
          setResponseData(response.data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.addSection || !componentEdit.editSection) {
      getCAseStutiesvalues();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  useEffect(() => {
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

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

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.testimonial_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/testimonials/updateTestimonials/${id}/`
      );
      if (response.status === 204) {
        const list = clientsList.filter((list) => list.id !== id);
        setClientsList(list);
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

      {/* Brief Introduction */}
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

      {/* Add Clients */}
      <div className="container-fluid container-lg my-md-5 ">
        <div className="row">
          {isAdmin && hasPermission && (
            <div className="col-md-12">
              <div className="d-flex justify-content-end align-items-center mb-3">
                {/* <span className="fw-bold me-2">Add Testimonials </span> */}
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("addSection", true, {})}
                >
                  Add New Testimonials{" "}
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Testimonials" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/testimonials/searchtestimonials/"}
              adminSearchURL={"/testimonials/createTestimonials/"}
              clientDefaultURL={"/testimonials/clientTestimonials/"}
              searchfiledDeatails={"client Title / client description "}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              getImageListURL="testimonials/clientTestimonials/"
              deleteImageURL="testimonials/updateTestimonials/"
              imagePostURL="testimonials/createTestimonials/"
              imageUpdateURL="testimonials/updateTestimonials/"
              imageLabel="Add Client Logo"
              showDescription={false}
              showExtraFormFields={getTestimonialsFields("testmonial")}
              dimensions={imageDimensionsJson("testimonial")}
            />
          </div>
        ) : (
          ""
        )}

        <TestimonialsListPageStyled>
          <div className="testimonialsPage my-5">
            {isLoading ? (
              <div className="row">
                {[1, 2, 3, 4].map((item, index) => (
                  <div className="col-12" key={index}>
                    <SkeletonImage />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            {clientsList.length > 0 ? (
              clientsList.map((item, index) => (
                <div key={item.id}>
                  <div
                    key={item.id}
                    className={`row mb-2 ${
                      isAdmin
                        ? "border border-warning mb-3 position-relative"
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
                    <div className="col-12 col-lg-10 p-3 p-md-4 py-md-4 d-flex justify-content-center align-items-start flex-column">
                      {item.testimonial_title ? (
                        <Title
                          title={item.testimonial_title}
                          cssClass="fs-1 fw-bold mb-1"
                        />
                      ) : (
                        ""
                      )}

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.testimonial_description,
                        }}
                      />
                    </div>

                    <div className="col-lg-2 d-none d-lg-block h-100">
                      <div className="h-100 p-3 p-md-5 py-md-4 testimonialAvatar ">
                        <img
                          src={getImagePath(item.path)}
                          alt=""
                          className="img-fluid rounded-circle border border-3 border-light shadow-lg img-thumbnail "
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border-secondary" />
                </div>
              ))
            ) : (
              <p className="text-center text-muted py-5">
                {!isLoading && <p>Please add page contents...</p>}
              </p>
            )}
          </div>
        </TestimonialsListPageStyled>
        {paginationData?.total_count ? (
          <CustomPagination
            paginationData={paginationData}
            paginationURL={
              isAdmin
                ? "/client/createClientLogo/"
                : "/client/getAllClientLogos/"
            }
            paginationSearchURL={
              searchQuery
                ? `/client/searchClientLogos/${searchQuery}/`
                : isAdmin
                ? "/client/createClientLogo/"
                : "/client/getAllClientLogos/"
            }
            searchQuery={searchQuery}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setResponseData={setResponseData}
            pageLoadResult={pageLoadResult}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TestimonialsList;
