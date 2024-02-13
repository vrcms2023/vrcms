import React from "react";
import Skeleton from "./Skeleton";

const SkeletonImage = () => {
  return (
    <div className="px-2 position-relative">
      <Skeleton classes="image width-100" />
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          right: "50px",
          zIndex: 999,
          width: "50%",
        }}
      >
        <Skeleton classes="title width-100 " />
        <Skeleton classes="title width-100 " />
        <Skeleton classes="text width-100" />
      </div>
    </div>
  );
};

export default SkeletonImage;
