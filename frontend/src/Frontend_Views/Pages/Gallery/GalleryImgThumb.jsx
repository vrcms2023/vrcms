import React from "react";
import { getImagesByDate } from "../../../util/dataFormatUtil";
import { getBaseURL } from "../../../util/ulrUtil";
import "./Gallery.css";
import { getImageURL } from "../../../util/commonUtil";
const GalleryImgThumb = ({ imgs, findThumbHandler, projectID }) => {
  const imagesByDate = getImagesByDate(imgs);
  const baseURL = getBaseURL();

  return (
    <>
      {imagesByDate !== null
        ? Object.keys(imagesByDate).map((dt) => (
            <div key={dt} className="mb-4 galleryThumbs">
              <h5 className="border-bottom">
                Work status as on date - <small className="workStatusDate">{dt}</small>
              </h5>
              <>
                {imagesByDate[dt].map((img, i) => (
                  <img
                    key={i}
                    src={getImageURL(img)}
                    alt={img.alternative_text}
                    className="rounded img-fluid"
                    onClick={() => findThumbHandler(projectID, img.id)}
                  />
                ))}
              </>
            </div>
          ))
        : null}
    </>
  );
};

export default GalleryImgThumb;
