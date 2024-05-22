import React, { useEffect, useState } from "react";
import Title from "./Title";
import { axiosClientServiceApi } from "../util/axiosUtil";

// Styles

import { BriefIntroStyled } from "./StyledComponents/Styled-BriefIntro";
import Ancher from "./Ancher";

const BriefIntroFrontend = ({ pageType, introState }) => {
  const [introValue, setIntroValues] = useState([]);

  useEffect(() => {
    const getBriefIntro = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/carousel/clientHomeIntro/${pageType}/`
        );
        if (response?.status === 200) {
          setIntroValues(response.data.intro);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!introState) {
      getBriefIntro();
    }
  }, [introState, pageType]);

  return (
    <div className="container-fluid">
      <div className="row">
        <BriefIntroStyled>
          <div className="briefIntro">
            <div className="col-md-10 offset-md-1 py-3 py-md-5 ">
              {introValue?.intro_title === "" ? (
                ""
              ) : (
                <Title
                  title={introValue?.intro_title}
                  cssClass="mb-4 fw-bold fs-2 text-center"
                />
              )}
              {introValue?.subTitle === "" ? (
                ""
              ) : (
                <Title
                  title={introValue?.subTitle}
                  cssClass="mb-3 fw-bold text-secondary text-center"
                />
              )}
              <p className="text-center lh-md m-0 fw-medium">
                {introValue?.intro_desc
                  ? introValue?.intro_desc
                  : "Please Update Brief Intro"}
              </p>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <Ancher
                AncherLabel="Read More"
                Ancherpath="/about"
                AncherClass="btn btn-outline d-flex justify-content-center align-items-center gap-3"
                AnchersvgColor="#17427C"
              />
            </div>
          </div>
        </BriefIntroStyled>
      </div>
    </div>
  );
};

export default BriefIntroFrontend;
