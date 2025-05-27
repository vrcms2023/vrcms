import React, { useEffect, useState } from "react";
import EditIcon from "../../../Common/AdminEditIcon";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import AdminBanner from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import {
  getImageGalleryFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";

import { paginationDataFormat } from "../../../util/commonUtil";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { ImageGalleryStyled } from "../../../Common/StyledComponents/Styled-ImageGallery";
import ImageGalleryComponent from "../../Components/ImageGalleryComponent";
import CustomPagination from "../../../Common/CustomPagination";
import SEO from "../../../Common/SEO";

const ImagesGallery = () => {
  const editComponentObj = {
    gallery: false,
  };

  const pageType = "imageGallery";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  //const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [imageGallery, setImageGallery] = useState([]);
  //const [showModal, setShowModal] = useState(false);
  //const [img, setImg] = useState(null);
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  //const [pageLoadResult, setPageloadResults] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    //setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `imgGallery/clientImageVidoeGallery/${pageType}/`
        );

        if (response?.status === 200) {
          setResponseData(response?.data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.gallery) {
      getGalleryImages();
    }
  }, [componentEdit.gallery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const findThumbHandler = (id) => {
  //   const findImg = imageGallery.find((allGallery) => allGallery.id === id);
  //   setShowModal(!showModal);
  //   setImg(findImg);
  // };

  // const closeModel = () => {
  //   setShowModal(!showModal);
  // };
  const setResponseData = (data) => {
    setImageGallery(data.results);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  return (
    <>
      <SEO
        title={"EZI Press Image gallery Details Page "}
        description={"EZI Press - Custom CMS"}
      />
      <ImageGalleryStyled>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              {isAdmin && hasPermission && (
                <EditIcon editHandler={() => editHandler("gallery", true)} />
              )}
              {componentEdit.gallery && (
                <div className={`adminEditTestmonial selected `}>
                  <AdminBanner
                    editHandler={editHandler}
                    componentType="gallery"
                    popupTitle="Image Gallery"
                    getImageListURL={`imgGallery/createImageVidoeGallery/${pageType}/`}
                    deleteImageURL="imgGallery/updateImageVidoeGallery/"
                    imagePostURL="imgGallery/createImageVidoeGallery/"
                    imageUpdateURL="imgGallery/updateImageVidoeGallery/"
                    imageIndexURL=""
                    imageLabel="Add Image"
                    showDescription={false}
                    showExtraFormFields={getImageGalleryFields("imageGallery")}
                    dimensions={imageDimensionsJson("imageGallery")}
                  />
                </div>
              )}
            </div>
          </div>

          <ImageGalleryComponent
            pageType={pageType}
            componentEdit={componentEdit}
            imageGallery={imageGallery}
          />
        </div>
      </ImageGalleryStyled>
      <div className="row my-5">
        {paginationData?.total_count && (
          <CustomPagination
            paginationData={paginationData}
            paginationURL={
              isAdmin
                ? `imgGallery/createImageVidoeGallery/${pageType}/`
                : `imgGallery/clientImageVidoeGallery/${pageType}/`
            }
            paginationSearchURL={
              isAdmin
                ? `imgGallery/createImageVidoeGallery/${pageType}/`
                : `imgGallery/clientImageVidoeGallery/${pageType}/`
            }
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setResponseData={setResponseData}
            pageLoadResult=""
          />
        )}
      </div>
    </>
  );
};
export default ImagesGallery;
