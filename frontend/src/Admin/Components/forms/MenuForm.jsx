import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { toast } from "react-toastify";
// Comonents
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { InputFields, SelectField } from "./FormFields";
import Error from "../Error";
import { generateOptionLength } from "../../../util/commonUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";

const MenuForm = ({ editHandler, menuList, editMenu, componentType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return editMenu;
    }, [editMenu]),
  });
  const [error, setError] = useState(false);
  const [isParentVal, setisParentVal] = useState(
    editMenu ? (editMenu?.is_Parent ? true : false) : true,
  );
  const [isActiveMenu, setisActiveMenu] = useState(
    editMenu ? (editMenu?.page_isActive ? true : false) : true,
  );

  const [isAdminmenuActive, setisAdminmenuActive] = useState(
    editMenu ? (editMenu?.is_Admin_menu ? true : false) : true,
  );

  const [isClientMenuActive, setIsClientMenuActive] = useState(
    editMenu ? (editMenu?.is_Client_menu ? true : false) : true,
  );
  const [optionMenulist, setOptionMenuList] = useState([]);
  const [menuIndexValues, setMenuIndexValues] = useState(
    generateOptionLength(15),
  );

  const updateMenuIndexValues = (menuOptinList) => {
    menuOptinList.forEach((item) => {
      var i = 0;
      while (i < menuIndexValues.length) {
        if (menuIndexValues[i].value === item.page_position) {
          menuIndexValues.splice(i, 1);
        } else {
          i++;
        }
      }
    });
    setMenuIndexValues(menuIndexValues);
  };

  useEffect(() => {
    let menuOptinList = [];
    if (menuList.length > 0) {
      menuList.forEach((element) => {
        let option = {
          label: element.page_label,
          value: element.id,
          page_position: element.page_position,
        };
        menuOptinList.push(option);
      });
      setOptionMenuList(menuOptinList);
      updateMenuIndexValues(menuOptinList);
    }
  }, [menuList]);

  useEffect(() => {
    reset(editMenu);
    if (editMenu?.id) {
      updatedSelectedMenuIndex();
    }
  }, [editMenu]);

  const updatedSelectedMenuIndex = () => {
    let option = {
      label: editMenu?.page_position,
      value: editMenu?.page_position,
    };
    const menuData = [option].concat(menuIndexValues);
    setMenuIndexValues(menuData);
  };

  const saveMenu = async (data) => {
    if (!data?.page_label) {
      setError("Please enter menu label");
      return true;
    }
    if (!data?.page_url?.startsWith("/", 0)) {
      setError("Menu url should be starting with /");
      return true;
    }
    if (parseInt(data?.page_position) === 0 && data.is_Parent) {
      setError("Please select the menu position");
      return true;
    }

    if (!data.is_Parent) {
      if (parseInt(data?.page_parent_ID) === 0) {
        setError("Please select parent menu");
        return true;
      }
      const getSelectedParentObject = _.filter(menuList, (item) => {
        return item.id === data.page_parent_ID;
      })[0];
      const page_position =
        getSelectedParentObject?.childMenu?.length > 0
          ? parseInt(getSelectedParentObject.page_position) * 10 +
            getSelectedParentObject.childMenu.length +
            1
          : parseInt(getSelectedParentObject.page_position) * 10 + 1;
      data["page_position"] = page_position;
    }
    if (data?.id) {
      data["updated_by"] = getCookie("userName");
    } else {
      data["created_by"] = getCookie("userName");
    }

    const body = JSON.stringify(data);
    try {
      let response = "";
      if (data?.id) {
        response = await axiosServiceApi.patch(
          `/pageMenu/updatePageMenu/${data?.id}/`,
          body,
        );
      } else {
        response = await axiosServiceApi.post(
          `/pageMenu/createPageMenu/`,
          body,
        );
      }
      if (
        (response?.status === 201 || response?.status === 200) &&
        response?.data?.PageDetails
      ) {
        closeHandler();
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  // const clearField = () => {
  //   reset();
  // };

  const isParentHandler = () => {
    setisParentVal(!isParentVal);
  };

  const isActiveMenuHandler = () => {
    setisActiveMenu(!isActiveMenu);
  };

  const isAdminMenuHandler = () => {
    setisAdminmenuActive(!isAdminmenuActive);
  };

  const isClientMenuHandler = () => {
    setIsClientMenuActive(!isClientMenuActive);
  };

  const onChangeHanlder = () => {
    setError("");
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
            {error ? (
              <p className="fw-bold">{error && <Error>{error}</Error>}</p>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit(saveMenu)}>
              <InputFields
                key={0}
                label={"Menu Lable"}
                type={"text"}
                fieldName={"page_label"}
                register={register}
                onChange={onChangeHanlder}
              />
              <InputFields
                key={1}
                label={"Menu URL"}
                type={"text"}
                fieldName={"page_url"}
                register={register}
                onChange={onChangeHanlder}
              />
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
                >
                  is Parent Menu
                </label>
                <div className="col-sm-1">
                  <input
                    name="is_Parent"
                    type="checkbox"
                    {...register("is_Parent")}
                    onChange={isParentHandler}
                    checked={isParentVal}
                    className="form-check-input mr-4"
                  />
                </div>
                <div className="col-sm-8">{isParentVal ? "YES" : "NO"}</div>
              </div>
              {!isParentVal ? (
                <SelectField
                  label="Parent Menu list"
                  fieldName="page_parent_ID"
                  register={register}
                  options={optionMenulist}
                />
              ) : (
                ""
              )}
              {isParentVal ? (
                <SelectField
                  label={"Menu Position"}
                  fieldName={"page_position"}
                  register={register}
                  options={menuIndexValues}
                />
              ) : (
                ""
              )}

              <div className="mb-3 row">
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
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
                >
                  is Admin Menu
                </label>
                <div className="col-sm-9">
                  <input
                    name="is_Admin_menu"
                    type="checkbox"
                    {...register("is_Admin_menu")}
                    onChange={isAdminMenuHandler}
                    checked={isAdminmenuActive}
                    className="form-check-input mr-4"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
                >
                  is Client Menu
                </label>
                <div className="col-sm-9">
                  <input
                    name="is_Client_menu"
                    type="checkbox"
                    {...register("is_Client_menu")}
                    onChange={isClientMenuHandler}
                    checked={isClientMenuActive}
                    className="form-check-input mr-4"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-1 gap-md-3 mt-5">
                <button className="btn btn-secondary mx-3">save</button>
                <Button
                  type="submit"
                  cssClass="btn border"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuForm;
