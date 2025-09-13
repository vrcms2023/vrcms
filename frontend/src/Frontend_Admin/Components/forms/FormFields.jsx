import React from "react";
import { useState } from "react";
import RichTextEditor from "../../../Frontend_Views/Components/RichTextEditor";
import RichTextEditor_V2 from "../../../Frontend_Views/Components/RichTextEditor_v2";

export const InputFields = ({
  label,
  type = "text",
  fieldName,
  register,
  isRequired = false,
  value,
  onChange,
  error,
  validationObject,
  ...rest
}) => {
  switch (type) {
    case "text":
      return (
        <div className="mb-1 row">
          <label htmlFor="" className="col-sm-12 col-form-label text-capitalize text-start">
            <small className="">
              {label}
              {isRequired && <span className="error">&nbsp; *</span>}
            </small>
          </label>
          <div className="col-sm-12">
            <input
              {...register(fieldName, validationObject)}
              value={value}
              type={type}
              id={rest?.id}
              onChange={onChange}
              disabled={rest.disabled}
              className="form-control p-2"
            />
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "password":
      const [show, setShow] = useState(false);
      return (
        <div className="mb-1 row">
          <label htmlFor="" className="col-sm-12 col-form-label text-capitalize text-start">
            <small className="">
              {label}
              {isRequired && <span className="error">&nbsp; *</span>}
            </small>
          </label>
          <div className="col-sm-12">
            <div className="position-relative">
              <input
                {...register(fieldName, validationObject)}
                value={value}
                type={show ? "text" : "password"}
                id={rest?.id}
                onChange={onChange}
                disabled={rest.disabled}
                className="form-control p-2"
              />
              <i
                className={`fa ${show ? "fa-eye" : "fa-eye-slash"} position-absolute`}
                onClick={() => setShow(!show)}
                style={{
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#6c757d",
                }}
              ></i>
            </div>
            <span className="error">{error}</span>
            {/* <small className="text-muted">Passwords must be at least 6 characters.</small> */}
          </div>
        </div>
      );
    case "number":
      return (
        <div className="mb-1 row">
          <label htmlFor="" className="col-sm-12 col-form-label text-capitalize text-start">
            <small className="">{label}</small>
            {isRequired && <span className="error">&nbsp; *</span>}
          </label>
          <div className="col-sm-12">
            <input
              {...register(fieldName, validationObject)}
              value={value}
              type={type}
              id={rest?.id}
              onChange={onChange}
              disabled={rest.disabled}
              className="form-control p-2"
              {...rest}
            />
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "dropdown":
      return (
        <div className="mb-2 row">
          <label htmlFor="" className="col-sm-12 col-form-label text-capitalize">
            <small>{label}</small>
            {isRequired && <span className="error">&nbsp; *</span>}
          </label>
          <div className="col-sm-12">
            <select
              className="custom-select custom-select-lg form-control p-2"
              {...register(fieldName, validationObject)}
              onChange={onChange}
            >
              {rest.options.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  id={rest?.id}
                  defaultValue={rest?.selectedValue}
                  selected={option.value === rest?.selectedValue}
                  {...rest}
                >
                  {option.label}
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
            <small>{label}</small>
            {isRequired && <span className="error">&nbsp; *</span>}
          </label>
          <div className="col-sm-12">
            <textarea
              className="form-control"
              {...register(fieldName, validationObject)}
              value={value}
              rows="3"
              onChange={onChange}
              {...rest}
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
              {...rest}
            />
            <label
              htmlFor=""
              className="form-check-label ms-2 pt-0 col-form-label text-start text-md-end text-capitalize"
            >
              <small>{label}</small>
              {isRequired && <span className="error">&nbsp; *</span>}
            </label>
            <span className="error">{error}</span>
          </div>
        </div>
      );
    case "file":
      const buildValidation = () => {
        const rules = {};
        const validate = {};

        validationObject?.forEach((rule) => {
          const { type: ruleType, message } = rule;

          if (ruleType === "required") {
            rules.required = message || "This field is required";
          }

          if (ruleType === "maxSize" && rest.maxSize) {
            validate.fileSize = (files) => {
              const file = files?.[0];
              return (
                (file && file.size <= rest.maxSize) ||
                message ||
                `Max file size: ${rest.maxSize / (1024 * 1024)}MB`
              );
            };
          }

          if (ruleType === "allowedTypes" && rest.allowedTypes) {
            validate.fileType = (files) => {
              const file = files?.[0];
              return (
                (file && rest.allowedTypes.includes(file.type)) || message || "Invalid file type"
              );
            };
          }
        });

        if (Object.keys(validate).length > 0) {
          rules.validate = validate;
        }

        return rules;
      };
      const validationRules = buildValidation();
      return (
        <div className="mb-2 row">
          <label htmlFor="" className="col-sm-12 col-form-label text-capitalize">
            <small>{label}</small>
            {isRequired && <span className="error">&nbsp; *</span>}
          </label>
          <div className="col-sm-12">
            <input
              {...register(fieldName, validationRules)}
              value={value}
              type={type}
              onChange={onChange}
              accept={rest.accept}
              className="form-control p-2"
              {...rest}
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
            value={value}
            type={type}
            id={rest?.id}
            onChange={onChange}
            disabled={rest.disabled}
            className="form-control p-2"
            {...rest}
          />
        </div>
      );
    default:
      return null;
  }
};

export const RichTextInputEditor = ({ label, editorSetState, initialText, isRequired = false }) => {
  return (
    <div className="mb-2 row">
      <div className="col-sm-12">
        <p className="fs-6 pt-3 py-md-0">
          <small>{label}</small>
          {isRequired && <span className="error">&nbsp; *</span>}
        </p>
        <RichTextEditor
          initialText={initialText ? initialText : ""}
          RichEditorState={editorSetState}
        />
      </div>
    </div>
  );
};

export const RichTextInputEditor_V2 = ({ label, Controller, name, control }) => {
  return (
    <div className="mb-2 row">
      <div className="col-sm-12">
        <p className="fs-6 pt-3 py-md-0">
          <small>{label}</small>
        </p>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RichTextEditor_V2 field={field} onChange={field.onChange} value={field.value} />
          )}
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
        className={`col-sm-12 col-form-label text-capitalize ${cssClass ? cssClass : ""}`}
      >
        <small>{label} </small>
        {/* {isRequired && <span className="error">*</span>} */}
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

export const SelectField = ({ label, fieldName, register, options, ...rest }) => {
  return (
    <div className="mb-2 row">
      <label htmlFor="" className="col-sm-12 col-form-label text-start text-capitalize">
        <small>{label}</small>
      </label>
      <div className="col-sm-12">
        <select
          defaultValue={rest?.value}
          className="custom-select custom-select-lg form-control p-2"
          {...register(fieldName)}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} selected={option.value === rest?.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TextAreaField = ({ label, fieldName, register, validationObject, error }) => {
  return (
    <div className="mb-2 row">
      <label htmlFor="" className="col-sm-12 col-form-label text-start">
        <small>{label}</small>
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

export const CheckboxField = ({ label, fieldName, register, validationObject, error, ...rest }) => {
  return (
    <div className="mb-2 row">
      <div className="form-check d-flex align-items-center">
        <input
          name={fieldName}
          type="checkbox"
          {...register(fieldName, validationObject)}
          onChange={rest.onChange}
          checked={rest.isChecked}
          className="form-check-input mx-1 rounded-1"
        />
        <label
          className="form-check-label col-form-label text-start text-md-end text-capitalize"
          htmlFor="flexCheckDefault"
        >
          <small>{label}</small>
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
