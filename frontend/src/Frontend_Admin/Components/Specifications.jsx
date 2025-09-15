import React, { useEffect } from "react";
import Title from "../../Common/Title";
import Button from "../../Common/Button";
import { axiosServiceApi } from "../../util/axiosUtil";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { InputFields, RichTextInputEditor_V2 } from "./forms/FormFields";

const Specifications = ({ title, register, fields, append, remove }) => {
  const handleClick = () => {
    append({ title: "", feature: "" });
  };

  const handleDelete = (index) => {
    const selectedSpecification = fields[index];

    const deleteSpecifications = async () => {
      const id = selectedSpecification?.id;

      if (id !== undefined) {
        try {
          const response = await axiosServiceApi.delete(`/project/deleteSpecifications/${id}/`);
          if (response?.status === 204) {
            toast.success(`${selectedSpecification.title} is deleted`);
            remove(index);
          }
        } catch (error) {
          toast.error(`${selectedSpecification.title} unable to deleted`);
          remove(index);
        }
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSpecifications}
            // message={`you want to restore ${project.projectTitle} project ?`}
            message={
              <>
                You want to restore <span>{selectedSpecification.title}</span> project?
              </>
            }
          />
        );
      },
    });
  };

  /**
   * get selected Specification for edit
   */
  // useEffect(() => {
  //   const getSelectedSpecification = async () => {
  //     const response = await axiosServiceApi.get(`/project/getSpecification/${project.id}/`);
  //     if (response?.status === 200 && response.data?.specification !== undefined) {
  //       const orderReverse = response?.data?.specification;
  //       setSpecifications(orderReverse.reverse());
  //     }
  //   };
  //   if (project?.id) {
  //     getSelectedSpecification();
  //   }
  // }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Title title={title} cssClass="fs-6" />
        <Button
          type="button"
          icon="fa-plus me-2"
          cssClass="btn btn-outline mb-2"
          label="Add"
          handlerChange={handleClick}
        />
      </div>

      <table className="table border-light m-0">
        <tbody>
          {fields?.length > 0 ? (
            fields.map((item, index) => (
              <tr key={item.id} className="">
                <td className=" py-3 bg-transparent ">
                  <InputFields
                    label="Title"
                    fieldName={`specifications.${index}.title`}
                    register={register}
                  />
                  <InputFields
                    type="textarea"
                    fieldName={`specifications.${index}.feature`}
                    register={register}
                  />
                </td>
                <td className="align-middle  py-3 text-center">
                  <i
                    className="fa fa-trash-o fs-5 text-danger"
                    aria-hidden="true"
                    onClick={() => handleDelete(index)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">
                <div className="text-center p-5">No specifications found, Please add</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Specifications;
