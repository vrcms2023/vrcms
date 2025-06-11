import React from "react";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";

const ProjectItem = ({
  projects,
  itemCSSClass,
  handleProjectDelete,
  handleProjectreStore,
  handleDeleteProjectfromDB,
}) => {
  return (
    <>
      {projects.length > 0 ? (
        projects.map((project) => (
          <tr key={project.id} className={itemCSSClass}>
            <td className={`${itemCSSClass} align-middle`}>
              {project.projectTitle}{" "}
            </td>
            <td className="align-middle">
              <span
                className={`badge fw-normal ${
                  parseInt(project.percentValue) >= 0 &&
                  parseInt(project.percentValue) < 50
                    ? "bg-info"
                    : parseInt(project.percentValue) === 100
                      ? "bg-success"
                      : "bg-warning"
                }`}
              >
                {/* {project?.percentValue ? project?.percentValue : 0} % */}
                {project?.percentValue} %
              </span>
            </td>

            <td className="align-middle text-center">
              {project.isActive && (
                <span
                  className={`${project.publish ? "text-success " : "text-black-50"} fw-bold `}
                >
                  P
                </span>
              )}

              {project.isActive ? (
                <>
                  <Link to={`/editproject/${project.id}`}>
                    <i
                      className="fa fa-pencil text-muted mx-4"
                      aria-hidden="true"
                      title="Edit"
                    ></i>
                  </Link>
                  <Link
                    to=""
                    onClick={() => handleProjectDelete(project, project.id)}
                  >
                    <i
                      className="fa fa-trash-o  text-muted"
                      aria-hidden="true"
                      title="Delete"
                    ></i>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to=""
                    onClick={() => handleProjectreStore(project, project.id)}
                  >
                    <i
                      className="fa fa-undo mx-4  fw-bormal text-muted"
                      aria-hidden="true"
                      title="Revert"
                    ></i>
                  </Link>
                  <Link
                    to=""
                    onClick={(event) =>
                      handleDeleteProjectfromDB(event, project)
                    }
                  >
                    <i
                      className="fa fa-trash-o  text-muted"
                      aria-hidden="true"
                      title="Revert"
                    ></i>
                  </Link>
                </>
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
    </>
  );
};

const ProjectList = ({
  title,
  cssClass,
  projects,
  handleProjectDelete,
  handleProjectreStore,
  handleDeleteProjectfromDB,
}) => {
  return (
    <>
      <Title
        title={title}
        cssClass="text-center fw-normal pt-3 mb-3 text-dark"
      />
      <table className={`table table-hover border projects`}>
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
            <th
              scope="col"
              colSpan={2}
              className="py-2 bg-light fw-normal text-dark"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects?.publishedProject?.length > 0 && (
            <ProjectItem
              projects={projects?.publishedProject}
              itemCSSClass={"projectPublished"}
              handleProjectDelete={handleProjectDelete}
              handleProjectreStore={handleProjectreStore}
              handleDeleteProjectfromDB={handleDeleteProjectfromDB}
            />
          )}
          {projects?.liveProject?.length > 0 && (
            <ProjectItem
              projects={projects?.liveProject}
              itemCSSClass={"projectUnpublished"}
              handleProjectDelete={handleProjectDelete}
              handleProjectreStore={handleProjectreStore}
              handleDeleteProjectfromDB={handleDeleteProjectfromDB}
            />
          )}
          {projects?.archiveProject?.length > 0 && (
            <ProjectItem
              projects={projects?.archiveProject}
              itemCSSClass={"projectDeleted"}
              handleProjectDelete={handleProjectDelete}
              handleProjectreStore={handleProjectreStore}
              handleDeleteProjectfromDB={handleDeleteProjectfromDB}
            />
          )}
        </tbody>
      </table>
    </>
  );
};

export const Projects = ({
  project,
  handleProjectDelete,
  handleProjectreStore,
  handleDeleteProjectfromDB,
}) => {
  return (
    <>
      <div className="col-lg-4">
        <ProjectList
          title={project?.projectCategoryName}
          cssClass="text-success"
          projects={project}
          handleProjectDelete={handleProjectDelete}
          handleProjectreStore={handleProjectreStore}
          handleDeleteProjectfromDB={handleDeleteProjectfromDB}
        />
      </div>
    </>
  );
};

export default Projects;
