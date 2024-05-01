import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import "./Gallery.css";
import { getClientProjects } from "../../features/project/clientProjectActions";

import ProjectGalleryView from "./ProjectGalleryView";
import { removeActiveClass } from "../../util/ulrUtil";

const ProjectsGallery = () => {
  const [all, setAll] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [future, setFuture] = useState([]);
  const [btnActiveWord, setBtnActiveWord] = useState("ongoing");
  const { clientProjects } = useSelector((state) => state.clientProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const projectList = formatData(clientProjects);
      if (projectList?.completed?.length > 0) {
        setCompleted(projectList.completed);
      }
      if (projectList?.future?.length > 0) {
        setFuture(projectList?.future);
      }
      if (projectList?.ongoing?.length > 0) {
        setOngoing(projectList?.ongoing);
        setAll(projectList?.ongoing);
      }
    }
  }, [clientProjects]);

  useEffect(() => {
    if (clientProjects.length === 0) {
      dispatch(getClientProjects());
    }
  }, [dispatch, clientProjects]);

  useEffect(() => {
    removeActiveClass();
  }, []);
  const formatData = (data) => {
    const project = data.projectList;
    const images = data.imageList;
    const projList = [];

    const list = project.reduce((acc, val, ind) => {
      const imgs = [];
      images.forEach((el, i) => {
        if (el.projectID === val.id) {
          imgs.push(el);
        }
      });
      return acc.concat({ ...val, imgs });
    }, []);

    list.map((proj) => {
      if (!projList[proj.projectCategoryValue]) {
        projList[proj.projectCategoryValue] = [];
      }
      return projList[proj.projectCategoryValue].push(proj);
    });
    return projList;
  };

  const thumbHandler = (label) => {
    const splitLabel = label.split(" ");
    const word = splitLabel[0].toLowerCase();
    setBtnActiveWord(word);
    if (word === "ongoing") setAll(ongoing);
    if (word === "completed") setAll(completed);
    if (word === "future") setAll(future);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-5 mt-5">
        <div className="text-center pb-2 mt-5 galleryTab">
          {/* <Button
                type=""
                cssClass={`loadMore me-2 ${
                  btnActiveWord === "all" ? "active" : ""
                }`}
                label="All"
                handlerChange={thumbHandler}
              /> */}
          <Button
            type=""
            cssClass={`loadMore me-2 ${
              btnActiveWord === "ongoing" ? "active" : ""
            }`}
            label="Ongoing Projects"
            handlerChange={thumbHandler}
          />
          <Button
            type=""
            cssClass={`loadMore me-2 ${
              btnActiveWord === "completed" ? "active" : ""
            }`}
            label="Completed Projects"
            handlerChange={thumbHandler}
          />
          <Button
            type=""
            cssClass={`loadMore me-2 ${
              btnActiveWord === "future" ? "active" : ""
            }`}
            label="Future Projects"
            handlerChange={thumbHandler}
          />
        </div>
        <hr />
        <div>
          <ProjectGalleryView projectImages={all} type="applicationgallery" />
        </div>
      </div>
    </>
  );
};
export default ProjectsGallery;
