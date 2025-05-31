import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
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
import { useDispatch } from "react-redux";
import { getMenuPosition, updatedMenu } from "../../../util/menuUtil";
import SEOForm from "./SEOForm";

const MenuForm = ({
  editHandler,
  menuList,
  editMenu,
  componentType,
  popupTitle,
}) => {
  const dispatch = useDispatch();
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

    if (!data?.id) {
      if (!data?.is_Parent) {
        if (parseInt(data?.page_parent_ID) === 0) {
          setError("Please select parent menu");
          return true;
        }
        const getSelectedParentObject = _.filter(menuList, (item) => {
          return item.id === data.page_parent_ID;
        })[0];
        const _url = data["page_url"].split("/");
        if (_url.length > 0) {
          data["page_url"] =
            getSelectedParentObject?.page_url + "/" + _url[_url.length - 1];
        }
      } else {
        data["page_position"] = menuList?.length > 0 ? menuList?.length + 1 : 1;
      }
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
        closeHandler();
        dispatch(getMenu());
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  const isParentHandler = () => {
    setisParentVal(!isParentVal);
  };

  const isMaintainerHandler = () => {
    setisMaintainermenuActive(!isMaintainerMenuActive);
  };

  const isClientMenuHandler = () => {
    setIsClientMenuActive(!isClientMenuActive);
  };

  const onChangeHanlder = () => {
    setError("");
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <hr className="my-2" />
      <div className="container">
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
                  <hr className="mt-4" />
                  <h5 className="mt-4">SEO</h5>
                </>
              )}
              {!isParentHasChilds && (
                <div
                  className="p-4 py-1 pb-3 seoform"
                  style={{ backgroundColor: "rgba(255, 255, 255, .4)" }}
                >
                  <SEOForm
                    register={register}
                    onChangeHanlder={onChangeHanlder}
                  />
                </div>
              )}
              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 mt-3">
                <Button
                  type="submit"
                  cssClass="btn btn-outline"
                  label={"Close"}
                  handlerChange={closeHandler}
                />
                <button className="btn btn-primary mx-3">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuForm;
