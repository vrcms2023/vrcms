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

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.dashBoardProjects);
  const [ongoingProject, setOngoingProject] = useState([]);
  const [completedProject, setCompletedProject] = useState([]);
  const [upcomingProject, setUpcomingProject] = useState([]);

  const dispatch = useDispatch();

  /**
   * Get Dash borad projects
   */
  useEffect(() => {
    dispatch(getDashBoardProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects && projects?.projectList?.length > 0) {
      updateProjects(projects?.projectList);
    }
  }, [projects]);

  const updateProjects = (projects) => {
    let projectsByCategory = getCategoryPorjectList(projects);

    setOngoingProject(formatData(projectsByCategory.ongoing));
    setUpcomingProject(formatData(projectsByCategory.future));
    setCompletedProject(formatData(projectsByCategory.completed));
  };

  /**
   * Format dashboard data
   */
  const formatData = (data) => {
    let publishedProject = data.filter((res) => res.publish);
    let notPublished = data.filter((res) => !res.publish);
    let liveProject = notPublished.filter((res) => res.isActive);
    let archiveProject = notPublished.filter((res) => !res.isActive);

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
    <div className="container-fluid pt-4 pt-md-5 pojects-dashboard">
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row px-2 px-lg-5 mb-md-3 pb-3 ">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <Title
            title="Projects Dashboard v2"
            cssClass="text-center blue-500 fs-5 mb-2 mb-md-0"
          />
          <div className="d-flex gap-1 justify-content-between align-items-center">
            <Button
              type=""
              cssClass="btn btn-outline"
              label="Add Project"
              handlerChange={() => navigate("/addproject")}
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}

      <div className="row px-2 px-lg-5 py-2 py-md-4">
        {ongoingProject.listAvailable && (
          <Projects
            project={ongoingProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
          />
        )}
        {upcomingProject.listAvailable && (
          <Projects
            project={upcomingProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
          />
        )}
        {completedProject.listAvailable && (
          <Projects
            project={completedProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
          />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
