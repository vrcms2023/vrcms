import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { useSelector } from "react-redux";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import EditIcon from "../../../Common/AdminEditIcon";
import ModelBg from "../../../Common/ModelBg";
import MenuForm from "../../Components/forms/MenuForm";
import { getMenuObject } from "../../../util/commonUtil";
import { showContentPerRole } from "../../../util/permissions";

const PagesConfiguration = () => {
  const editComponentObj = {
    menu: false,
  };
  const [pagesDetails, setPagesDetails] = useState([]);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [editMenu, setEditMenu] = useState({});
  const { userInfo } = useSelector((state) => state.auth);

  const editHandler = (name, value, item) => {
    setEditMenu(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  /**
   * get User details
   */
  const getAllPagesDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/pageMenu/createPageMenu/`);
      if (response?.status === 200 && response?.data?.PageDetails?.length > 0) {
        const result = getMenuObject(response.data.PageDetails);
        setPagesDetails(result);
      } else {
        setPagesDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };
  useEffect(() => {
    if (!componentEdit.menu) {
      getAllPagesDetails();
    }
  }, [componentEdit.menu]);

  const handleUserDelete = (menu) => {
    const id = menu.id;
    const title = menu.page_label;
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/pageMenu/updatePageMenu/${id}/`,
      );
      if (response.status === 204) {
        toast.success(`${title} Memu is delete successfully `);
        getAllPagesDetails();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteMenuItemByID}
            message={`you want to delete the ${title} Menu`}
          />
        );
      },
    });
  };

  /**
   * Menu active and deactive
   * @param {*} menu
   */
  const activeUserMenu = async (id, data, name) => {
    data[name] = !data[name];
    try {
      const response = await axiosServiceApi.patch(
        `/pageMenu/updatePageMenu/${id}/`,
        data,
      );

      if (response.status === 200) {
        getAllPagesDetails();
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  const childContent = (page, isChild) => {
    return (
      <React.Fragment key={page.id}>
        {showContentPerRole(userInfo, page.is_Admin_menu) && (
          <tr key={page.id}>
            <td className="p-2">{page.page_label}</td>
            <td>{page.page_url}</td>
            <td>{page.is_Parent ? "Parent Menu" : "Child Menu"}</td>
            <td className="text-center">{page.page_position}</td>
            <td className="text-center">
              <input
                type="checkbox"
                checked={page.page_isActive}
                readOnly
                onClick={() => {
                  activeUserMenu(page.id, page, "page_isActive");
                }}
                className="form-check-input border border-secondary"
              />
            </td>
            <td className="text-center">
              <input
                type="checkbox"
                checked={page.is_Client_menu}
                readOnly
                onClick={() => {
                  activeUserMenu(page.id, page, "is_Client_menu");
                }}
                className="form-check-input border border-secondary"
              />
            </td>
            <td className="text-center">
              <input
                type="checkbox"
                checked={page.is_Admin_menu}
                readOnly
                onClick={() => {
                  activeUserMenu(page.id, page, "is_Admin_menu");
                }}
                className="form-check-input border border-secondary"
              />
            </td>
            <td className="text-center">
              <Link
                to=""
                onClick={() => editHandler("menu", true, page)}
                className="p-2"
              >
                <i
                  className="fa fa-pencil text-warning cursor-pointer fs-5"
                  aria-hidden="true"
                ></i>
              </Link>

              <Link
                to=""
                className=" ms-4"
                onClick={() => handleUserDelete(page)}
              >
                <i
                  className="fa fa-trash-o fs-4 text-danger"
                  aria-hidden="true"
                  title="Delete"
                ></i>
              </Link>
            </td>
          </tr>
        )}
        {page.childMenu?.length > 0 ? (
          <tr>
            <td colSpan="8" className="p-0">
              <table className="table mt-4 mb-4  w-100 border">
                <tr>
                  <th>Menu Lable</th>
                  <th>URL</th>
                  <th>Menu type</th>
                  <th className="text-center">Position</th>
                  <th className="text-center">Active status</th>
                  <th className="text-center">Client Menu</th>
                  <th className="text-center">Admin Menu</th>
                  <th className="text-center">Action</th>
                </tr>
                {page.childMenu.map((child) => childContent(child, true))}
              </table>
            </td>
          </tr>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="container-fluid pt-5">
      <div className="position-relative">
        <div className="text-end">
          <Link
            className="btn btn-primary"
            onClick={() => editHandler("menu", true)}
          >
            Add <i className="fa fa-plus mx-2" aria-hidden="true"></i>
          </Link>
          {/* <EditIcon editHandler={() => editHandler("menu", true)} /> */}
        </div>

        {componentEdit.menu ? (
          <div className="adminEditTestmonial">
            <MenuForm
              editHandler={editHandler}
              menuList={pagesDetails}
              editMenu={editMenu}
              componentType="menu"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Menu Administration"} cssClass="fs-1 pageTitle" />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {showContentPerRole(userInfo, false) ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Menu Lable</th>
                <th>URL</th>
                <th>Menu type</th>
                <th className="text-center">Position</th>
                <th className="text-center">Active status</th>
                <th className="text-center">Client Menu</th>
                <th className="text-center">Admin Menu</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pagesDetails?.map((page) => childContent(page, false))}
            </tbody>
          </table>
        ) : (
          <h3>Not authorized to view this page </h3>
        )}
      </div>

      {show && <ModelBg />}
    </div>
  );
};

export default PagesConfiguration;
