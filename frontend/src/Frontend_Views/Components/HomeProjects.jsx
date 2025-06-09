import React, { useEffect, useState } from "react";

// Styles
import "./HomeProjects.css";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";

// Images
import imgOngoing from "../../Images/carousel1.jpg";
import imgCompleted from "../../Images/carousel2.jpg";
import imgFuture from "../../Images/carousel3.jpg";

import styled from "styled-components";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../util/commonUtil";

const HomeProjects = () => {
  const [ProjectCategoryType, setProjectCategoryType] = useState([]);
  const getPorjectCategory = async () => {
    const response = await axiosClientServiceApi.get(
      `/project/clientCategory/`
    );

    if (response?.status === 200) {
      setProjectCategoryType(response.data);
    }
  };
  useEffect(() => {
    getPorjectCategory();
  }, []);
  return (
    <div>
      <Title title="PROJECTS" cssClass="text-center fs-1" />
      <div className="row my-3 homeProjectsBg">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              {ProjectCategoryType?.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card border-0">
                    <div className="card-body">
                      <Title title={item.category_Label} cssClass="" />
                      <hr className="mb-0 title-border ongoing" />
                    </div>
                    <div className="card-body pt-0">
                      <img
                        src={
                          item?.path ? getImagePath(item.path) : getDummyImage()
                        }
                        alt={item?.alternitivetext}
                        className="w-100"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />

                      <p className="card-text my-4">
                        {item.category_description}
                      </p>
                      <Link to={`${item.readMore_link}`}>
                        Continue{" "}
                        {/* <svg
                            width="15"
                            height="8"
                            viewBox="0 0 15 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5H14V3.5H0V4.5Z"
                            fill="#165D3D"
                            />
                        </svg> */}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
