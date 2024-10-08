import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { getBaseURL, removeActiveClass } from "../../../util/ulrUtil";

const News = ({ item, dateFormat, articleHandler }) => {
  const baseURL = getBaseURL();
  useEffect(() => {
    removeActiveClass();
  }, []);
  return (
    <div
      className="col-md-4 border border-5 border-white p-4 bg-light shadow-lg"
      key={item.id}
    >
      {item.imageUrls.length > 0 ? (
        <img
          src={`${baseURL}${item.imageUrls[0]}`}
          alt=""
          className="w-100"
          height="100"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <img
          className="w-100 noImg"
          height={"100"}
          src={`${baseURL}/media/images/dummy-image-square.png`}
          alt=""
        />
      )}
      <Title title={item.newstitle} cssClass="text-dark fs-6 mt-3 fw-bold" />
      <small>Posted at {dateFormat(item.created_at)}</small>
      <p className="card-text mb-4">{item.description}</p>
      <Link to="" onClick={() => articleHandler(item.id)} className="loadMore">
        View more news
        <svg
          width="15"
          height="8"
          viewBox="0 0 15 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ms-2"
        >
          <path d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z" />
        </svg>
      </Link>
    </div>
  );
};

export default News;
