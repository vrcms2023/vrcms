import React, { useEffect, useState } from "react";
import CSRFToken from "../../../Frontend_Views/Components/CRSFToken";
import Title from "../../../Common/Title";
import Button from "../../../Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getDummyImage, getImagePath } from "../../../util/commonUtil";
import DeleteDialog from "../../../Common/DeleteDialog";
import SingleImageUlploadWithForm from "../../Components/forms/SingleImageUlploadWithForm";
import {
  getProjectCategoryFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const ProjectCategory = () => {
  const navigate = useNavigate();
  const [ProjectCategoryType, setProjectCategoryType] = useState([]);
  const editComponentObj = {
    category: false,
  };
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [compTtile, setComptitle] = useState("Add Project Categories");
  const [editCategory, setEditCategory] = useState({});

  const getPorjectCategory = async () => {
    //const response = await axiosServiceApi.get(`/project/categorylist/`);
    const response = await axiosServiceApi.get(`/project/createCategory/`);

    if (response?.status === 200) {
      setProjectCategoryType(response.data);
    }
  };
  useEffect(() => {
    getPorjectCategory();
  }, []);

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

  const handleAdvertisementDelete = (category) => {
    const title = category.projectLabel;
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/project/updateCategory/${category.id}/`
      );
      if (response.status === 204) {
        toast.success(`${title} Advertisement is delete successfully `);
        getPorjectCategory();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            message={`you want to delete the ${title} Advertisement`}
          />
        );
      },
    });
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
            <Button
              type=""
              cssClass="btn btn-outline"
              label="Add"
              handlerChange={() => addNewCategories("category", true)}
            />
            <Button
              type=""
              cssClass="btn btn-outline"
              label="Dashboard"
              handlerChange={() => navigate("/appAdmin/dashboard")}
            />
          </div>
        </div>
        <div className="mt-5">
          {/* Project category should be */}
          <h4 className="text-center">Category Types</h4>
          <ul className="d-flex justify-content-center align-items-center gap-3 mb-3 list-unstyled">
            <li className="border-success  p-1 px-3">Ongoing </li> <span className="text-muted">|</span>
            <li className="border-warning  p-1 px-3">Future </li> <span className="text-muted">|</span>
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
                  <th className="align-middle fw-bold text-muted">Title</th>
                  <th className="align-middle fw-bold  text-muted">Value</th>
                  <th className="align-middle fw-bold  text-muted">Description</th>
                  <th className="align-middle fw-bold  text-muted">
                    Image
                  </th>
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
                    <td className="align-middle">{category.category_Label}</td>
                    <td className={
                        `align-middle ${
                          category.category_Value === "ongoing"
                            ? "text-success fw-bold"
                            : category.category_Value === "future"
                              ? "text-warning"
                              : "text-primary"
                        }`
                      }>
                        {category.category_Label}
                      </td>
                    <td className="align-middle">
                      {category?.category_description}
                    </td>
                    <td className="align-middle text-center">
                      <img
                        src={
                          category?.path
                            ? getImagePath(category.path)
                            : getDummyImage()
                        }
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

                      <Link
                        to=""
                        className=" ms-2 ms-md-4"
                        onClick={() => handleAdvertisementDelete(category)}
                      >
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
                    editCategory
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
