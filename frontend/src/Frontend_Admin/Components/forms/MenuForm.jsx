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

    if (!data?.is_Parent) {
      if (parseInt(data?.page_parent_ID) === 0) {
        setError("Please select parent menu");
        return true;
      }
      const getSelectedParentObject = _.filter(menuList, (item) => {
        return item.id === data.page_parent_ID;
      })[0];
      data["page_url"] =
        getSelectedParentObject?.page_url +
        data["page_url"].replace(/^\/admin/, "");
      data["page_position"] = getMenuPosition(getSelectedParentObject);
    } else {
      data["page_position"] = menuList?.length > 0 ? menuList?.length + 1 : 1;
    }
    if (data?.id) {
      data["updated_by"] = getCookie("userName");
    } else {
      data["created_by"] = getCookie("userName");
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
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
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
              <br />
              <CheckboxField
                label="is Parent Menu"
                fieldName={"is_Parent"}
                register={register}
                onChange={isParentHandler}
                isChecked={isParentVal}
              />

              <CheckboxField
                label="is Maintainer Menu"
                fieldName={"is_Maintainer_menu"}
                register={register}
                onChange={isMaintainerHandler}
                isChecked={isMaintainerMenuActive}
              />
              <CheckboxField
                label="is Client Menu"
                fieldName={"is_Client_menu"}
                register={register}
                onChange={isClientMenuHandler}
                isChecked={isClientMenuActive}
              />
              {!isParentVal && (
                <SelectField
                  label="Parent Menu list"
                  fieldName="page_parent_ID"
                  register={register}
                  options={optionMenulist}
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

              <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-1 gap-md-3 mt-5">
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
