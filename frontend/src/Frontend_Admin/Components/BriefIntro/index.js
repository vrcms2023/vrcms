import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import Button from "../../../Common/Button";
import Title from "../../../Common/Title";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";

export const BriefIntroAdmin = ({
  editHandler,
  componentType,
  popupTitle,
  pageType,
}) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  const formObject = {
    intro_title: "",
    subTitle: "",
    intro_desc: "",
    intro_morelink: "",
    id: "",
    pageType: pageType,
  };
  const [introFormValue, setIntroFormValues] = useState(formObject);

  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getintroValues = async () => {
      try {
        let response = await axiosServiceApi.get(
          `/carousel/updateHomeIntro/${pageType}/`
        );
        let value = updateResponseData(response.data.intro);
        setIntroFormValues(value);
      } catch (error) {
        console.log("Unable to get the intro");
      }
    };
    getintroValues();
  }, []);

  const changeHandler = (e) => {
    setErrorMessage("");
    setIntroFormValues({ ...introFormValue, [e.target.name]: e.target.value });
  };

  const updateResponseData = (data) => {
    return {
      intro_title: data.intro_title,
      subTitle: data.subTitle,
      intro_desc: data.intro_desc,
      intro_morelink: data.intro_morelink,
      id: data.id,
      pageType: pageType,
    };
  };

  const saveandUpdateIntro = async () => {
    const intro = {
      intro_title: introFormValue.intro_title,
      subTitle: introFormValue.subTitle,
      intro_desc: introFormValue.intro_desc,
      intro_morelink: introFormValue.intro_morelink,
      pageType: pageType,
      updated_by: userName,
    };

    try {
      let response = "";
      if (introFormValue.id) {
        intro.updated_by = userName;
        response = await axiosServiceApi.put(
          `/carousel/updateHomeIntro/${pageType}/`,
          {
            ...intro,
          },
          setSuccess(true)
        );
      } else {
        intro.created_by = userName;
        response = await axiosServiceApi.post(`/carousel/createHomeIntro/`, {
          ...intro,
        });
      }
      if (response.status === 200 || response.status === 201) {
        setIntroFormValues(updateResponseData(response.data.intro));
        setSuccess(true);
        closeHandler();
      }
    } catch (error) {
      toast.error("Unable to save the intro");
    }
  };

  // const resetForm = () => {
  //   setIntroFormValues(formObject)
  // }

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <hr className="m-0" />
      <div className="container my-3">
        {success ? (
          <>
            <Title
              title="Saved Successfully"
              cssClass="text-white text-center bg-success py-2"
            />
          </>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3 row">
              <label htmlFor="" className="col-sm-12 col-form-label">
                Title
              </label>
              <div className="col-sm-12">
                <input
                  name="intro_title"
                  value={
                    introFormValue.intro_title ? introFormValue.intro_title : ""
                  }
                  type="text"
                  className="form-control p-2"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="" className="col-sm-12 col-form-label">
                SubTitle
              </label>
              <div className="col-sm-12">
                <input
                  name="subTitle"
                  value={introFormValue.subTitle ? introFormValue.subTitle : ""}
                  type="text"
                  className="form-control p-2"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="" className="col-sm-12 col-form-label">
                Description
              </label>
              <div className="col-sm-12">
                <textarea
                  name="intro_desc"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="10"
                  value={
                    introFormValue.intro_desc ? introFormValue.intro_desc : ""
                  }
                  onChange={changeHandler}
                ></textarea>
              </div>
            </div>

            {/* More Link if client required. */}
            {/* <div className="mb-3 row">
              <label
                htmlFor=""
                className="col-sm-3 col-form-label text-start text-md-end"
              >
                Morelink
              </label>
              <div className="col-sm-9">
                <input
                  name="intro_morelink"
                  value={
                    introFormValue.intro_morelink
                      ? introFormValue.intro_morelink
                      : ""
                  }
                  type="text"
                  onChange={changeHandler}
                  className="form-control p-2"
                />
              </div>
            </div> */}

            <div className="d-flex justify-content-center flex-column flex-sm-row align-items-center gap-3 mt-4">
              {/* <Button
                type="submit"
                cssClass="btn btn-secondary mx-3"
                label={"clear"}
                handlerChange={resetForm}
              /> */}
              <Button
                type="submit"
                cssClass="btn btn-primary"
                label={`${introFormValue?.id ? "Update" : "Save"}`}
                handlerChange={saveandUpdateIntro}
              />
              <Button
                type="submit"
                cssClass="btn btn-more"
                label={"Close"}
                handlerChange={closeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BriefIntroAdmin;
