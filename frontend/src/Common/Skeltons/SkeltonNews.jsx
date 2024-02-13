import React from "react";
import Skeleton from "./Skeleton";

const SkeletonNews = () => {
  return (
    <div className="">
      <Skeleton classes="image width-100" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
    </div>
  );
};

export default SkeletonNews;
