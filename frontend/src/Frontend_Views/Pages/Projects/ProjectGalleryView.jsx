import React, { useEffect, useState } from "react";
import "../Gallery/Gallery.css";
import GalleryImgThumb from "../Gallery/GalleryImgThumb";

import ModelBg from "../../../Common/ModelBg";
import DynamicCarousel from "../../Components/DynamicCarousel";

const ProjectGalleryView = ({ projectImages, type }) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);
  const [selectedProject, setSelectedProject] = useState({});

  const findThumbHandler = (projectId, id) => {
    const project = projectImages.find((proj) => proj.id === projectId);
    const findImg = project.imgs.find((allGallery) => allGallery.id === id);
    setSelectedProject(project);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log("projectImages", projectImages)
  return (
     <>
    <div className="container-fluid container-lg">
      <div className="row">
        <div className="col-md-12">
          {projectImages?.length > 0 ? (
        projectImages.map((project) => (
          <div
            className={`gallery projectTabs ${
              type === "applicationgallery"
                ? "p-3 p-md-5 border-bottom"
                : "px-2"
            }`}
            key={project.id}
          >
            {type !== "" && type === "applicationgallery" ? (
              <h4 className="">{project.projectTitle}</h4>
            ) : (
              ""
            )}
            <p className="">
              {project.imageDescription}
            </p>
            <GalleryImgThumb
              imgs={project.imgs}
              imageDescription={project.imageDescription}
              findThumbHandler={findThumbHandler}
              projectID={project.id}
            />
          </div>
        ))
      ) : (
        <div className="fs-2 p-5 text-warning text-center">No images found</div>
      )}
        </div>
      </div>
    </div>
   
      

      {showModal && (
        <DynamicCarousel
          obj={img}
          all={selectedProject.imgs}
          closeCarousel={closeModel}
        />
      )}
      {showModal && <ModelBg closeModel={closeModel} />}
    </>
  );
};
export default ProjectGalleryView;
