import React, { useEffect, useState } from "react";
import EditIcon from "../../../Common/AdminEditIcon";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import AdminBanner from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import {
  getImageGalleryFields,
  getVideoGalleryFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import ModelBg from "../../../Common/ModelBg";
import DynamicCarousel from "../../Components/DynamicCarousel";
import { getImagePath, getImageURL } from "../../../util/commonUtil";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import RichTextView from "../../../Common/RichTextView";
import Title from "../../../Common/Title";

import { VideoGalleryStyled } from "../../../Common/StyledComponents/Styled-VideoGallery";
import AdminListOfRecordsUpload from "../../../Frontend_Admin/Components/forms/V2/AdminListOfRecordsUpload";

const VideosGallery = () => {
  const editComponentObj = {
    gallery: false,
  };

  const pageType = "VideosGallery";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [imageGallery, setImageGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `appGallery/clientVidoeGallery/${pageType}/`
        );

        if (response?.status === 200) {
          let key = Object.keys(response.data);
          // setImageGallery(response.data[key]);
          setImageGallery(response.data.results);
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

  const findThumbHandler = (id) => {
    const findImg = imageGallery.find((allGallery) => allGallery.id === id);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5">
          {isAdmin && hasPermission && (
            <EditIcon editHandler={() => editHandler("gallery", true)} editlabel={"Video's"} />
          )}
          {componentEdit.gallery && (
            <div className={`adminEditTestmonial selected `}>
              <AdminListOfRecordsUpload
                editHandler={editHandler}
                componentType="gallery"
                popupTitle="Video Gallery"
                getImageListURL={`appGallery/createVidoeGallery/${pageType}/`}
                deleteImageURL="appGallery/updateVidoeGallery/"
                imagePostURL="appGallery/createVidoeGallery/"
                imageUpdateURL="appGallery/updateVidoeGallery/"
                imageIndexURL="appGallery/updateVideoIndex/"
                imageLabel="Upload Video - OR - YouTube URL "
                showExtraFormFields={getVideoGalleryFields("VideosGallery")}
                dimensions={imageDimensionsJson("VideosGallery")}
                validTypes={"video/quicktime,video/mp4,video/avi"}
                sideDeck="videopopup"
              />
            </div>
          )}
        </div>
      </div>

      <VideoGalleryStyled>
        <div className="row videoGallery">
          {imageGallery?.length > 0 &&
            imageGallery?.map((item, index) => (
              <div
                className="col-md-4 mb-4 d-flex flex-column justify-content-center align-items-center "
                key={item.id}
              >
                <div className="bg-light w-100 d-flex justify-content-center align-items-center py-2">
                  <img
                    src={getImageURL(item)}
                    className="d-block thumb"
                    onClick={() => findThumbHandler(item.id)}
                  />
                  {/* <video width="100%" height="200" controls className="d-block w-75" onClick={() => findThumbHandler(item.id)}>
                    <source src={getImagePath(item?.path)} type={`video/${item?.content_type?.replace(".", "").toUpperCase()}`} />
                    Your browser does not support the video tag.
                  </video> */}
                </div>
                <div className="p-3 w-100 border border-light ">
                  {item.image_title && <Title title={item.image_title} cssClass="fs-5" />}
                  {item.image_description && (
                    <RichTextView
                      data={item.image_description ? item.image_description : isAdmin ? "" : ""}
                    />

                    // <p className="fw-normal description fs-5">
                    //   {item.image_description}
                    // </p>
                  )}
                </div>
                {/* <img
                  src={getImagePath(item.path)}
                  alt={item.alternitivetext}
                  className="d-block w-75"
                  onClick={() => findThumbHandler(item.id)}
                /> */}

                {/* <div className="carousel-caption ">
                  {item.image_title && (
                    <h1 className="fw-bold">{item.image_title}</h1>
                  )}

                  {item.image_description && (
                    <p className="fw-normal description fs-5">
                      {item.image_description}
                    </p>
                  )}
                </div> */}
              </div>
            ))}
        </div>
      </VideoGalleryStyled>
      {/* {show && <ModelBg />} */}
      {showModal && <DynamicCarousel obj={img} all={imageGallery} closeCarousel={closeModel} />}
      {showModal && <ModelBg closeModel={closeModel} />}
      {show && <ModelBg />}
    </div>
  );
};
export default VideosGallery;
