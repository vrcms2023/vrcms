import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { useParams } from "react-router-dom";
import { CaseStudiesPageStyled } from "../../../Common/StyledComponents/Styled-Casestudies";
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import EditIcon from "../../../Common/AdminEditIcon";
import AdminBriefIntro from "../../../Admin/Components/BriefIntro/index";
import Banner from "../../../Common/Banner";
import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { getImagePath } from "../../../util/commonUtil";

const CaseStudiesDetails = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  let { id } = useParams();
  const [selectedCaseStudieDetails, setselectedCaseStudieDetails] = useState();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  //const [editCarousel, setEditCarousel] = useState({});
  const pageType = "casestudiedetails";
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  useEffect(() => {
    const getCAseStutiesvalues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/caseStudies/clientSelectedCaseStudies/${id}`
        );
        if (response?.status === 200) {
          setselectedCaseStudieDetails(response.data.caseStudies);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    getCAseStutiesvalues();
  }, [id]);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    // if (item?.id) {
    //   setEditCarousel(item);
    // } else {
    //   setEditCarousel({});
    // }
    document.body.style.overflow = "hidden";
  };
  return (
    <CaseStudiesPageStyled>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>
      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      {/* Brief Introduction */}
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      {selectedCaseStudieDetails && (
        <div className="container">
          <div className="d-flex flex-column flex-column-reverse flex-sm-row justify-content justify-content-between align-items-center gap-3 mt-4">
            <h1 className="">{selectedCaseStudieDetails.case_studies_title}</h1>
            <Ancher
              AncherLabel="Back"
              AncherClass="btn btn-secondary d-flex gap-2 justify-content-center align-items-center float-end fw-bold"
              Ancherpath={`/casestudies/`}
              AnchersvgColor=""
            />
          </div>
          <div className="row">
            <div className="col-md-12 py-3 caseStudieDetails">
              <p>
                <img
                  src={getImagePath(selectedCaseStudieDetails.path)}
                  alt={selectedCaseStudieDetails.case_studies_title}
                  className="pull-left border border-4 shadow-lg rounded-circle m-4"
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedCaseStudieDetails.case_studies_description,
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </CaseStudiesPageStyled>
  );
};

export default CaseStudiesDetails;
