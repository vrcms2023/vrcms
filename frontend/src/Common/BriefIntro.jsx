import React, { useEffect, useState } from "react";
import Title from "./Title";
import { axiosClientServiceApi } from "../util/axiosUtil";

// Styles

import { BriefIntroStyled } from "./StyledComponents/Styled-BriefIntro";
import Ancher from "./Ancher";

const BriefIntroFrontend = ({
  pageType,
  introState,
  linkCss,
  linkLabel,
  moreLink,
  introTitleCss = "",
  introSubTitleCss = "",
  introDecTitleCss = "",
  detailsContainerCss,
  anchorContainer,
  anchersvgColor,
  showLink,
}) => {
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
    <div className="container">
      <BriefIntroStyled>
        <div className="row ">
          <div className={`${detailsContainerCss} briefIntro`}>
            {introValue?.intro_title !== "" && (
              <Title title={introValue?.intro_title} cssClass={introTitleCss} />
            )}
            {introValue?.subTitle !== "" && (
              <Title title={introValue?.subTitle} cssClass={introSubTitleCss} />
            )}
            <p className={introDecTitleCss}>
              {introValue?.intro_desc
                ? introValue?.intro_desc
                : "Please Update Brief Intro"}
            </p>

            {showLink && (
              <div className={anchorContainer}>
                <Ancher
                  AncherLabel={linkLabel}
                  Ancherpath={
                    introValue?.intro_morelink
                      ? introValue.intro_morelink
                      : moreLink
                  }
                  // Ancherpath={moreLink}
                  AncherClass={linkCss}
                  AnchersvgColor={anchersvgColor}
                />
              </div>
            )}
          </div>
        </div>
      </BriefIntroStyled>
    </div>
  );
};

export default BriefIntroFrontend;
