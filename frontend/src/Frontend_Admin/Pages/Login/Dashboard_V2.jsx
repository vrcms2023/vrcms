import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import DeleteDialog from "../../../Common/DeleteDialog";
import Projects from "../../Components/Projects_v2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { confirmAlert } from "react-confirm-alert";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { getDashBoardProjects } from "../../../redux/project/projectActions";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.dashBoardProjects);
  const [liveProjects, setLiveProject] = useState([]);
  const [archiveProject, setArchiveProject] = useState([]);
  const [pubishProject, setpubishProject] = useState([]);
  const [ongoingProject, setOngoingProject] = useState([]);
  const [completedProject, setCompletedProject] = useState([]);
  const [upcomingProject, setUpcomingProject] = useState([]);
  const [publishProjecstStatus, setPublishProjectsStatus] = useState(false);
  const [liveProjectsStatus, setliveProjectsStatus] = useState(false);
  const [archiveProjectsStatus, setArchiveProjectStatus] = useState(false);
  const dispatch = useDispatch();

  // console.log("archiveProject", archiveProject)
  /**
   * Get Dash borad projects
   */
  useEffect(() => {
    dispatch(getDashBoardProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects && projects?.projectList?.length > 0) {
      let projectsByCategory = getCategoryPorjectList(projects?.projectList);

      setOngoingProject(formatData(projectsByCategory.ongoing));
      setUpcomingProject(formatData(projectsByCategory.future));
      setCompletedProject(formatData(projectsByCategory.completed));
    }
  }, [projects]);

  const updateProjects = (projects) => {
    const finalObj = formatData(projects);
    setLiveProject(finalObj.liveProject);
    setArchiveProject(finalObj.archiveProject);
    setpubishProject(finalObj.publishedProject);
    GetProjectsListStatus(finalObj.liveProject, setliveProjectsStatus);
    GetProjectsListStatus(finalObj.publishedProject, setPublishProjectsStatus);
    GetProjectsListStatus(finalObj.archiveProject, setArchiveProjectStatus);
  };

  const GetProjectsListStatus = (list, setObjectState) => {
    setObjectState(
      list?.completed?.length > 0 ||
        list?.future?.length > 0 ||
        list?.ongoing?.length > 0
        ? true
        : false
    );
  };

  /**
   * Format dashboard data
   */
  const formatData = (data) => {
    let publishedProject = data.filter((res) => res.publish);
    let notPublished = data.filter((res) => !res.publish);
    let liveProject = notPublished.filter((res) => res.isActive);
    let archiveProject = notPublished.filter((res) => !res.isActive);

    // liveProject = getCategoryPorjectList(liveProject);
    // publishedProject = getCategoryPorjectList(publishedProject);
    // archiveProject = getCategoryPorjectList(archiveProject);
    const listAvailable =
      publishedProject.length > 0 ||
      liveProject.length > 0 ||
      archiveProject.length > 0
        ? true
        : false;
    return {
      projectCategoryName: data[0].projectCategoryName,
      listAvailable: listAvailable,
      liveProject,
      archiveProject,
      publishedProject,
    };
  };

  const getCategoryPorjectList = (data) => {
    const projList = [];

    data.forEach((proj) => {
      if (!projList[proj.projectCategoryValue]) {
        projList[proj.projectCategoryValue] = [];
      }
      projList[proj.projectCategoryValue].push(proj);
    });

    return projList;
  };

  const callService = async (id, data, project, message) => {
    try {
      const response = await axiosServiceApi.patch(
        `/project/archiveProject/${id}/`,
        data
      );
      if (response.data?.projectList?.length > 0) {
        toast.success(`${project.projectTitle} ${message}`);
        updateProjects(response.data.projectList);
      }
    } catch (error) {
      toast.error(
        `${project.projectTitle} project unabel to process your request`
      );
    }
  };

  /**
   * Delete project form Dashboard
   * @param {project id} id
   */

  const handleProjectDelete = (project, id) => {
    const deleteDashBoardProject = async () => {
      const data = {
        isActive: false,
        publish: false,
      };
      callService(id, data, project, "project Deleted");
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteDashBoardProject}
            projectName={project.projectTitle}
          />
        );
      },
    });
  };

  /**
   * Delete project form Dashboard
   * @param {project id} id
   */

  const reStoreProject = (project, id) => {
    const reStoreDashBoardProject = async () => {
      const data = {
        isActive: true,
      };
      callService(id, data, project, "project restore successfully");
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={reStoreDashBoardProject}
            projectName={project.projectTitle}
            label={"restore"}
            message={`you want to restore ${project.projectTitle} project ?`}
          />
        );
      },
    });
  };

  return (
    <div className="container-fluid pt-5">
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row px-3 px-md-5 mb-3">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <Title
            title="Projects Dashboard v2"
            cssClass="text-center blue-500 fs-4"
          />
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <Button
              type=""
              cssClass="btn btn-primary"
              label="Add New Project"
              handlerChange={() => navigate("/addproject")}
            />
            {/* <Button type="" cssClass="btn btn-success" label="User Admin" handlerChange={() => navigate("/userAdmin")} /> */}
            {/* <Button type="submit" cssClass="btn btn-success" label="Application Pages" handlerChange={() => navigate("/applicationPages")} /> */}
            {/* <Button
              type=""
              cssClass="btn btn-secondary"
              label="Back"
              handlerChange={() => navigate("/main")}
            /> */}
          </div>
        </div>
      </div>
      {/* <hr /> */}

      <div className="row px-3 px-md-5 py-4">
        {ongoingProject.listAvailable && (
          <Projects
            project={ongoingProject}
            handleProjectDelete={handleProjectDelete}
          />
        )}
        {upcomingProject.listAvailable && (
          <Projects
            project={upcomingProject}
            handleProjectDelete={handleProjectDelete}
          />
        )}
        {completedProject.listAvailable && (
          <Projects
            project={completedProject}
            handleProjectDelete={reStoreProject}
          />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
