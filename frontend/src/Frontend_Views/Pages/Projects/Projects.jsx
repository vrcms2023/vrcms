import React, { useEffect, useRef, useState } from "react";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import { useDispatch, useSelector } from "react-redux";
import { getClientProjects } from "../../../redux/project/clientProjectActions";
import ProjectItem from "../../Components/projectItem";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import Banner from "../../../Common/Banner";
import { dataFormatedByCatergoryName } from "../../../util/dataFormatUtil";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
// import "./Projects.css";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import { removeActiveClass } from "../../../util/ulrUtil";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import { ProjectsPageStyled } from "../../../Common/StyledComponents/Styled-ProjectsPage";

const Projects = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
  };
  const pageType = "projects";
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  const [completed, setCompleted] = useState([]);
  const [future, setFuture] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const { clientProjects } = useSelector((state) => state.clientProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, [dispatch, clientProjects]);

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const projectList = dataFormatedByCatergoryName(clientProjects);
      setCompleted(projectList.completed);
      setFuture(projectList.upcoming);
      setOngoing(projectList.ongoing);
    }
  }, [clientProjects]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const { error, showHideList } = useSelector((state) => state.showHide);

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
          showHideCompList?.projetstbanner?.visibility &&
          isAdmin &&
          hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.projetstbanner?.visibility}
            title={"Banner"}
            componentName={"projetstbanner"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.projetstbanner?.id}
          />
        )}
        {showHideCompList?.projetstbanner?.visibility && (
          <>
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
                  popupTitle="Projects Banner"
                  pageType={`${pageType}-banner`}
                  imageLabel="Project Banner Image"
                  showDescription={false}
                  showExtraFormFields={getFormDynamicFields(
                    `${pageType}-banner`
                  )}
                  dimensions={imageDimensionsJson("banner")}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div
        className={
          showHideCompList?.projectsbriefintro?.visibility &&
          isAdmin &&
          hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.projectsbriefintro?.visibility}
            title={"A Brief Introduction Component"}
            componentName={"projectsbriefintro"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.projectsbriefintro?.id}
          />
        )}

        {/* INTRODUCTION COMPONENT */}
        {showHideCompList?.projectsbriefintro?.visibility && (
          <div>
            {/* Introduction */}

            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )}
            {/* <BriefIntro title="Welcome To HPR Infra Projects">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro> */}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType={pageType}
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
            />
            {componentEdit.briefIntro && (
              <div className={`adminEditTestmonial selected `}>
                <AdminBriefIntro
                  editHandler={editHandler}
                  popupTitle="Project Details"
                  componentType="briefIntro"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <ProjectsPageStyled>
        <div className="container-fluid projectsList">
          {ongoing?.length > 0 && (
            <ProjectItem projectList={ongoing} projectType={ongoing} />
          )}

          {/* Completed Projects */}
          {completed?.length > 0 && (
            <ProjectItem projectList={completed} projectType={completed} />
          )}

          {/* future Projects */}
          {future?.length > 0 && (
            <ProjectItem projectList={future} projectType={future} />
          )}
        </div>
      </ProjectsPageStyled>
      {show && <ModelBg />}
    </>
  );
};

export default Projects;
