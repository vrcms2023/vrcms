import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import JobCurrentOpenings from "../../Components/JobCurrentOpenings";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";

import { removeActiveClass } from "../../../util/ulrUtil";
import { getFormDynamicFields } from "../../../util/dynamicFormFields";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";

// Images Imports
import Title from "../../../Common/Title";

// Styles
import JobBriefDetails from "../../Components/JobBriefDetails";
import { CareersPageStyled } from "../../../Common/StyledComponents/Styled-CareersPage";
import ApplyForm from "./ApplyForm";
import CareersFilter from "../../Components/CareersSearch/CareersFilter";
import { CareerFilterStyled } from "../../../Common/StyledComponents/Styled-CareerFilter";
import RichTextView from "../../../Common/RichTextView";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import {
  createShowHideComponent,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import Ancher from "../../../Common/Ancher";

const Careers = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "career-details";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState({});
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getCareerData = async () => {
      try {
        let response = await axiosClientServiceApi.get(
          `/careers/clientSelectedCareers/${id}/`
        );

        let keys = Object.keys(response.data);
        if (keys.length > 1) {
          setPosts(response.data.results);
        } else {
          setPosts(response.data.careers);
        }
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
    getCareerData();
  }, [id, isAdmin]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, success, showHideList } = useSelector(
    (state) => state.showHide
  );

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
    <>
      <div
        className={
          showHideCompList?.careerdetailsbanner?.visibility &&
          isAdmin &&
          hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.careerdetailsbanner?.visibility}
            title={"Banner"}
            componentName={"careerdetailsbanner"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.careerdetailsbanner?.id}
          />
        )}
        {showHideCompList?.careerdetailsbanner?.visibility && (
          <>
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

            {componentEdit.banner && (
              <div className={`adminEditTestmonial selected `}>
                <ImageInputsForm
                  editHandler={editHandler}
                  componentType="banner"
                  popupTitle="Career Details Banner"
                  pageType={`${pageType}-banner`}
                  imageLabel="Banner Image"
                  showDescription={false}
                  showExtraFormFields={getFormDynamicFields(
                    `${pageType}-banner`
                  )}
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <Title title="Details" cssClass="fw-medium fs-4 pageTitle " />
            <Ancher
              AncherLabel="Back"
              AncherClass="btn btn-outline"
              Ancherpath={`/careers/`}
              AnchersvgColor=""
              icon="fa-chevron-left"
            />
          </div>
          {/* <div className="col-4 col-md-2 text-end">
            <Link to="/careers" className="btn btn-outline">
              <i className="fa fa-chevron-left me-2" aria-hidden="true"></i>
              <span className="">Back</span>
            </Link>
          </div> */}
        </div>
      </div>

      {/* <CareerFilterStyled>
        <div className="container careersFilter">
          <CareersFilter />
        </div>
      </CareerFilterStyled> */}

      <CareersPageStyled>
        <div className="container mb-md-5 py-md-4">
          <div className="row d-flex flex-rowreverse">
            <div className="col-md-7 col-lg-8 p-md-0">
              <JobBriefDetails jobDetails={posts} />
              <div className="jobDescription mb-4 p-3">
                {posts.description && (
                  <RichTextView
                    data={posts.description}
                    className={""}
                    showMorelink={false}
                  />
                  // <div
                  //   dangerouslySetInnerHTML={{ __html: posts.description }}
                  // />
                )}

                {/* <div className="mt-3">
                  <span className="d-block">
                    <strong>Department</strong> : Engineering - Software & QA
                  </span>
                  <span className="d-block">
                    <strong>Employment Type</strong>: Full Time, Permanent
                  </span>
                </div> */}
              </div>
              <JobCurrentOpenings />
            </div>
            <div className="col-md-5 col-lg-4 p-0 mb-5">
              <ApplyForm jobDetails={posts} />
            </div>
          </div>
        </div>
      </CareersPageStyled>

      {show && <ModelBg />}
    </>
  );
};

export default Careers;
