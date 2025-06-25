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
import { getCategoryPorjectList } from "../../../util/commonUtil";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.dashBoardProjects);
  const [ongoingProject, setOngoingProject] = useState([]);
  const [completedProject, setCompletedProject] = useState([]);
  const [upcomingProject, setUpcomingProject] = useState([]);
  const [ProjectCategoryType, setProjectCategoryType] = useState([]);
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

    setOngoingProject(
      formatData(projectsByCategory.ongoing ? projectsByCategory.ongoing : [])
    );
    setUpcomingProject(
      formatData(projectsByCategory.upcoming ? projectsByCategory.upcoming : [])
    );
    setCompletedProject(
      formatData(
        projectsByCategory.completed ? projectsByCategory.completed : []
      )
    );
  };

  /**
   * Format dashboard data
   */
  const formatData = (data) => {
    const { publishedProject, liveProject, archiveProject } =
      getProjectsByCategory(data);

    const listAvailable =
      publishedProject.length > 0 ||
      liveProject.length > 0 ||
      archiveProject.length > 0
        ? true
        : false;
    return {
      projectCategoryName: data[0]?.projectCategoryName,
      listAvailable: listAvailable,
      liveProject,
      archiveProject,
      publishedProject,
    };
  };

  const getProjectsByCategory = (data) => {
    let publishedProject = data.filter((res) => res.publish);
    let notPublished = data.filter((res) => !res.publish);
    let liveProject = notPublished.filter((res) => res.isActive);
    let archiveProject = notPublished.filter((res) => !res.isActive);
    return {
      publishedProject,
      liveProject,
      archiveProject,
    };
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
            message={`${project.projectTitle}  project will be archive`}
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

  const handleDeleteProjectfromDB = (event, project) => {
    event.preventDefault();
    const deleteSelectedNews = async () => {
      try {
        const response = await axiosServiceApi.delete(
          `/project/deleteProject/${project.id}/`
        );
        if (response.status !== 204) {
          setErrorMessage(response.data.message);
          toast.error("Unable to Delete Porject");
        }
        if (response.status === 204) {
          toast.success(`${project.projectTitle} project deleted`);
          dispatch(getDashBoardProjects());
        }
      } catch (error) {
        toast.error("Unable to Delete project");
      }
    };
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSelectedNews}
            message={`${project.projectTitle} project will be  deleted permentely `}
          />
        );
      },
    });
  };

  const filters = [
    {
      id: 1,
      label: "Published",
      value: "publishedProject",
    },
    {
      id: 2,
      label: "Not Published",
      value: "liveProject",
    },
    {
      id: 3,
      label: "Deleted",
      value: "archiveProject",
    },
  ];
  const projectFilter = async (value) => {
    const { publishedProject, liveProject, archiveProject } =
      getProjectsByCategory(projects?.projectList);
    if (value === "publishedProject") updateProjects(publishedProject);
    else if (value === "liveProject") updateProjects(liveProject);
    else if (value === "archiveProject") updateProjects(archiveProject);
    else updateProjects(projects?.projectList);
  };

  const getPorjectCategory = async () => {
    const response = await axiosServiceApi.get(`/project/createCategory/`);

    if (response?.status === 200) {
      setProjectCategoryType(response.data);
    }
  };
  useEffect(() => {
    getPorjectCategory();
  }, []);

  return (
    <div className="container-fluid p-4  pojects-dashboard">
      {/* <div className='text-end'>
            <badge className="bg-light text-dark shadow rounded p-1">{userName ? (`You are logged as - ${userName}`):""}</badge>
        </div> */}
      <div className="row px-2 pb-4 px-lg-5 border-bottom">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <Title
            title="Projects Dashboard v2"
            cssClass="text-center blue-500 fs-5 mb-2 mb-md-0"
          />
          <div className="d-flex gap-1 justify-content-between align-items-center">
            {ProjectCategoryType.length > 0 && (
              <Button
                type=""
                cssClass="btn btn-outline"
                label="Add Project"
                handlerChange={() => navigate("/addproject")}
              />
            )}

            <Button
              type=""
              cssClass="btn btn-outline"
              label="Project Category"
              handlerChange={() => navigate("/addCategory")}
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}

      {projects?.projectList?.length > 0 ? (
        <div className="d-flex justify-content-center dashboardFilters align-items-center px-4 mt-4">
          <i className="fa fa-filter" aria-hidden="true"></i>
          <select
            className="form-select form-select-sm border-0 text-secondary"
            aria-label=".form-select-sm example"
            onChange={(e) => projectFilter(e.target.value)}
          >
            <option defaultValue>Filters</option>
            {filters?.length > 0 &&
              filters.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>
      ) : (
        "No Projects found"
      )}
      <div className="row p-2 p-md-5 ">
        {ongoingProject.listAvailable && (
          <Projects
            project={ongoingProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
            handleDeleteProjectfromDB={handleDeleteProjectfromDB}
          />
        )}
        {upcomingProject.listAvailable && (
          <Projects
            project={upcomingProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
            handleDeleteProjectfromDB={handleDeleteProjectfromDB}
          />
        )}
        {completedProject.listAvailable && (
          <Projects
            project={completedProject}
            handleProjectDelete={handleProjectDelete}
            handleProjectreStore={reStoreProject}
            handleDeleteProjectfromDB={handleDeleteProjectfromDB}
          />
        )}
      </div>
    </div>
  );
};
export default Dashboard;
