import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./ProjectTabs.css";

import Title from "../../../Common/Title";

import { axiosClientServiceApi } from "../../../util/axiosUtil";
import HomeTab from "./HomeTab";
import Amenities from "./Amenities";
import Spefifications from "./Spefifications";
import Location from "./Location";
import Cost from "./Cost";
import Button from "../../../Common/Button";
import ProjectGalleryView from "../../Pages/Projects/ProjectGalleryView";
import { removeCookie, setCookie } from "../../../util/cookieUtil";
import { ProjectsPageStyled } from "../../../Common/StyledComponents/Styled-ProjectsPage";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { getSelectedImage } from "../../../util/commonUtil";
import PillButton from "../../../Common/Buttons/PillButton";

const ProjectTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { clientProjects } = useSelector((state) => state.clientProjects);

  const [projects, setProjects] = useState("");
  const [selectedProjects, setSelectedProjects] = useState("");

  const [projectImages, setProjectImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [planPdfs, setPlanPdfs] = useState([]);
  const [planImg, setPlanImg] = useState([]);
  const [isProjectImg, setIsProjectImg] = useState(false);

  const [thumbImgs, setThumbImgs] = useState([]);
  const [pricePdfs, setPricePdfs] = useState([]);
  const [priceImgs, setPriceImgs] = useState([]);

  const [avlPdfs, setAvlPdfs] = useState([]);
  const [avlImgs, setAvlImgs] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();

  // console.log(amenities, "amenities");

  const filteredProject = (projectid) => {
    const filteredProject = clientProjects.filter((proj) => proj.id === projectid)[0];
    if (filteredProject) {
      const selectedProjects = clientProjects.filter(
        (proj) => proj.projectStatus === filteredProject.projectStatus
      );
      setSelectedProjects(selectedProjects);
      setProjects(filteredProject);
      updateProjectDetails(filteredProject);
    }
  };

  useEffect(() => {
    if (clientProjects?.length > 0 && id) {
      filteredProject(id);
    }
  }, [id, clientProjects]);

  useEffect(() => {
    const id = document.getElementById("projectLink");
    if (id) {
      id.classList.add("active");
    }
  });

  const getProjects = async (projectid) => {
    if (projectid === "select") {
      return;
    }
    filteredProject(projectid);
  };

  const updateProjectDetails = (project) => {
    filtersImgPdfs(project, "images");
    filtersImgPdfs(project, "pdf");
    filtersImgPdfs(project, "thumbnail");
    filtersImgPdfs(project, "price");
    filtersImgPdfs(project, "plans");
    filtersImgPdfs(project, "avl");
    filtersImgPdfs(project, "thumbnail");
  };

  const filtersImgPdfs = (project, type) => {
    const data = project?.ProjectGallery;
    if (type === "images") {
      const imgs = getSelectedImage(data, "images");
      setIsProjectImg(imgs?.length > 0 ? imgs : []);
    }

    if (type === "pdf") {
      const pdfs = getSelectedImage(data, "pdf");
      setPdfs(pdfs);
    }

    if (type === "plans") {
      const filteredPlanPdfImgs = getSelectedImage(data, "plans");
      //const filteredPlanPdfImgs = filterCategory(data, "plans");
      const images = filterImages(filteredPlanPdfImgs);
      setPlanImg(images);
      const pdfs = filterPdfs(filteredPlanPdfImgs);
      setPlanPdfs(pdfs);
    }

    if (type === "price") {
      const filteredPricePdfImgs = getSelectedImage(data, "price");
      //const filteredPricePdfImgs = filterCategory(data, "price");
      const images = filterImages(filteredPricePdfImgs);
      setPriceImgs(images);
      const pdfs = filterPdfs(filteredPricePdfImgs);
      setPricePdfs(pdfs);
    }

    if (type === "avl") {
      const avlImgs = getSelectedImage(data, "availability");
      //const avlImgs = filterCategory(data, "availability");
      const images = filterImages(avlImgs);
      setAvlImgs(images);

      const pdfs = filterPdfs(avlImgs);
      setAvlPdfs(pdfs);
    }

    if (type === "thumbnail") {
      const thumbImgs = getSelectedImage(data, "thumbnail");
      //const thumbImgs = filterCategory(data, "thumbnail");
      //const images = filterImages(thumbImgs);
      setThumbImgs(thumbImgs);
    }
  };

  const filterCategory = (data, type) => {
    return data.filter((item) => item.category === type);
  };
  const filterImages = (data) => {
    return data.filter(
      (item) =>
        item.content_type === "image/jpg" ||
        item.content_type === "image/jpeg" ||
        item.content_type === "image/png"
    );
  };

  const filterPdfs = (data) => {
    return data.filter((item) => item.content_type === "application/pdf");
  };

  return (
    <ProjectsPageStyled>
      <div className="container">
        <div className="row p-0 pt-4 projectTabs">
          <div className="col-md-12">
            {/* <div className="d-flex justify-content-end">
              <Button
                type=""
                cssClass={"btn btn-outline"}
                label="All Projects"
                handlerChange={() => {
                  navigate("/projects");
                }}
              />
            </div> */}

            <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
              <div className="w-50 d-flex">
                <Title
                  title={projects?.projectStatus + " " + " / " + projects?.projectTitle}
                  // subTitle={projectTitle}
                  cssClass="fs-5 breadCrumb "
                />
              </div>

              <div className="d-flex justify-content-end align-items-center gap-2 w-50">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="projectStatus"
                  value={projects?.id}
                  onChange={(e) => getProjects(e.target.value)}
                >
                  <option value="select">Select</option>
                  {selectedProjects?.length > 0
                    ? selectedProjects?.map((project) => (
                        <option value={project.id} key={project.id}>
                          {project.projectTitle}
                        </option>
                      ))
                    : ""}
                </select>
                {isAdmin && hasPermission && (
                  <Button
                    type=""
                    icon="fa-pencil me-2 text-warning"
                    cssClass={"btn btn-outline"}
                    label="Edit"
                    handlerChange={() => {
                      navigate(`/editproject/${projects?.id}/`);
                    }}
                  />
                )}
                <Button
                  type=""
                  icon="fa-chevron-left me-2"
                  cssClass={"btn btn-outline"}
                  label="Projects"
                  handlerChange={() => {
                    navigate("/projects");
                  }}
                />
              </div>
            </div>

            <div className="col-md-12 mb-4">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <PillButton
                    label="HOME"
                    id="nav-home-tab"
                    dataBsTarget="#nav-home"
                    aria-controls="nav-home"
                    aria-selected="false"
                    className=" active"
                  />

                  {isProjectImg.length > 0 && (
                    <PillButton
                      label="GALLERY"
                      id="nav-gallery-tab"
                      dataBsTarget="#nav-gallery"
                      aria-controls="nav-gallery"
                      aria-selected="false"
                    />
                  )}
                  {projects?.specifications?.length > 0 && (
                    <PillButton
                      label="SPECIFICATIONS"
                      id="nav-specifications-tab"
                      dataBsTarget="#nav-specifications"
                      aria-controls="nav-specifications"
                      aria-selected="false"
                    />
                  )}

                  {avlImgs?.length > 0 || avlPdfs?.length > 0 ? (
                    <PillButton
                      label="AVAILABILITY"
                      id="nav-availability-tab"
                      dataBsTarget="#nav-availability"
                      aria-controls="nav-availability"
                      aria-selected="false"
                    />
                  ) : null}

                  {pricePdfs?.length > 0 || priceImgs.length > 0 ? (
                    <PillButton
                      label="COST"
                      id="nav-cost-tab"
                      dataBsTarget="#nav-cost"
                      aria-controls="nav-cost"
                      aria-selected="false"
                    />
                  ) : null}

                  {planImg?.length > 0 && (
                    <PillButton
                      label="PLAN"
                      id="nav-plan-tab"
                      dataBsTarget="#nav-plan"
                      aria-controls="nav-plan"
                      aria-selected="false"
                    />
                  )}

                  {projects?.features_amenities?.googleMap && (
                    <PillButton
                      label="LOCATION"
                      id="nav-location-tab"
                      dataBsTarget="#nav-location"
                      aria-controls="nav-location"
                      aria-selected="false"
                    />
                  )}

                  {projects?.features_amenities?.amenitie ||
                  projects?.features_amenities?.feature ? (
                    <PillButton
                      label="AMENITIES"
                      id="nav-amenities-tab"
                      dataBsTarget="#nav-amenities"
                      aria-controls="nav-amenities"
                      aria-selected="false"
                    />
                  ) : null}
                </div>
              </nav>

              <div className="tab-content" id="nav-tabContent">
                {projects?.id && (
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <HomeTab project={projects} thumbImgs={thumbImgs} pdfs={pdfs} />
                  </div>
                )}
                {isProjectImg?.length > 0 && (
                  <div
                    className="tab-pane fade"
                    id="nav-gallery"
                    role="tabpanel"
                    aria-labelledby="nav-gallery-tab"
                  >
                    <ProjectGalleryView
                      project={projects}
                      projectImages={isProjectImg}
                      type="projectgallery"
                    />
                  </div>
                )}

                {projects?.specifications?.length > 0 && (
                  <div
                    className="tab-pane fade"
                    id="nav-specifications"
                    role="tabpanel"
                    aria-labelledby="nav-specifications-tab"
                  >
                    <Spefifications specifications={projects?.specifications} />
                  </div>
                )}

                {avlImgs?.length > 0 || avlPdfs?.length > 0 ? (
                  <div
                    className="tab-pane fade"
                    id="nav-availability"
                    role="tabpanel"
                    aria-labelledby="nav-availability-tab"
                  >
                    <Cost images={avlImgs} pdfs={avlPdfs} />
                  </div>
                ) : (
                  ""
                )}
                {pricePdfs?.length > 0 || priceImgs.length > 0 ? (
                  <div
                    className="tab-pane fade"
                    id="nav-cost"
                    role="tabpanel"
                    aria-labelledby="nav-cost-tab"
                  >
                    <Cost images={priceImgs} pdfs={pricePdfs} />
                  </div>
                ) : (
                  ""
                )}
                {planImg?.length > 0 || planPdfs.length > 0 ? (
                  <div
                    className="tab-pane fade"
                    id="nav-plan"
                    role="tabpanel"
                    aria-labelledby="nav-plan-tab"
                  >
                    <Cost images={planImg} pdfs={planPdfs} />
                  </div>
                ) : (
                  ""
                )}
                {projects?.features_amenities?.googleMap ? (
                  <div
                    className="tab-pane fade"
                    id="nav-location"
                    role="tabpanel"
                    aria-labelledby="nav-location-tab"
                  >
                    <Location amenities={projects?.features_amenities} />
                  </div>
                ) : (
                  ""
                )}
                {projects?.features_amenities?.amenitie || projects?.features_amenities?.feature ? (
                  <div
                    className="tab-pane fade"
                    id="nav-amenities"
                    role="tabpanel"
                    aria-labelledby="nav-amenities-tab"
                  >
                    <Amenities amenities={projects?.features_amenities} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProjectsPageStyled>
  );
};

export default ProjectTabs;
