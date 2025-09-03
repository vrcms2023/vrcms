import React, { useEffect, useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Error from "../Error";
import { InputFields } from "./FormFields";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fieldValidation } from "../../../util/validationUtil";

export default function CounterForm({
  editHandler,
  componentType,
  componentTitle = "Form ",
  componentState = false,
  formPostURL,
  formUpdateURL,
  getDataAPIURL,
}) {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState("");
  const [counterData, setCounterData] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      counters: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "counters",
  });
  const counters = watch("counters");

  const saveForm = async (data) => {
    const title = data.title;

    const payload = { title, counters };
    let response = "";

    try {
      if (data?.id) {
        response = await axiosServiceApi.put(`${formUpdateURL}${data.id}/`, payload);
      } else {
        response = await axiosServiceApi.post(formPostURL, payload);
      }

      closeHandler();
    } catch (e) {
      toast.error(e[0]);
    }
  };

  useEffect(() => {
    const getCounterData = async () => {
      try {
        const response = await axiosClientServiceApi.get(getDataAPIURL);
        if (response?.status === 200) {
          let data = response?.data[0];
          reset(data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (componentState) {
      getCounterData();
    }
  }, [componentState, getDataAPIURL]);

  const handleChange = (fieldName) => {
    clearErrors(fieldName);
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentTitle} />
      {/* <hr /> */}
      <div className="container mt-3 p-0">
        <div className="row">
          <div className="col-md-12">
            {error && <div className="fw-bold">{error && <Error>{error}</Error>}</div>}
            <form onSubmit={handleSubmit(saveForm)}>
              <div>
                <InputFields
                  label={"Title"}
                  type={"text"}
                  fieldName={"title"}
                  register={register}
                  isRequired={true}
                  validationObject={fieldValidation.title}
                  error={errors?.title?.message}
                  onChange={() => handleChange("title")}
                />

                {counters.length < 5 && (
                  <div className="text-end d-flex justify-content-end mt-3">
                    <Link
                      className="btn btn-primary"
                      onClick={() => append({ label: "", counter: 0, specialChar: "" })}
                    >
                      Add{" "}
                    </Link>
                  </div>
                )}

                {/* Counter objects */}
                {fields.map((item, index) => (
                  <div key={index} className="row mt-2">
                    <div className="col-md-7">
                      <InputFields
                        key={index}
                        label={"Text"}
                        type={"text"}
                        isRequired={true}
                        error={errors?.counters?.[index]?.label?.message}
                        fieldName={`counters.${index}.label`}
                        register={register}
                        validationObject={fieldValidation.counters_title}
                        onChange={() => handleChange(`counters.${index}.label`)}
                      />
                    </div>
                    <div className="col-md-2">
                      <InputFields
                        key={index}
                        label={"Number"}
                        type={"number"}
                        isRequired={true}
                        error={errors?.counters?.[index]?.counter?.message}
                        fieldName={`counters.${index}.counter`}
                        register={register}
                        onChange={() => handleChange(`counters.${index}.counter`)}
                        validationObject={fieldValidation.counters_number}
                      />
                    </div>
                    <div className="col-md-2">
                      <InputFields
                        key={index}
                        label={"Symbol"}
                        type={"text"}
                        fieldName={`counters.${index}.symbol`}
                        register={register}
                      />
                    </div>

                    <div className="col-md-1 d-flex justify-content-center align-items-end">
                      <Link to="" className="" onClick={() => remove(index)}>
                        <i
                          className="fa fa-trash-o fs-5 text-danger"
                          aria-hidden="true"
                          title="Delete"
                        ></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-4">
                <Button
                  type="button"
                  cssClass="btn btn-sm btn-outline"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
                <button className="btn btn-primary">save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
