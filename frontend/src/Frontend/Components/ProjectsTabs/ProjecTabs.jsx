import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProjectTabs.css";

import Title from "../../../Common/Title";
import ProjectGalleryView from "../../Pages/ProjectGalleryView";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import HomeTab from "./HomeTab";
import Amenities from "./Amenities";
import Spefifications from "./Spefifications";
import Location from "./Location";
import Cost from "./Cost";
import Button from "../../../Common/Button";

const ProjectTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [projects, setProjects] = useState(location?.state?.selectedPorject);
  const [projectid, setprojectid] = useState(location?.state?.projectid);
  // const [selectedProject, setSelectedProject] = useState(null)
  const [amenities, setAmenities] = useState({});
  const [projectImages, setProjectImages] = useState([]);
  const [projectHome, setProjectHome] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [planPdfs, setPlanPdfs] = useState([]);
  const [planImg, setPlanImg] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [isProjectImg, setIsProjectImg] = useState(false);

  const [thumbImgs, setThumbImgs] = useState([]);
  const [pricePdfs, setPricePdfs] = useState([]);
  const [priceImgs, setPriceImgs] = useState([]);

  const [avlPdfs, setAvlPdfs] = useState([]);
  const [avlImgs, setAvlImgs] = useState([]);

  useEffect(() => {
    getProjects(projectid);
  }, [projectid]);

  useEffect(() => {
    const id = document.getElementById("projectLink");
    if (id) {
      id.classList.add("active");
    }
  });

  const getProjects = async (projectid) => {
    // const {value} = e.target
    try {
      const response = await axiosClientServiceApi.get(
        `/project/getSelectedClientProject/${projectid}/`
      );
      if (response?.status === 200) {
        const projectData = response.data;
        const project = projectData.project[0];
        setProjectTitle(project?.projectTitle);
        setprojectid(project?.id);
        setProjectHome(project);
        setAmenities(projectData.amenitie[0]);
        filtersImgPdfs(projectData, "images");
        filtersImgPdfs(projectData, "pdfs");
        filtersImgPdfs(projectData, "price");
        filtersImgPdfs(projectData, "plan");
        filtersImgPdfs(projectData, "avl");
        filtersImgPdfs(projectData, "thumbnail");
        setSpecifications(projectData?.specificationData);
      }
    } catch (error) {
      console.log("unable to access ulr because of server is down");
    }
  };

  const filtersImgPdfs = (proj, type) => {
    const data = proj.imageData;

    if (type === "images") {
      const imgs = filterCategory(data, "images");
      const project = [
        {
          ...proj.project[0],
          imgs: imgs,
        },
      ];
      setIsProjectImg(imgs.length > 0 ? true : false);
      setProjectImages(project);
    }
    if (type === "pdfs") {
      const pdfs = filterCategory(data, "PDF");
      setPdfs(pdfs);
    }

    if (type === "plan") {
      const filteredPlanPdfImgs = filterCategory(data, "Plans");
      const images = filterImages(filteredPlanPdfImgs);
      setPlanImg(images);
      const pdfs = filterPdfs(filteredPlanPdfImgs);
      setPlanPdfs(pdfs);
    }

    if (type === "price") {
      const filteredPricePdfImgs = filterCategory(data, "price");
      const images = filterImages(filteredPricePdfImgs);
      setPriceImgs(images);
      const pdfs = filterPdfs(filteredPricePdfImgs);
      setPricePdfs(pdfs);
    }

    if (type === "avl") {
      const avlImgs = filterCategory(data, "availability");
      const images = filterImages(avlImgs);
      setAvlImgs(images);

      const pdfs = filterPdfs(avlImgs);
      setAvlPdfs(pdfs);
    }

    if (type === "thumbnail") {
      const thumbImgs = filterCategory(data, "thumbnail");
      const images = filterImages(thumbImgs);
      setThumbImgs(images);
    }
  };

  const filterCategory = (data, type) => {
    return data.filter((item) => item.category === type);
  };
  const filterImages = (data) => {
    return data.filter(
      (item) =>
        item.contentType === ".jpg" ||
        item.contentType === ".jpeg" ||
        item.contentType === ".png"
    );
  };

  const filterPdfs = (data) => {
    return data.filter((item) => item.contentType === ".pdf");
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row p-0 pt-4 projectTabs">
        <div className="col-md-12">
          <div className="text-end">
            <Button
              type=""
              cssClass={"btn btn-success"}
              label="Back to projects"
              handlerChange={() => {
                navigate("/projects");
              }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <Title
              title={projectHome.projectCategoryName}
              subTitle={projectTitle}
              cssClass="blue-900 fs-5 fw-bold"
            />
            <select
              className="form-select shadow-lg border border-1 rounded-0 border-success w-25"
              aria-label="Default select example"
              id="projectStatus"
              value={projectid}
              onChange={(e) => getProjects(e.target.value)}
            >
              <option value="select">Select Project</option>
              {projects?.length > 0
                ? projects.map((project) => (
                    <option value={project.id} key={project.id}>
                      {project.projectTitle}
                    </option>
                  ))
                : ""}
            </select>
          </div>

          <div className="col-md-12 mb-4">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  HOME
                </button>
                {isProjectImg ? (
                  <button
                    className="nav-link"
                    id="nav-gallery-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-gallery"
                    type="button"
                    role="tab"
                    aria-controls="nav-gallery"
                    aria-selected="false"
                  >
                    GALLERY
                  </button>
                ) : (
                  ""
                )}
                {specifications?.length > 0 ? (
                  <button
                    className="nav-link"
                    id="nav-specifications-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-specifications"
                    type="button"
                    role="tab"
                    aria-controls="nav-specifications"
                    aria-selected="false"
                  >
                    SPECIFICATIONS
                  </button>
                ) : (
                  ""
                )}
                {avlImgs?.length > 0 || avlPdfs?.length > 0 ? (
                  <button
                    className="nav-link"
                    id="nav-availability-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-availability"
                    type="button"
                    role="tab"
                    aria-controls="nav-availability"
                    aria-selected="false"
                  >
                    AVAILABILITY
                  </button>
                ) : (
                  ""
                )}

                {pricePdfs?.length > 0 || priceImgs.length > 0 ? (
                  <button
                    className="nav-link"
                    id="nav-cost-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-cost"
                    type="button"
                    role="tab"
                    aria-controls="nav-cost"
                    aria-selected="false"
                  >
                    COST
                  </button>
                ) : (
                  ""
                )}

                {planImg?.length > 0 ? (
                  <button
                    className="nav-link"
                    id="nav-plan-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-plan"
                    type="button"
                    role="tab"
                    aria-controls="nav-plan"
                    aria-selected="false"
                  >
                    PLAN
                  </button>
                ) : (
                  ""
                )}

                {amenities?.googleMap ? (
                  <button
                    className="nav-link"
                    id="nav-location-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-location"
                    type="button"
                    role="tab"
                    aria-controls="nav-location"
                    aria-selected="false"
                  >
                    LOCATION
                  </button>
                ) : (
                  ""
                )}

                {amenities?.amenitie || amenities?.feature ? (
                  <button
                    className="nav-link"
                    id="nav-amenities-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-amenities"
                    type="button"
                    role="tab"
                    aria-controls="nav-amenities"
                    aria-selected="false"
                  >
                    AMENITIES
                  </button>
                ) : (
                  ""
                )}
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <HomeTab
                  project={projectHome}
                  thumbImgs={thumbImgs}
                  pdfs={pdfs}
                />
              </div>
              {isProjectImg ? (
                <div
                  className="tab-pane fade"
                  id="nav-gallery"
                  role="tabpanel"
                  aria-labelledby="nav-gallery-tab"
                >
                  <ProjectGalleryView
                    projectImages={projectImages}
                    type="projectgallery"
                  />
                </div>
              ) : (
                ""
              )}

              {specifications?.length > 0 ? (
                <div
                  className="tab-pane fade"
                  id="nav-specifications"
                  role="tabpanel"
                  aria-labelledby="nav-specifications-tab"
                >
                  <Spefifications specifications={specifications} />
                </div>
              ) : (
                ""
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
              {amenities?.googleMap ? (
                <div
                  className="tab-pane fade"
                  id="nav-location"
                  role="tabpanel"
                  aria-labelledby="nav-location-tab"
                >
                  <Location amenities={amenities} />
                </div>
              ) : (
                ""
              )}
              {amenities?.amenitie || amenities?.feature ? (
                <div
                  className="tab-pane fade"
                  id="nav-amenities"
                  role="tabpanel"
                  aria-labelledby="nav-amenities-tab"
                >
                  <Amenities amenities={amenities} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;
