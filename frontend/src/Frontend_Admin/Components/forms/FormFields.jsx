import React from "react";
import RichTextEditor from "../../../Frontend_Views/Components/RichTextEditor";

export const InputFields = ({
  label,
  type = "text",
  fieldName,
  register,
  value,
  onChange,
  error,
  validationObject,
  ...rest
}) => {
  switch (type) {
    case "text":
      return (
        <div className="mb-2 row">
          <label
            htmlFor=""
            className="col-sm-12 col-form-label text-capitalize"
          >
            {label}
          </label>
          <div className="col-sm-12">
            <input
              {...register(fieldName, validationObject)}
              value={value}
              type={type}
              id={rest?.id}
              onChange={onChange}
              className="form-control p-2"
            />
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "dropdown":
      return (
        <div className="mb-2 row">
          <label
            htmlFor=""
            className="col-sm-12 col-form-label text-capitalize"
          >
            {label}
          </label>
          <div className="col-sm-12">
            <select
              className="custom-select custom-select-lg form-control p-2"
              {...register(fieldName, validationObject)}
            >
              <option selected>Choose...</option>
              {rest.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="mb-2 row">
          <label htmlFor="" className="col-sm-12 col-form-label">
            {label}
          </label>
          <div className="col-sm-12">
            <textarea
              className="form-control"
              {...register(fieldName, validationObject)}
              value={value}
              rows="3"
              onChange={onChange}
            ></textarea>
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div className=" mt-3">
          <div className="col-sm-12 form-check">
            <input
              {...register(fieldName, validationObject)}
              onChange={onChange}
              checked={value}
              defaultChecked={rest.defaultChecked}
              type={type}
              className="form-check-input"
            />
            <label
              htmlFor=""
              className="form-check-label ms-2 pt-0 col-form-label text-start text-md-end text-capitalize"
            >
              {label}
            </label>
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "file":
      return (
        <div className="mb-2 row">
          <label
            htmlFor=""
            className="col-sm-12 col-form-label text-capitalize"
          >
            {label}
          </label>
          <div className="col-sm-12">
            <input
              {...register(fieldName, validationObject)}
              value={value}
              type={type}
              onChange={onChange}
              accept={rest.accept}
              className="form-control p-2"
            />

            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "hidden":
      return (
        <div className="mb-2 row">
          <input
            {...register(fieldName)}
            type={type}
            defaultValue={value}
            className="form-control p-2"
          />
        </div>
      );
    default:
      return null;
  }
};

export const RichTextInputEditor = ({ label, editorSetState, initialText }) => {
  return (
    <div className="mb-2 row">
      {/* <label
        htmlFor=""
        className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
      >
        {label}
      </label> */}
      <div className="col-sm-12">
        <p className="fs-6 pt-3 py-md-0">{label}</p>
        <RichTextEditor
          initialText={initialText ? initialText : ""}
          RichEditorState={editorSetState}
        />
      </div>
    </div>
  );
};

export const InputField = ({
  label,
  type = "text",
  fieldName,
  register,
  cssClass,
  validationObject,
  error,
  isRequired,
}) => {
  return (
    <div className="mb-2 row">
      <label
        htmlFor=""
        className={`col-sm-12 col-form-label text-capitalize ${
          cssClass ? cssClass : ""
        }`}
      >
        {label} {isRequired && <span className="error">*</span>}
      </label>
      <div className="col-sm-12">
        <input
          {...register(fieldName, validationObject)}
          type={type}
          className="form-control p-2"
        />

        <span className="error">{error}</span>
      </div>
    </div>
  );
};

export const SelectField = ({
  label,
  fieldName,
  register,
  options,
  ...rest
}) => {
  return (
    <div className="mb-2 row">
      <label
        htmlFor=""
        className="col-sm-12 col-form-label text-start text-capitalize"
      >
        {label}
      </label>
      <div className="col-sm-12">
        <select
          defaultValue={rest?.value}
          className="custom-select custom-select-lg form-control p-2"
          {...register(fieldName)}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              selected={option.value === rest?.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TextAreaField = ({
  label,
  fieldName,
  register,
  validationObject,
  error,
}) => {
  return (
    <div className="mb-2 row">
      <label htmlFor="" className="col-sm-12 col-form-label text-start">
        {label}
      </label>
      <div className="col-sm-12">
        <textarea
          className="form-control"
          {...register(fieldName, validationObject)}
          rows="3"
        ></textarea>
        <span className="error">{error}</span>
      </div>
    </div>
  );
};

export const CheckboxField = ({
  label,
  fieldName,
  register,
  validationObject,
  error,
  ...rest
}) => {
  return (
    <div className="mb-2 row">
      <div className="form-check">
        <input
          name={fieldName}
          type="checkbox"
          {...register(fieldName, validationObject)}
          onChange={rest.onChange}
          checked={rest.isChecked}
          className="form-check-input mr-4"
        />
        <label
          className="form-check-label col-form-label text-start text-md-end text-capitalize"
          htmlFor="flexCheckDefault"
        >
          {label}
        </label>
      </div>

      {/* <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
                >
                  Active Menu
                </label>
                <div className="col-sm-9">
                  <input
                    name="page_isActive"
                    type="checkbox"
                    {...register("page_isActive")}
                    onChange={isActiveMenuHandler}
                    checked={isActiveMenu}
                    className="form-check-input mr-4"
                  />
                </div>
              </div> */}
    </div>
  );
};
