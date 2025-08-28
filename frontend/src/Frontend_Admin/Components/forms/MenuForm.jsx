import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";
import { toast } from "react-toastify";
// Comonents
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { CheckboxField, InputFields, SelectField } from "./FormFields";
import Error from "../Error";
import { generateOptionLength } from "../../../util/commonUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";
import { getMenu } from "../../../redux/auth/authActions";

import { createServiceChildFromMenu, updatedMenu, updateServiceMmenuID } from "../../../util/menuUtil";
import SEOForm from "./SEOForm";
import { getServiceValues } from "../../../redux/services/serviceActions";
import Title from "../../../Common/Title";

const MenuForm = ({ editHandler, menuList, editMenu, componentType, popupTitle, selectedServiceMenu, rootServiceMenu }) => {
  const dispatch = useDispatch();
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return editMenu;
    }, [editMenu]),
  });
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);

  const [seoLink, setSEOLink] = useState("");
  const [seoAuthor, setSeoAuthor] = useState("");

  const pageUrlValue = watch("page_url");

  const [isParentVal, setisParentVal] = useState(
    editMenu ? (editMenu?.is_Parent ? true : false) : true
  );

  const [isMaintainerMenuActive, setisMaintainermenuActive] = useState(
    editMenu ? (editMenu?.is_Admin_menu ? true : false) : true
  );

  const [isClientMenuActive, setIsClientMenuActive] = useState(
    editMenu ? (editMenu?.is_Client_menu ? true : false) : true
  );
  const [optionMenulist, setOptionMenuList] = useState([]);
  const [menuIndexValues, setMenuIndexValues] = useState(
    generateOptionLength(15)
  );

  const [isParentHasChilds, setIsParentHasChilds] = useState(
    editMenu?.childMenu?.length > 0 ? true : false
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
    if (editMenu) {
      const seolink = `${window.location.origin}${editMenu.page_url}`;
      setSEOLink(seolink);
      setSeoAuthor(window.location.origin);
    }
  }, [editMenu]);

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
      //updateMenuIndexValues(menuOptinList);
    }
  }, [menuList]);
  /**
   * menu index values
   */
  // useEffect(() => {
  //   reset(editMenu);
  //   if (editMenu?.id) {
  //     updatedSelectedMenuIndex();
  //   }
  // }, [editMenu]);

  // const updatedSelectedMenuIndex = () => {
  //   let option = {
  //     label: editMenu?.page_position,
  //     value: editMenu?.page_position,
  //   };
  //   const menuData = [option].concat(menuIndexValues);
  //   setMenuIndexValues(menuData);
  // };

  const saveMenu = async (data) => {
    if (!data?.page_label) {
      setError("Please enter menu label");
      return true;
    }
    if (!data?.page_url?.startsWith("/", 0)) {
      setError("Menu url should be starting with /");
      return true;
    }
    if (!data?.id && isParentVal) {
      data["page_parent_ID"] = "";
    }
    if (data.id === data.page_parent_ID) {
      setError(`Same menu item selected as a parent`);
      return true;
    }

    if (data.page_parent_ID) {
      const getSelectedParentObject = _.filter(menuList, (item) => {
        return item.id === data.page_parent_ID;
      })[0];
      if (getSelectedParentObject.page_url === "/services") {
        const _url = data["page_url"].split("/");

        data["page_url"] =
          getSelectedParentObject?.page_url + "/" + _url[_url.length - 1];
      }

      if (!data?.id) {
        const parentPosition = getSelectedParentObject.childMenu?.length
          ? getSelectedParentObject.childMenu.length
          : 1;
        data["page_position"] =
          getSelectedParentObject.page_position * 10 + parentPosition;
      }
    } else if (!data.page_parent_ID && !data?.id) {
      data["page_position"] = menuList?.length > 0 ? menuList?.length + 1 : 1;
    }
    //data["page_position"] = menuList?.length > 0 ? menuList?.length + 1 : 1;
    // const _url = data["page_url"].split("/");

    // data["page_url"] = "/" + _url[_url.length - 1];

    if (!data?.is_Parent) {
      if (!data?.page_parent_ID || parseInt(data?.page_parent_ID) === 0) {
        setError("Please select parent menu");
        return true;
      }
    }
    if (!data?.id) {
      data["created_by"] = getCookie("userName");
    } else {
      data["updated_by"] = getCookie("userName");
    }

    data["page_isActive"] = true;
    data["is_Admin_menu"] = true;

    const body = JSON.stringify(data);

    try {
      let response = await updatedMenu(data);
      if (
        (response?.status === 201 || response?.status === 200) &&
        response?.data?.PageDetails
      ) {
        if (!data.is_Parent && data.page_parent_ID === rootServiceMenu.id) {
          updateServicePageMenu(
            selectedServiceMenu,
            response?.data?.PageDetails
          );
        }
        closeHandler();
        dispatch(getMenu());
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  const updateServicePageMenu = async (selectedServiceMenu, PageDetails) => {
    try {
      const response = await createServiceChildFromMenu(
        selectedServiceMenu,
        PageDetails
      );
      if (response?.status === 201) {
        const res = await updateServiceMmenuID(
          response.data.services,
          PageDetails
        );
      }
      if (response?.status === 201 || response?.status === 200) {
        toast.success(`$service is created `);
        dispatch(getServiceValues());
        dispatch(getMenu());
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  const isParentHandler = () => {
    setisParentVal(!isParentVal);
    setError("");
  };

  const isMaintainerHandler = () => {
    setisMaintainermenuActive(!isMaintainerMenuActive);
    setError("");
  };

  const isClientMenuHandler = () => {
    setIsClientMenuActive(!isClientMenuActive);
    setError("");
  };

  const onChangeHanlder = () => {
    setError("");
  };

  const handleToggleSeoForm = () => {
    setShow(!show);
  }

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      {/* <hr className="my-2" /> */}
      <div className="container mt-2 p-0">
        <div className="row py-0 pb-md-5">
          <div className="col-md-12 mb-5 mb-md-0">
            {error && (
              <div className="fw-bold">{error && <Error>{error}</Error>}</div>
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

              <div className={!isParentHasChilds ? "d-flex" : ""}>
                <CheckboxField
                  label="Parent"
                  fieldName={"is_Parent"}
                  register={register}
                  onChange={isParentHandler}
                  isChecked={isParentVal}
                />

                <CheckboxField
                  label="Maintainer"
                  fieldName={"is_Maintainer_menu"}
                  register={register}
                  onChange={isMaintainerHandler}
                  isChecked={isMaintainerMenuActive}
                />
                <CheckboxField
                  label="Client"
                  fieldName={"is_Client_menu"}
                  register={register}
                  onChange={isClientMenuHandler}
                  isChecked={isClientMenuActive}
                />
              </div>
              {!isParentVal && (
                <SelectField
                  label="Parent Menu list"
                  fieldName="page_parent_ID"
                  register={register}
                  options={optionMenulist}
                  value={editMenu?.page_parent_ID}
                />
              )}
              {/* {isParentVal ? (
                <SelectField
                  label={"Menu Position"}
                  fieldName={"page_position"}
                  register={register}
                  options={menuIndexValues}
                />
              ) : (
                ""
              )} */}
              {!isParentHasChilds && (
                <>
                <hr className="mt-4 border-secondary" />
               
                <div className="d-flex justify-content-between align-items-center">
                  
                  <h5 className="m-0">SEO</h5>
                   <span onClick={() =>handleToggleSeoForm()} style={{cursor: "pointer"}} className={`px-2  ${show ? "text-dark border-light" : "text-dark border-light"}`}>
                    <small>
                      <i className={`fa me-1 ${show ? "fa-chevron-up text-dark" : "fa-chevron-down text-dark"}`} aria-hidden="true"></i> 
                      {show ? "CLOSE" : "OPEN" }</small>
                  </span>
                </div>
                </>
              )}
              {!isParentHasChilds && show && (
                <div
                  className="p-4 py-1 pb-3 seoform"
                  style={{ backgroundColor: "rgba(255, 255, 255, .4)" }}
                >
                  <SEOForm
                    register={register}
                    onChangeHanlder={onChangeHanlder}
                    Controller={Controller}
                    control={control}
                    seoLink={seoLink}
                    seoAuthor={seoAuthor}
                    setValue={setValue}
                  />
                  
                </div>
              )}
              {!show && <hr className="my-1 border-secondary" />}
              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-2 mt-3">
                <Button type="submit" cssClass="btn btn-outline" label={"Close"} handlerChange={closeHandler} />
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuForm;
