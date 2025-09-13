import React from "react";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";

const ProjectItem = ({ title, cssClass, projects, handleProjectDelete }) => {
  return (
    <>
      <Title title={title} cssClass="text-start fw-normal pt-3 mb-3 fs-6 text-dark" />
      <table className={`table table-hover border `}>
        <thead>
          <tr className="">
            <th scope="col" className="py-2 bg-light fw-normal text-dark">
              Name
            </th>
            <th scope="col" className="py-2 bg-light fw-normal text-dark">
              Status
            </th>
            {/* <th scope="col" className="py-2 bg-light fw-normal text-dark">
              publish
            </th> */}
            <th scope="col" colSpan={2} className="py-2 bg-light fw-normal text-dark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project.id}>
                {/* <td className='align-middle fw-bold'>{project.id}</td> */}
                <td className="align-middle">
                  {project.projectTitle}{" "}
                  {/* <span
                    className={`badge text-dark bg-${
                      project.projectCategoryValue === "ongoing"
                        ? "warning"
                        : project.projectCategoryValue === "future"
                        ? "info "
                        : project.projectCategoryValue === "completed"
                        ? "success text-white"
                        : ""
                    }`}
                  >
                    {project.status}
                  </span> */}
                </td>
                <td className="align-middle">
                  {project.percentValue ? (
                    <span
                      className={`badge fw-normal ${
                        parseInt(project.percentValue) === 0
                          ? "bg-info"
                          : parseInt(project.percentValue) === 100
                            ? "bg-success"
                            : "bg-warning"
                      }`}
                    >
                      {project.percentValue} %
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                {/* <td>
                  <input type="checkbox" checked={project.publish} />
                </td> */}
                <td className="align-middle">
                  {project.isActive ? (
                    <>
                      <Link to={`/getClientProject/${project.id}`}>
                        <i
                          className="fa fa-pencil-square-o fs-4 text-muted me-4"
                          aria-hidden="true"
                          title="Edit"
                        ></i>
                      </Link>
                      <Link to="" onClick={() => handleProjectDelete(project, project.id)}>
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                          title="Delete"
                        ></i>
                      </Link>
                    </>
                  ) : (
                    <Link to="" onClick={() => handleProjectDelete(project, project.id)}>
                      <i
                        className="fa fa-undo fs-5 fw-bormal text-warning"
                        aria-hidden="true"
                        title="Revert"
                      ></i>
                    </Link>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <p className="text-center text-dark fw-bold">
                  No projects found, Add a new project
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export const Projects = ({ project, handleProjectDelete }) => {
  return (
    <>
      {project?.ongoing?.length > 0 ? (
        <div className="col-md-6 col-lg-4">
          <ProjectItem
            title={project.ongoing[0].projectStatus}
            cssClass="text-success"
            projects={project.ongoing}
            handleProjectDelete={handleProjectDelete}
          />
        </div>
      ) : (
        <div className="col-md-6 col-lg-4">
          <Title
            title={"Ongoing Projects"}
            cssClass="text-start fw-normal pt-3 mb-3 fs-6 text-dark"
          />
          <div className="fw-bold d-flex justify-content-center align-items-center">
            No project are available
          </div>
        </div>
      )}
      {project?.future?.length > 0 ? (
        <div className="col-md-6 col-lg-4">
          <ProjectItem
            title={project.future[0].projectStatus}
            cssClass="text-success"
            projects={project.future}
            handleProjectDelete={handleProjectDelete}
          />
        </div>
      ) : (
        <div className="col-md-6 col-lg-4">
          <Title
            title={"Upcoming Projects"}
            cssClass="text-start fw-normal pt-3 mb-3 fs-6 text-dark"
          />
          <div className="fw-bold d-flex justify-content-center align-items-center">
            No project are available
          </div>
        </div>
      )}
      {project?.completed?.length > 0 ? (
        <div className="col-md-6 col-lg-4">
          <ProjectItem
            title={project.completed[0].projectStatus}
            cssClass="text-success"
            projects={project.completed}
            handleProjectDelete={handleProjectDelete}
          />
        </div>
      ) : (
        <div className="col-md-6 col-lg-4">
          <Title
            title={"Completed Projects"}
            cssClass="text-start fw-normal pt-3 mb-3 fs-6 text-dark"
          />
          <div className="fw-bold d-flex justify-content-center align-items-center">
            No project are available
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
