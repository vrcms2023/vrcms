import React, { useEffect, useState } from "react";
import EditIcon from "../../../Common/AdminEditIcon";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import AdminBanner from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm-List";
import {
  getImageGalleryFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import ModelBg from "../../../Common/ModelBg";
import DynamicCarousel from "../../Components/DynamicCarousel";
import { getImagePath } from "../../../util/commonUtil";
import { axiosClientServiceApi } from "../../../util/axiosUtil";

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
          `imgGallery/clientImageVidoeGallery/${pageType}/`
        );

        if (response?.status === 200) {
          let key = Object.keys(response.data);
          setImageGallery(response.data[key]);
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 py-5">
          {isAdmin && hasPermission && (
            <EditIcon editHandler={() => editHandler("gallery", true)} />
          )}

          <div className={`adminEditTestmonial ${componentEdit.gallery  ? "selected" : "dismiss" } `}>
            <AdminBanner
              editHandler={editHandler}
              componentType="gallery"
              getImageListURL={`imgGallery/createImageVidoeGallery/${pageType}/`}
              deleteImageURL="imgGallery/updateImageVidoeGallery/"
              imagePostURL="imgGallery/createImageVidoeGallery/"
              imageUpdateURL="imgGallery/updateImageVidoeGallery/"
              imageIndexURL=""
              imageLabel="Add Image"
              showDescription={false}
              showExtraFormFields={getImageGalleryFields("VideosGallery")}
              dimensions={imageDimensionsJson("VideosGallery")}
              validTypes={"video/quicktime,video/mp4,video/avi"}
            />
          </div>
          {/* {componentEdit.gallery && (
            
              
          )} */}
        </div>
      </div>

      <div className="row gallery">
        {imageGallery?.length > 0 &&
          imageGallery?.map((item, index) => (
            <div className="col-4 mb-4" key={item.id}>
              <video
                width="320"
                height="240"
                controls
                className="d-block w-75"
                onClick={() => findThumbHandler(item.id)}
              >
                <source
                  src={getImagePath(item.path)}
                  type={`video/${item.contentType
                    .replace(".", "")
                    .toUpperCase()}`}
                />
                Your browser does not support the video tag.
              </video>
              {/* <img
                src={getImagePath(item.path)}
                alt={item.alternitivetext}
                className="d-block w-75"
                onClick={() => findThumbHandler(item.id)}
              /> */}

              <div className="carousel-caption ">
                {item.image_title && (
                  <h1 className="fw-bold">{item.image_title}</h1>
                )}

                {item.image_description && (
                  <p className="fw-normal description fs-5">
                    {item.image_description}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
      {show && <ModelBg />}
      {showModal && (
        <DynamicCarousel
          obj={img}
          all={imageGallery}
          closeCarousel={closeModel}
        />
      )}
      {showModal && <ModelBg closeModel={closeModel} />}
    </div>
  );
};
export default VideosGallery;
