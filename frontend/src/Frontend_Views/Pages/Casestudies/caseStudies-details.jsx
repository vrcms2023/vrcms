import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { useParams } from "react-router-dom";
import { CaseStudiesPageStyled } from "../../../Common/StyledComponents/Styled-Casestudies";
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import EditIcon from "../../../Common/AdminEditIcon";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import Banner from "../../../Common/Banner";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { getFormDynamicFields, imageDimensionsJson } from "../../../util/dynamicFormFields";
import { getImagePath } from "../../../util/commonUtil";

import RichTextView from "../../../Common/RichTextView";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";

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

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, success, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  const showHideHandler = async (id, compName) => {
    if (id) {
      dispatch(updateShowHideComponent(id));
    } else {
      const newData = {
        componentName: compName.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent(newData));
    }
  };

  return (
    <CaseStudiesPageStyled>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"casestudies-details-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"Case Studies Details Banner"}
        showHideComponentName={"casestudiesdetailsbanner"}
      />

      {selectedCaseStudieDetails && (
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12 text-end">
              <Ancher
                AncherLabel="Back"
                AncherClass="btn btn-outline"
                Ancherpath={`/casestudies/`}
                AnchersvgColor=""
                icon="fa-chevron-left"
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-column-reverse flex-sm-row justify-content justify-content-between align-items-center gap-3 mt-4">
            <h1 className="">{selectedCaseStudieDetails.case_studies_title}</h1>
          </div>
          <div className="row">
            <div className="col-md-12 py-3 caseStudieDetails">
              <p>
                <img
                  src={getImagePath(selectedCaseStudieDetails.path)}
                  alt={selectedCaseStudieDetails.case_studies_title}
                  className="pull-left border border-4 shadow-lg rounded-circle m-4"
                />
                <RichTextView
                  data={selectedCaseStudieDetails.case_studies_description}
                  className={""}
                  showMorelink={false}
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
