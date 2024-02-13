import React from "react";
import { getImagesByDate } from "../../util/dataFormatUtil";
import "./Gallery.css";
import { getBaseURL } from "../../util/ulrUtil";

const GalleryImgThumb = ({
  imgs,
  imageDescription,
  findThumbHandler,
  projectID,
}) => {
  const imagesByDate = getImagesByDate(imgs);
  const baseURL = getBaseURL();

  return (
    <>
      {imagesByDate !== null
        ? Object.keys(imagesByDate).map((dt) => (
            <div key={dt} className="mb-5 galleryThumbs">
              <h4 className="green-700 fs-5 mt-2 mb-0">
                Work status as on date {dt}
              </h4>
              <>
                {imagesByDate[dt].map((img) => (
                  <img
                    src={`${baseURL}${img.path}`}
                    key={img.id}
                    alt=" "
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
