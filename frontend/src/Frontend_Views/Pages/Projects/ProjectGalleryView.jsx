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
      {projectImages?.length > 0 ? (
        projectImages.map((project) => (
          <div
            className={`gallery projectTabs ${
              type === "applicationgallery"
                ? "p-5 py-3 border-bottom"
                : "p-0 pt-4"
            }`}
            key={project.id}
          >
            {type !== "" && type === "applicationgallery" ? (
              <h3 className="text-start">{project.projectTitle}</h3>
            ) : (
              ""
            )}
            <p className="fs-6 text-dark text-start">
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
