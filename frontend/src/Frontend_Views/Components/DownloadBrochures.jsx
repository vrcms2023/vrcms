import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { getBaseURL } from "../../util/ulrUtil";
import Button from "../../Common/Button";

const DownloadBrochures = () => {
  const [brochuresList, setBrochuresList] = useState([]);
  const baseURL = getBaseURL();

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

  const downloadPDF = (url) => {
    window.open(
      url,
      "_blank",
      "location=yes,height=800,width=600 ,scrollbars=yes,status=yes"
    );
  };

  return (
    <>
      {brochuresList.length === 1 && (
        <Button
          label="Dropdown Brochure"
          cssClass="btn btn-primary mb-1"
          handlerChange={() =>
            downloadPDF(`${baseURL}${brochuresList[0]?.path}`)
          }
        />
      )}
      {brochuresList.length > 1 && (
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {brochuresList?.map((brochures) => (
              <li>
                <a
                  href="#!"
                  onClick={() => downloadPDF(`${baseURL}${brochures.path}`)}
                  className="mx-1 text-dark"
                >
                  {brochures.originalname}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DownloadBrochures;
