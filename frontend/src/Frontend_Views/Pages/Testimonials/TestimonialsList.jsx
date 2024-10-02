import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import EditIcon from "../../../Common/AdminEditIcon";
import Banner from "../../../Common/Banner";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import {
  getImagePath,
  paginationDataFormat,
  reorder,
  updateArrIndex,
} from "../../../util/commonUtil";
import Title from "../../../Common/Title";
import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import AddEditAdminNews from "../../../Frontend_Admin/Components/News";

import { getTestimonialsFields } from "../../../util/dynamicFormFields";
import Search from "../../../Common/Search";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import CustomPagination from "../../../Common/CustomPagination";
import SkeletonImage from "../../../Common/Skeltons/SkeletonImage";

import { TestimonialsListPageStyled } from "../../../Common/StyledComponents/Styled-TestimonialsList";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

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
  const [modelShow, setModelShow] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelItem, setModelItem] = useState({});

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

  const showModel = (item) => {
    setModelItem(item);
    setShow(!show);
    setModelShow(!modelShow);
  };

  const closeModel = () => {
    setModelShow(!modelShow);
    setShow(!show);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(clientsList, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "testimonial_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response?.length > 0) {
      setClientsList(response);
    }
  };
  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(
        `/testimonials/updateTestimonialsindex/`,
        data
      );
      if (response?.data?.testimonial) {
        return response.data.testimonial;
      }
    } catch (error) {
      console.log("unable to save news position");
    }
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
      {componentEdit.banner && (
        <div className={`adminEditTestmonial selected `}>
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            popupTitle={`Testimonial`}
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      )}

      {/* Brief Introduction */}
      {/* {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}


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
      )} */}

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
          <div className="col-md-6 d-flex align-items-center">
            <Title title="Testimonials" cssClass="fw-medium pageTitle" />
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
          <div className={`adminEditTestmonial selected `}>
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              popupTitle={`Testimonial`}
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              getImageListURL="testimonials/clientTestimonials/"
              deleteImageURL="testimonials/updateTestimonials/"
              imagePostURL="testimonials/createTestimonials/"
              imageUpdateURL="testimonials/updateTestimonials/"
              imageLabel="Image"
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

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={"NewsList"} id="newsList">
                {(provided, snapshot) => (
                  <div
                    className="row"
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {clientsList.length > 0 ? (
                      clientsList.map((item, index) => (
                        <Draggable
                          isDragDisabled={isAdmin ? false : true}
                          key={item.id}
                          index={index}
                          draggableId={item.id}
                          id={item.id}
                        >
                          {(provided) => (
                            <div
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
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
                                    <EditIcon
                                      icon={"fa-trash-o"}
                                      iconCss={"text-danger fs-4"}
                                      cssClasses={""}
                                      editHandler={() =>
                                        deleteAboutSection(item)
                                      }
                                    />
                                    {/* <Link
                                      className="deleteSection"
                                      onClick={() => deleteAboutSection(item)}
                                    >
                                      <i
                                        className="fa fa-trash-o text-danger fs-4"
                                        aria-hidden="true"
                                      ></i>
                                    </Link> */}
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
                                    <Link
                                      to=""
                                      className="text-decoration-underline"
                                      onClick={() => showModel(item)}
                                    >
                                      <img
                                        src={getImagePath(item.path)}
                                        alt=""
                                        className="img-fluid rounded-circle border border-3 border-light shadow-lg img-thumbnail "
                                      />
                                    </Link>
                                  </div>
                                </div>
                                <Link
                                  to=""
                                  className="btn btn-outline w-auto mx-4 text-decoration-underline d-flex d-lg-none"
                                  onClick={() => showModel(item)}
                                >
                                  More
                                </Link>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p className="text-center text-muted py-5">
                        {!isLoading && <span>Please add page contents...</span>}
                      </p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
      {modelShow && (
        <Model
          obj={modelItem}
          privacy={""}
          closeModel={closeModel}
          flag="footer"
        />
      )}

      {show && <ModelBg />}
    </>
  );
};

export default TestimonialsList;
