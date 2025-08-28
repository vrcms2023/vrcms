import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { axiosServiceApi } from "../../../util/axiosUtil";
import {
  getCategoryPorjectList,
  getDummyImage,
  getFilterObjectByID,
  getFilterObjectLabel,
  getImagePath,
  getUniqueValuesFromarray,
} from "../../../util/commonUtil";
import DeleteDialog from "../../../Common/DeleteDialog";
import SingleImageUlploadWithForm from "../../Components/forms/SingleImageUlploadWithForm";
import {
  getProjectCategoryFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { getDashBoardProjects } from "../../../redux/project/projectActions";

const ProjectCategory = () => {
  const categoryOptions = [
    {
      id: 1000,
      label: "Select",
      value: "Select",
    },
    {
      id: 1001,
      label: "Upcoming Projects",
      value: "upcoming",
    },
    {
      id: 1002,
      label: "Ongoing Projects",
      value: "ongoing",
    },
    {
      id: 1003,
      label: "Completed Projects",
      value: "completed",
    },
  ];
  let deleteCategoryOption;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.dashBoardProjects);
  const [ProjectCategoryType, setProjectCategoryType] = useState([]);
  const editComponentObj = {
    category: false,
  };
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [compTtile, setComptitle] = useState("Add Project Categories");
  const [editCategory, setEditCategory] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  const [categoryOptionList, setCategoryOptionList] = useState(categoryOptions);
  const [deletedcategoryOption, setDeletedCategoryOption] = useState([]);

  const getPorjectCategory = async () => {
    //const response = await axiosServiceApi.get(`/project/categorylist/`);
    const response = await axiosServiceApi.get(`/project/createCategory/`);

    if (response?.status === 200) {
      setProjectCategoryType(response.data);
      getAvailableCategoryList(response.data);
    }
  };
  useEffect(() => {
    getPorjectCategory();
  }, []);

  useEffect(() => {
    dispatch(getDashBoardProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects && projects?.projectList?.length > 0) {
      let projectsByCategory = getCategoryPorjectList(projects.projectList);
      setProjectsList(projectsByCategory);
    }
  }, [projects]);

  const addNewCategories = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Add category");
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const editHandler = (name, value, item) => {
    setEditCategory(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setComptitle("Edit category");
    setShow(!show);
    document.body.style.overflow = "hidden";
    getPorjectCategory();
  };

  const handleCategoryDelete = (category) => {
    const title = category.category_Label;
    const isProjectsAvailable = projectsList[category.category_Value];
    deleteCategoryOption = categoryOptions.filter((item) => item.value === title);

    if (isProjectsAvailable?.length > 0) {
      // toast.info={`${title} category has ${isProjectsAvailable.length} projects, cannot delete category`}
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <DeleteDialog
              title={title}
              showConfirmButotns={false}
              onClose={onClose}
              // message={`category has ${isProjectsAvailable.length} projects, cannot delete`}
              message={
                <>
                  Category has <span>{isProjectsAvailable.length}</span> projects, cannot delete
                </>
              }
            />
          );
        },
      });
      return true;
    }
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(`/project/updateCategory/${category.id}/`);
      if (response.status === 204) {
        toast.success(`${title} category is delete successfully `);

        getPorjectCategory();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            // message={`you want to delete the ${title} category`}
            message={
              <>
                Do you wish to delete the <span>{title}</span> category?
              </>
            }
          />
        );
      },
    });
  };

  const getAvailableCategoryList = (data) => {
    const list = [];
    categoryOptionList.forEach((element) => {
      const isoptionExit = getFilterObjectLabel(data, "category_Value", element.value);
      if (!isoptionExit) {
        list.push({
          label: element.label,
          value: element.value,
        });
      }
    });
    if (deleteCategoryOption) {
      list.push(...deleteCategoryOption);
      deleteCategoryOption = "";
    }
    setCategoryOptionList(list);
  };

  return (
    <div className="container-fluid p-4 pojects-dashboard">
      <div className="row px-2 px-lg-5">
        <div className="text-end d-flex justify-content-between align-items-center flex-column flex-md-row">
          <CSRFToken />
          <Title
            title={"Add Project Categories"}
            cssClass="text-center blue-500 fs-5 mb-3 mb-md-0"
          />

          <div className="d-flex gap-1 justify-content-between align-items-center">
            {categoryOptionList.length > 1 && (
              <Button
                type=""
                cssClass="btn btn-outline"
                label="Add"
                handlerChange={() => addNewCategories("category", true)}
              />
            )}

            <Button
              type=""
              cssClass="btn btn-outline"
              label="Dashboard"
              handlerChange={() => navigate("/dashboard")}
            />
          </div>
        </div>
        <div className="mt-5">
          {/* Project category should be */}
          <h4 className="text-center">Category Types</h4>
          <ul className="d-flex justify-content-center align-items-center gap-3 mb-3 list-unstyled">
            <li className="border-success  p-1 px-3">Ongoing </li>{" "}
            <span className="text-muted">|</span>
            <li className="border-warning  p-1 px-3">Upcoming </li>{" "}
            <span className="text-muted">|</span>
            <li className="border-primary  p-1 px-3">Completed </li>
          </ul>
        </div>
      </div>

      <div className="container border py-1 py-md-5">
        <div className="row px-0 px-md-3 px-lg-5 table-responsive">
          {ProjectCategoryType?.length > 0 ? (
            <table className="table contacts">
              <thead>
                <tr>
                  <th className="align-middle fw-bold text-muted">Category</th>
                  {/* <th className="align-middle fw-bold  text-muted">Value</th> */}
                  <th className="align-middle fw-bold  text-muted">Description</th>
                  <th className="align-middle fw-bold  text-muted">Image</th>
                  <th
                    className="align-middle text-end fw-bold text-muted"
                    style={{ width: "100px " }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ProjectCategoryType?.map((category) => (
                  <tr key={category.id} className="bg-success">
                    {/* <td className="align-middle">{category.category_Label}</td> */}
                    <td
                      className={`align-middle ${
                        category.category_Value === "ongoing"
                          ? "text-success fw-bold"
                          : category.category_Value === "upcoming"
                            ? "text-warning fw-bold"
                            : "text-primary fw-bold"
                      }`}
                    >
                      {category.category_Value}
                    </td>
                    <td className="align-middle">{category?.category_description}</td>
                    <td className="align-middle text-center">
                      <img
                        src={category?.path ? getImagePath(category.path) : getDummyImage()}
                        alt={category?.alternitivetext}
                        className="thumb75 d-lg-block rounded-1"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td className="align-middle text-end">
                      <Link
                        to=""
                        onClick={() => editHandler("category", true, category)}
                        className="p-0 p-md-2"
                      >
                        <i
                          className="fa fa-pencil text-warning cursor-pointer fs-5"
                          aria-hidden="true"
                        ></i>
                      </Link>

                      <Link to="" className=" ms-4" onClick={() => handleCategoryDelete(category)}>
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                          title="Delete"
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Result found"
          )}
          <>
            {componentEdit.category && (
              <div className={`adminEditTestmonial selected `}>
                <SingleImageUlploadWithForm
                  editHandler={editHandler}
                  componentType="category"
                  popupTitle="category"
                  componentTitle={compTtile}
                  selectedItem={editCategory}
                  setSelectedItemState={setEditCategory}
                  imageGetURL={`/project/createCategory/`}
                  imagePostURL="/project/createCategory/"
                  imageUpdateURL="/project/updateCategory/"
                  imageDeleteURL="/project/updateCategory/"
                  imageLabel="Project Image"
                  showDescription={false}
                  showExtraFormFields={getProjectCategoryFormDynamicFields(
                    editCategory,
                    categoryOptionList,
                    editCategory?.id ? true : false
                  )}
                  dimensions={imageDimensionsJson("advertisement")}
                />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProjectCategory;
