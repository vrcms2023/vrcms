import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import FileUpload from "../../Components/FileUpload";
import DeleteDialog from "../../../Common/DeleteDialog";

import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { getBaseURL } from "../../../util/ulrUtil";
import { getCookie } from "../../../util/cookieUtil";
import {
  getObjectTitle,
  getObjectDescription,
  getImagePath,
  getDummyImage,
} from "../../../util/commonUtil";
import { axiosFileUploadServiceApi } from "../../../util/axiosUtil";

const AdminBanner = ({
  editHandler,
  componentType,
  getImageListURL,
  deleteImageURL,
  imagePostURL,
  imageUpdateURL,
  imageLabel = "Add Images",
  extraFormParamas,
  titleTitle = "Title",
  descriptionTitle = "Description",
  showDescription = { showDescription },
  showExtraFormFields = { showExtraFormFields },
  dimensions,
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [carousel, setcarouseData] = useState([]);
  const [project, setProject] = useState({ id: projectID });
  const baseURL = getBaseURL();
  const [editCarousel, setEditCarousel] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(getImageListURL);
        if (response?.status === 200) {
          let key = Object.keys(response.data);
          if (key.length > 1) {
            setcarouseData(response.data.results);
          } else {
            setcarouseData(response.data[key]);
          }
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getCarouselData();
  }, [imgGallery]);

  const handleCarouselEdit = (event, carousel) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setEditCarousel(carousel);
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `${deleteImageURL}${id}/`,
      );
      if (response.status == 204) {
        const list = imgGallery.filter((item) => item.id !== id);
        setImgGallery(list);
        setEditCarousel({});
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} image?`}
          />
        );
      },
    });
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row d-flex flex-row-reverse">
          {carousel.length > 0 ? (
            <div className="col-md-6 my-3">
              <div className="container">
                {carousel?.map((item, index) => (
                  <div className="row mb-4 slideItem" key={index}>
                    <div className="col-2 col-md-2">
                      <i
                        className="fa fa-picture-o fs-2 d-lg-none"
                        aria-hidden="true"
                      ></i>
                      <img
                        src={
                          item.path ? getImagePath(item.path) : getDummyImage()
                        }
                        alt={item.alternitivetext}
                        className="w-100 d-none d-lg-block"
                      />
                    </div>
                    <div className="col col-md-8 ">
                      <h6 className="fw-bold m-0 fs-6">
                        {getObjectTitle(componentType, item)}
                      </h6>
                      <small className="description text-muted d-none d-md-block">
                        {getObjectDescription(componentType, item)}
                        {item.carouseDescription ? item.carouseDescription : ""}
                      </small>
                    </div>
                    <div className="col-4 col-md-2 d-flex justify-content-around align-items-center flex-md-row gap-3">
                      <Link
                        onClick={(event) => handleCarouselEdit(event, item)}
                      >
                        <i
                          className="fa fa-pencil fs-4 text-warning"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <Link
                        onClick={(event) =>
                          thumbDelete(
                            item.id,
                            getObjectTitle(componentType, item),
                          )
                        }
                      >
                        <i
                          className="fa fa-trash fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          <hr className="d-md-none" />
          <div
            className={`mb-5 mb-md-0 ${
              carousel.length > 0 ? "col-md-6" : "col-md-12"
            }`}
          >
            <FileUpload
              title={imageLabel}
              project={project}
              updated_by={userName}
              category={componentType}
              gallerysetState={setImgGallery}
              maxFiles={1}
              galleryState={imgGallery}
              validTypes="image/png,image/jpeg"
              descriptionTitle={descriptionTitle}
              titleTitle={titleTitle}
              alternitivetextTitle="Image Alt Text"
              saveState={setSaveState}
              showDescription={showDescription}
              buttonLable="Save"
              editImage={editCarousel}
              setEditCarousel={setEditCarousel}
              imagePostURL={imagePostURL}
              imageUpdateURL={imageUpdateURL}
              extraFormParamas={extraFormParamas}
              showExtraFormFields={showExtraFormFields}
              dimensions={dimensions}
              closeHandler={closeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBanner;
