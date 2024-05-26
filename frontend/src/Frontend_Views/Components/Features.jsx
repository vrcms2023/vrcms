import React from "react";
import { Features } from "../../Common/StyledComponents/Features-Styled";

// Image Imports
import FeatureImg from "../../Images/features-img.jpg";
import FeatureImg1 from "../../Images/features-img1.jpg";

import shakeHands from "../../Images/shake-hands.svg";
import globe from "../../Images/globe.svg";
import spanners from "../../Images/spanners.svg";
import check from "../../Images/check.svg";
import Ancher from "../../Common/Ancher";

const FeaturesComponent = () => {
  return (
    <Features className="row">
      <div className="col-md-12 fatures">
        <div className="container mb-5">
          <h1 className="text-center fw-bold title">Our Features</h1>
          <p className="text-center mt-3 mb-5">
            When a consultant takes a new project, they typically start by doing
            an in-depth analysis of their client's business goals and
            objectives.
          </p>

          <div className="row">
            <div className="col-6 col-md-3 box1">
              <img src={shakeHands} alt="" className="img-fluid" />
              <p>We Help Set Priorities Correctly</p>
            </div>
            <div className="col-6 col-md-3 box2">
              <img src={globe} alt="" className="img-fluid" />
              <p>We Help Set Priorities Correctly</p>
            </div>
            <div className="col-md-6 p-0">
              <img src={FeatureImg1} alt="" className="decImg img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-0">
              <img src={FeatureImg} alt="" className="decImg img-fluid" />
            </div>
            <div className="col-6 col-md-3 box1">
              <img src={spanners} alt="" className="img-fluid" />
              <p>We Help Set Priorities Correctly</p>
            </div>
            <div className="col-6 col-md-3 box2">
              <img src={check} alt="" className="img-fluid" />
              <p>We Help Set Priorities Correctly</p>
            </div>
          </div>
        </div>
        <Ancher
          AncherLabel="Know More About"
          Ancherpath="/about"
          AncherClass="btn btn-outline d-flex justify-content-center align-items-center gap-3"
          AnchersvgColor="#ffffff"
        />
      </div>
    </Features>
  );
};

export default FeaturesComponent;
