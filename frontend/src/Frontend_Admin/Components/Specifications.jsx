import React, { useEffect } from "react";
import Title from "../../Common/Title";
import Button from "../../Common/Button";
import { axiosServiceApi } from "../../util/axiosUtil";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";

const Specifications = ({
  title,
  project,
  specifications,
  setSpecifications,
}) => {
  const handleClick = () => {
    setSpecifications([{ title: "", feature: "" }, ...specifications]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...specifications];
    onchangeVal[i][name] = value;
    setSpecifications(onchangeVal);
  };

  const handleDelete = (i) => {
    const selectedSpecification = [...specifications][i];
    const deleteSpecifications = async () => {
      const deleteVal = [...specifications];
      const objId = deleteVal[i].id;

      if (objId !== undefined) {
        try {
          const response = await axiosServiceApi.delete(
            `/project/deleteSpecifications/${objId}/`
          );
          if (response.status === 204) {
            toast.success(`${deleteVal[i].title} is deleted`);
            deleteVal.splice(i, 1);
          }
        } catch (error) {
          toast.error(`${deleteVal[i].title} unable to deleted`);
        }
      } else {
        deleteVal.splice(i, 1);
      }

      setSpecifications(deleteVal);
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSpecifications}
            projectName={selectedSpecification.title}
          />
        );
      },
    });
  };

  /**
   * get selected Specification for edit
   */
  useEffect(() => {
    const getSelectedSpecification = async () => {
      const response = await axiosServiceApi.get(
        `/project/getSpecification/${project.id}/`
      );
      if (
        response?.status === 200 &&
        response.data?.specification !== undefined
      ) {
        const orderReverse = response?.data?.specification;
        setSpecifications(orderReverse.reverse());
      }
    };
    if (project?.id) {
      getSelectedSpecification();
    }
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Title title={title} cssClass="" />
        {specifications.length > 0 && (
          <Button
            type="submit"
            cssClass="btn float-end btn-outline mb-2"
            label="ADD"
            handlerChange={handleClick}
          />
        )}
      </div>
      <div className="">
        <table className="table m-0">
          <tbody>
            {specifications?.length > 0 ? (
              specifications.map((val, i) => (
                <tr key={i}>
                  <td className=" py-4 bg-transparent">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="specificationName"
                      placeholder="Feature title"
                      name="title"
                      value={val.title ? val.title : ""}
                      onChange={(e) => handleChange(e, i)}
                    />
                    <textarea
                      className="form-control"
                      id="specificationDescription"
                      rows="3"
                      name="feature"
                      value={val.feature ? val.feature : ""}
                      onChange={(e) => handleChange(e, i)}
                    ></textarea>
                  </td>
                  <td className="align-top py-4 text-left bg-transparent">
                    <i
                      className="fa fa-trash-o fs-4 text-muted"
                      aria-hidden="true"
                      onClick={() => handleDelete(i)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <Button
                      type="submit"
                      cssClass="btn btn-outline mb-2"
                      label="Add A Specification"
                      handlerChange={handleClick}
                    />
                    {/* <p className="text-center text-warning fs-4 m-0">
                      "Click on button to add specifications"
                    </p> */}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
};

export default Specifications;
