import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { TextAreaField, RichTextInputEditor } from "../forms/FormFields";
import RichTextEditor from "../../../Frontend/Components/RichTextEditor";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";

const AdminTermsAndPrivacy = ({
  editHandler,
  componentType,
  termsAndConditionData,
  type,
}) => {
  const [userName, setUserName] = useState("");
  const { register, reset, handleSubmit } = useForm();
  const [termEditorState, setTermEditorState] = useState("");
  const [policyEditorState, setPolicyEditorState] = useState("");

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  /**
   * Save Footer values
   */
  const onSubmitHandler = async () => {
    let response = "";
    let data = {
      terms_condition: termEditorState,
      privacy_policy: policyEditorState,
    };
    try {
      if (termsAndConditionData?.id) {
        data["updated_by"] = userName;
        data["id"] = termsAndConditionData.id;
        response = await axiosServiceApi.put(
          `/footer/updateTermsAndCondition/${data.id}/`,
          data,
        );
      } else {
        data["created_by"] = userName;
        data["updated_by"] = userName;
        response = await axiosServiceApi.post(
          `/footer/createTermsAndCondition/`,
          data,
        );
      }

      if (response.status == 201 || response.status == 200) {
        toast.success(`Footer Values are updated successfully `);
        closeHandler();
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  const resetForm = () => {};

  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentType}
        type={type}
      />

      <div className="container">
        <div className="row">
          <div className="col-md-6 bg-light">
            <RichTextInputEditor
              label={"Terms And Conditions"}
              editorSetState={setTermEditorState}
              initialText={
                termsAndConditionData?.terms_condition
                  ? termsAndConditionData?.terms_condition
                  : ""
              }
            />
          </div>

          <div className="col-md-6 bg-light  border-start border-3">
            <RichTextInputEditor
              label={"Privacy Policy"}
              editorSetState={setPolicyEditorState}
              initialText={
                termsAndConditionData?.privacy_policy
                  ? termsAndConditionData?.privacy_policy
                  : ""
              }
            />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2 my-5">
            {/* <button onClick={resetForm} type="reset" className="btn btn-secondary mx-3">
                  Clear
                </button> */}
            <button
              onClick={onSubmitHandler}
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
            <Button
              type="submit"
              cssClass="btn btn-more"
              label={"Close"}
              handlerChange={closeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTermsAndPrivacy;
