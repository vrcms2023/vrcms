import React, { useState } from "react";
import { getImagePath } from "../../util/commonUtil";

import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "./DynamicCarousel";

const ImageGalleryComponent = ({ pageType, componentEdit, imageGallery }) => {
  //const [show, setShow] = useState(false);
  //const [imageGallery, setImageGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);

  // useEffect(() => {
  //   const getGalleryImages = async () => {
  //     try {
  //       const response = await axiosClientServiceApi.get(
  //         `imgGallery/clientImageVidoeGallery/${pageType}/`
  //       );

  //       if (response?.status === 200) {
  //         let key = Object.keys(response.data);
  //         setImageGallery(response.data[key]);
  //       }
  //     } catch (error) {
  //       console.log("unable to access ulr because of server is down");
  //     }
  //   };
  //   if (!componentEdit.gallery) {
  //     getGalleryImages();
  //   }
  // }, [componentEdit.gallery]);

  const findThumbHandler = (id) => {
    const findImg = imageGallery.find((allGallery) => allGallery.id === id);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  console.log(img, "Image Gallery Image")

  return (
    <div>
      <div className="row gallery">
        <div className="col-md-10 offset-md-1">
          <div className="container">
            <div className="text-center my-5">
              <span className="fs-1">View Gallery</span>
            </div>
            <div className="row">
              {imageGallery?.length > 0 &&
                imageGallery?.map((item, index) => (
                  <div className="col-sm-6 col-md-4 mb-4" key={item.id}>
                    <img
                      src={getImagePath(item.path)}
                      alt={item.alternitivetext}
                      className="d-block w-100 img-fluid"
                      onClick={() => findThumbHandler(item.id)}
                    />

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
          </div>
        </div>
      </div>
      {/* {show && <ModelBg />} */}
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

export default ImageGalleryComponent;
