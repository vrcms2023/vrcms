import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Common/Button";
import "../Gallery/Gallery.css";
import { getClientProjects } from "../../../redux/project/clientProjectActions";

import ProjectGalleryView from "./ProjectGalleryView";
import { removeActiveClass } from "../../../util/ulrUtil";
import { getProjectwithImageMap } from "../../../util/commonUtil";

const ProjectsGallery = () => {
  const [all, setAll] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [btnActiveWord, setBtnActiveWord] = useState("ongoing");
  const { clientProjects } = useSelector((state) => state.clientProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (clientProjects?.projectList?.length > 0) {
      const projectList = formatData(clientProjects);
      if (projectList?.completed?.length > 0) {
        setCompleted(projectList.completed);
      }
      if (projectList?.upcoming?.length > 0) {
        setUpcoming(projectList?.upcoming);
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
    const projList = [];

    const list = getProjectwithImageMap(data);

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
    if (word === "upcoming") setAll(upcoming);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4 galleryTab border-bottom">
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
          cssClass={`btn  me-2 ${
            btnActiveWord === "ongoing" ? "btn-primary" : "btn-outline"
          }`}
          label="Ongoing Projects"
          handlerChange={thumbHandler}
        />
        <Button
          type=""
          cssClass={`btn   me-2 ${
            btnActiveWord === "completed" ? "btn-primary" : "btn-outline"
          }`}
          label="Completed Projects"
          handlerChange={thumbHandler}
        />
        <Button
          type=""
          cssClass={`btn  me-2 ${
            btnActiveWord === "upcoming" ? "btn-primary" : "btn-outline"
          }`}
          label="Upcoming Projects"
          handlerChange={thumbHandler}
        />
      </div>
      <ProjectGalleryView projectImages={all} type="applicationgallery" />
    </>
  );
};
export default ProjectsGallery;
