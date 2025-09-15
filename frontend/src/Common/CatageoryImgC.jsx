import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosServiceApi } from "../util/axiosUtil";
import { getBaseURL } from "../util/ulrUtil";
import useAdminLoginStatus from "./customhook/useAdminLoginStatus";
import { getImageURL, getSelectedImage } from "../util/commonUtil";

const CatageoryImgC = ({ cssClass, project, category, saveState }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "clientInformation"]);
  const navigate = useNavigate();
  const baseURL = getBaseURL();
  const [catagoryImgs, setCatagoryImgs] = useState([]);
  const { isAdmin } = useAdminLoginStatus();

  useEffect(() => {
    if (project?.id) {
      const selectedImage = getSelectedImage(project?.ProjectGallery, category);
      setCatagoryImgs(selectedImage);
    }
  }, [project]);

  /**
   * get selected Images for edit
   */
  // useEffect(() => {
  //   const getSelectedImages = async () => {
  //     const response = await axiosServiceApi.get(`/project/projectImages/`, {
  //       params: {
  //         projectID: project.id,
  //         category: category,
  //       },
  //     });
  //     if (response?.status === 200 && response?.data?.fileData?.length > 0) {
  //       catategoryImgState(response.data.fileData);
  //     }
  //   };
  //   if (project?.id) {
  //     getSelectedImages();
  //   }
  // }, [project, category]);

  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(`/project/projectImages/${id}/`);
      if (response.status === 204) {
        const list = catagoryImgs.filter((item) => item.id !== id);
        setCatagoryImgs(list);
        saveState(true);
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            // message={`deleting the ${name} image?`}
            message={
              <>
                Confirm deletion of <span>{name}</span> image?
              </>
            }
          />
        );
      },
    });
  };

  const downloadPDF = (url) => {
    if (isAdmin) {
      return true;
    }

    const navigateTocontactus = () => {
      removeCookie("previousPath");
      setCookie("previousPath", window.location.pathname);
      navigate(`/contact`);
    };

    if (cookies.clientInformation !== undefined) {
      window.open(url, "_blank", "location=yes,height=800,width=600 ,scrollbars=yes,status=yes");
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <DeleteDialog
              title={"We need some your personal details to download PDF's"}
              onClose={onClose}
              callback={navigateTocontactus}
              label={"to Download PDF's"}
              buttonStyle={"btn-success"}
            />
          );
        },
      });
    }
  };

  return (
    <div className={`d-flex justify-content-center ${catagoryImgs.length > 0 ? "my-4" : ""}`}>
      {catagoryImgs.length > 0 && (
        <>
          {/* <Title title={title} cssClass="fs-5"/> */}
          <div className="d-flex justify-content-start align-items-center flex-wrap">
            {
              catagoryImgs.map((item) => {
                return item.content_type === "application/pdf" ? (
                  <div className="categoryContainer  position-relative" key={item.id}>
                    <li className="list-group-item d-flex justify-content-center align-items-center me-3 bg-light p-2 rounded-2 ">
                      <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                      <a
                        href="#!"
                        onClick={() => downloadPDF(`${baseURL}${item.path}`)}
                        className="mx-1 text-dark text-decoration-none"
                      >
                        {item.original_name}
                      </a>
                      <span onClick={() => thumbDelete(item.id, item.original_name)}>
                        <i
                          className="fa fa-times text-danger ms-1 fs-6 position-absolute"
                          style={{ zIndex: 9, top: 0 }}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </li>
                  </div>
                ) : (
                  <div className="categoryContainer position-relative" key={item.id}>
                    <i
                      className="fa fa-times-circle text-secondary ms-1 fs-4 position-absolute"
                      style={{ zIndex: 9, right: 0 }}
                      aria-hidden="true"
                      onClick={() => thumbDelete(item.id, item.original_name)}
                    ></i>
                    <img className={cssClass} src={getImageURL(item)} alt={item.alternative_text} />
                  </div>
                );
              })

              // : <p className='text-warning fs-4 text-center my-5'>Gallery is empty!, please add images.</p>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default CatageoryImgC;
