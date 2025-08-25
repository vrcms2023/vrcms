import React from "react";
import { getImagePath } from "../../util/commonUtil";
import RichTextView from "../../Common/RichTextView";

export const CarouselItem = ({ item, index }) => {
  return (
    <div
      className={`carousel-item ${index === 0 ? "active" : ""}`}
      key={item.id}
    >
      <img
        src={getImagePath(item?.path)}
        alt={item.alternitivetext}
        className="d-block w-100"
      />

      <div className="carousel-caption d-flex flex-column gap-4">
        {item.carouse_sub_title ? (
          <span className="subtitle">{item.carouse_sub_title}</span>
        ) : (
          ""
        )}
        
        {item.carouse_title ? (
          <h1 className="fw-bold">{item.carouse_title}</h1>
        ) : (
          ""
        )}

        {/* {item.carouse_sub_title ? (
          <span className="subtitle">{item.carouse_sub_title}</span>
        ) : (
          ""
        )} */}

        <div className="d-none d-lg-block">
          {item?.carouse_description && (
            <RichTextView data={item?.carouse_description} showMorelink={false} />
          )}
        </div>
      </div>
    </div>
  );
};
