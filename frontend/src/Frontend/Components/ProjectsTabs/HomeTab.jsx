import React, { useState } from "react";
import Title from "../../../Common/Title";
import HomeImg from "../../../Images/project1.png";
import { getCookie, setCookie, removeCookie } from "../../../util/cookieUtil";
import { useNavigate } from "react-router-dom";
import { getBaseURL } from "../../../util/ulrUtil";

import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import ContactModel from "../../../Common/contactModel";

const HomeTab = ({ project, thumbImgs, pdfs }) => {
  const [show, setShow] = useState(false);
  const [pathName, setPathName] = useState("");
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const { aboutstitle, aboutussubtitle, description, projectTitle } = project;

  const baseURL = getBaseURL();

  const checkClientInfoAndDownload = (path, name) => {
    setPathName(path);
    setFileName(name);
    if (getCookie("clientInformation") !== undefined) {
      downloadPDF();
    } else {
      showModel();
    }
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = baseURL + pathName;
    link.target = "_blank";
    link.click();
  };

  const showModel = () => {
    setShow(!show);
  };
  const closeModel = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="py-5">
        <Title title={aboutstitle} cssClass="" />
        <Title title={aboutussubtitle} cssClass="fs-6 text-dark" />
        <div className="py-3">{description}</div>
        <p className="text-end">
          {pdfs.length > 0
            ? pdfs.map((pdf, i) => (
                <span
                  key={i}
                  className="d-block my-3 cursorPointer"
                  onClick={() =>
                    checkClientInfoAndDownload(pdf.path, pdf.originalname)
                  }
                  //onClick={showModel}
                >
                  <span className="text-dark me-2" download>
                    {" "}
                    {pdf.originalname}
                  </span>
                  <svg
                    width="18"
                    height="23"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57917 10.0039C7.37083 9.37891 7.375 8.17187 7.49583 8.17187C7.84583 8.17187 7.8125 9.61328 7.57917 10.0039ZM7.50833 11.8477C7.1875 12.6367 6.7875 13.5391 6.325 14.2969C7.0875 14.0234 7.95 13.625 8.94583 13.4414C8.41667 13.0664 7.90833 12.5273 7.50833 11.8477ZM3.5875 16.7227C3.5875 16.7539 4.1375 16.5117 5.04167 15.1523C4.7625 15.3984 3.82917 16.1094 3.5875 16.7227ZM10.3333 6.25H16V19.0625C16 19.582 15.5542 20 15 20H1C0.445833 20 0 19.582 0 19.0625V0.9375C0 0.417969 0.445833 0 1 0H9.33333V5.3125C9.33333 5.82812 9.78333 6.25 10.3333 6.25ZM10 12.9609C9.16667 12.4844 8.6125 11.8281 8.22083 10.8594C8.40833 10.1367 8.70417 9.03906 8.47917 8.35156C8.28333 7.20313 6.7125 7.31641 6.4875 8.08594C6.27917 8.80078 6.47083 9.80859 6.825 11.0938C6.34167 12.1719 5.62917 13.6172 5.125 14.4453C5.12083 14.4453 5.12083 14.4492 5.11667 14.4492C3.9875 14.9922 2.05 16.1875 2.84583 17.1055C3.07917 17.375 3.5125 17.4961 3.74167 17.4961C4.4875 17.4961 5.22917 16.793 6.2875 15.082C7.3625 14.75 8.54167 14.3359 9.57917 14.1758C10.4833 14.6367 11.5417 14.9375 12.2458 14.9375C13.4625 14.9375 13.5458 13.6875 13.0667 13.2422C12.4875 12.7109 10.8042 12.8633 10 12.9609ZM15.7083 4.10156L11.625 0.273438C11.4375 0.0976562 11.1833 0 10.9167 0H10.6667V5H16V4.76172C16 4.51563 15.8958 4.27734 15.7083 4.10156ZM12.6208 14.0742C12.7917 13.9687 12.5167 13.6094 10.8375 13.7227C12.3833 14.3398 12.6208 14.0742 12.6208 14.0742Z"
                      fill="#017DB9"
                    />
                  </svg>
                </span>
              ))
            : null}
        </p>

        <div className="text-center my-5">
          <img
            src={
              thumbImgs.length > 0 ? `${baseURL}${thumbImgs[0]?.path}` : HomeImg
            }
            className="rounded img-fluid"
            alt="..."
          />
        </div>
      </div>

      {show && (
        <ContactModel closeModel={closeModel} downloadPDF={downloadPDF} />
      )}
      {show && <ModelBg />}
    </>
  );
};

export default HomeTab;
