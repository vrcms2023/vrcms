import React from "react";
import Skeleton from "./Skeleton";

const SkeletonPage = () => {
  return (
    <div className="p-4 px-5">
      <Skeleton classes="image width-100" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <div className="row">
        <div className="col-md-6">
          <Skeleton classes="image width-100" />
          <Skeleton classes="title2 width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="title2 width-100" />
          <Skeleton classes="text width-100" />
        </div>
        <div className="col-md-6">
          <Skeleton classes="title width-100" />
          <Skeleton classes="title2 width-100" />
          <Skeleton classes="image width-100" />
          <Skeleton classes="text width-100" />
          <Skeleton classes="text width-100" />
        </div>
      </div>
      <Skeleton classes="title width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
    </div>
  );
};

export default SkeletonPage;
