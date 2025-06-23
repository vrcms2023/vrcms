import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { getBaseURL } from "../../util/ulrUtil";
import Button from "../../Common/Button";
import RaqFormModel from "../../Common/RaqFormModel";
import ModelBg from "../../Common/ModelBg";

import './DownloadBrochures.css'

const DownloadBrochures = () => {
  const [brochuresList, setBrochuresList] = useState([]);
  const [show, setShow] = useState(false);
  const [pathName, setPathName] = useState("");
  const [fileName, setFileName] = useState("");
  const baseURL = getBaseURL();
  const [scrolled, setScrolled] = useState(false);

  const getBrochuresList = async () => {
    try {
      const response = await axiosClientServiceApi.get(
        `/contactus/clientBrochures/`
      );
      if (response?.status === 200) {
        const sortbyCreateData = sortCreatedDateByDesc(
          response?.data?.brochures
        );
        setBrochuresList(sortbyCreateData);
      }
    } catch (error) {
      toast.error("Unable to load Brochures  details");
    }
  };

  useEffect(() => {
    getBrochuresList();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200); // Trigger scroll at 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const downloadPDF = (url) => {
  //   window.open(
  //     url,
  //     "_blank",
  //     "location=yes,height=800,width=600 ,scrollbars=yes,status=yes"
  //   );
  // };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = baseURL + pathName;
    link.target = "_blank";
    link.click();
  };

  const checkClientInfoAndDownload = (path, name) => {
    setPathName(path);
    setFileName(name);
    showModel();
  };

  const showModel = () => {
    setShow(!show);
  };
  const closeModel = () => {
    setShow(!show);
  };

  return (
    <div className={`floatingButton ${scrolled ? "scrolled" : ""}`}>
      {brochuresList.length === 1 && (
        <Button
          label="BROCHURE"
          cssClass="btn btn-primary mb-1 p-4 text-uppercase"
          icon="fa-download"
          handlerChange={() =>
            checkClientInfoAndDownload(
              brochuresList[0]?.path,
              brochuresList[0]?.brochures_downloadName
                ? brochuresList[0]?.brochures_downloadName
                : brochuresList[0]?.originalname
            )
          }
        />
      )}
      {brochuresList.length > 1 && (
        <div class="dropdown">
          <button
            class="btn btn-primary mb-1 p-4  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            BROCHURES
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {brochuresList?.map((brochures) => (
              <li>
                <i class="fa fa-file-pdf-o cursor-pointer fs-4 me-2" aria-hidden="true"></i>
                <a
                  href="#!"
                  onClick={() =>
                    checkClientInfoAndDownload(
                      brochures.path,
                      brochures.brochures_downloadName
                        ? brochures.brochures_downloadName
                        : brochures.originalname
                    )
                  }
                  className="mx-1 text-dark"
                >
                  {brochures.originalname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {show && (
        <RaqFormModel closeModel={closeModel} downloadPDF={downloadPDF} />
      )}
      {show && <ModelBg />}
    </div>
  );
};

export default DownloadBrochures;
