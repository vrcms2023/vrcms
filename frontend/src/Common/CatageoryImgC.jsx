import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { axiosServiceApi } from "../util/axiosUtil";
import { getBaseURL } from "../util/ulrUtil";
import useAdminLoginStatus from "./customhook/useAdminLoginStatus";

const CatageoryImgC = ({
  title,
  catategoryImgs,
  catategoryImgState,
  cssClass,
  project,
  category,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "clientInformation",
  ]);
  const navigate = useNavigate();
  const baseURL = getBaseURL();
  const { isAdmin } = useAdminLoginStatus();
  /**
   * get selected Images for edit
   */
  useEffect(() => {
    const getSelectedImages = async () => {
      const response = await axiosServiceApi.get(
        `/gallery/getSelectedImagesById/`,
        {
          params: {
            projectID: project.id,
            category: category,
          },
        }
      );
      if (response?.status === 200 && response?.data?.fileData?.length > 0) {
        catategoryImgState(response.data.fileData);
      }
    };
    if (project?.id) {
      getSelectedImages();
    }
  }, [project, category]);

  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `/gallery/deleteGalleryImage/${id}/`
      );
      if (response.status === 204) {
        const list = catategoryImgs.filter((item) => item.id !== id);
        catategoryImgState(list);
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
      window.open(
        url,
        "_blank",
        "location=yes,height=800,width=600 ,scrollbars=yes,status=yes"
      );
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
    <div className="">
      {catategoryImgs.length > 0 ? (
        <>
          {/* <Title title={title} cssClass="fs-5"/> */}
          <div className="d-flex justify-content-start align-items-center flex-wrap">
            {
              catategoryImgs.map((item) => {
                return item.contentType === ".pdf" ? (
                  <div className="categoryContainer" key={item.id}>
                    <li className="list-group-item d-flex justify-content-center align-items-between me-3">
                      {/* <svg width="16" height="20" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3687 15.0059C11.0562 14.0684 11.0625 12.2578 11.2437 12.2578C11.7687 12.2578 11.7187 14.4199 11.3687 15.0059ZM11.2625 17.7715C10.7812 18.9551 10.1813 20.3086 9.4875 21.4453C10.6313 21.0352 11.925 20.4375 13.4187 20.1621C12.625 19.5996 11.8625 18.791 11.2625 17.7715ZM5.38125 25.084C5.38125 25.1309 6.20625 24.7676 7.5625 22.7285C7.14375 23.0977 5.74375 24.1641 5.38125 25.084ZM15.5 9.375H24V28.5938C24 29.373 23.3313 30 22.5 30H1.5C0.66875 30 0 29.373 0 28.5938V1.40625C0 0.626953 0.66875 0 1.5 0H14V7.96875C14 8.74219 14.675 9.375 15.5 9.375ZM15 19.4414C13.75 18.7266 12.9188 17.7422 12.3313 16.2891C12.6125 15.2051 13.0563 13.5586 12.7188 12.5273C12.425 10.8047 10.0687 10.9746 9.73125 12.1289C9.41875 13.2012 9.70625 14.7129 10.2375 16.6406C9.5125 18.2578 8.44375 20.4258 7.6875 21.668C7.68125 21.668 7.68125 21.6738 7.675 21.6738C5.98125 22.4883 3.075 24.2812 4.26875 25.6582C4.61875 26.0625 5.26875 26.2441 5.6125 26.2441C6.73125 26.2441 7.84375 25.1895 9.43125 22.623C11.0437 22.125 12.8125 21.5039 14.3687 21.2637C15.725 21.9551 17.3125 22.4062 18.3687 22.4062C20.1937 22.4062 20.3188 20.5312 19.6 19.8633C18.7313 19.0664 16.2062 19.2949 15 19.4414ZM23.5625 6.15234L17.4375 0.410156C17.1562 0.146484 16.775 0 16.375 0H16V7.5H24V7.14258C24 6.77344 23.8438 6.41602 23.5625 6.15234ZM18.9312 21.1113C19.1875 20.9531 18.775 20.4141 16.2563 20.584C18.575 21.5098 18.9312 21.1113 18.9312 21.1113Z" fill="#017DB9"/>
</svg> */}
                      <a
                        href="#!"
                        onClick={() => downloadPDF(`${baseURL}${item.path}`)}
                        className="mx-1 text-dark"
                      >
                        {item.originalname}
                      </a>
                      <span
                        onClick={() => thumbDelete(item.id, item.originalname)}
                      >
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </li>
                  </div>
                ) : (
                  <div
                    className="categoryContainer"
                    key={item.id}
                    onClick={() => thumbDelete(item.id, item.originalname)}
                  >
                    <img
                      className={cssClass}
                      src={`${baseURL}${item.path}`}
                      alt=" "
                    />
                  </div>
                );
              })

              // : <p className='text-warning fs-4 text-center my-5'>Gallery is empty!, please add images.</p>
            }
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CatageoryImgC;
