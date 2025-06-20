import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import _ from "lodash";
import ModelBg from "../../../Common/ModelBg";
import MenuForm from "../../Components/forms/MenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemStyle,
  getListStyle,
  getMenuObject,
  getParentObject,
  isNotEmptyObject,
  reorder,
  updateArrIndex,
} from "../../../util/commonUtil";
import { showContentPerRole } from "../../../util/permissions";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { getMenu } from "../../../redux/auth/authActions";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { getServiceValues } from "../../../redux/services/serviceActions";
import { deleteServiceMenu, getServiceMenuItem } from "../../../util/menuUtil";

const PagesConfiguration = () => {
  const editComponentObj = {
    menu: false,
  };
  const [rawData, setRawData] = useState([]);
  const [pagesDetails, setPagesDetails] = useState([]);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [editMenu, setEditMenu] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [selectedServiceMenu, setselectedServiceMenu] = useState([]);

  const editHandler = (name, value, item) => {
    setEditMenu(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
    const selectedService = getServiceMenuItem(serviceMenu, item);
    if (
      selectedService &&
      !item.is_Parent &&
      item?.page_url.includes("/services/")
    ) {
      setselectedServiceMenu(selectedService);
    }
  };

  /**
   * get User details
   */
  const getAllPagesDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/pageMenu/createPageMenu/`);
      if (response?.status === 200 && response?.data?.PageDetails?.length > 0) {
        setRawData(response.data.PageDetails);
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
    const selectedService = getServiceMenuItem(serviceMenu, menu);
    const deleteMenuItemByID = async () => {
      const response = await axiosServiceApi.delete(
        `/pageMenu/updatePageMenu/${id}/`
      );
      if (response.status === 204) {
        toast.success(`${title} Memu is delete successfully `);
        getAllPagesDetails();

        if (selectedService) {
          await deleteServiceMenu(selectedService);
          dispatch(getServiceValues());
        }
        dispatch(getMenu());
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
    if (!data.is_Parent) {
      const _parentMenu = _.filter(
        pagesDetails,
        (item) => item.id === data.page_parent_ID
      )[0];
      if (!_parentMenu[name]) {
        await updatePageIndex(_parentMenu.id, _parentMenu, name);
        await updatePageIndex(id, data, name);
      } else {
        await updatePageIndex(id, data, name);
      }
    } else {
      await updatePageIndex(id, data, name);
    }
  };
  const updatePageIndex = async (id, data, name) => {
    data[name] = !data[name];
    try {
      const response = await axiosServiceApi.patch(
        `/pageMenu/updatePageMenu/${id}/`,
        data
      );

      if (response.status === 200) {
        getAllPagesDetails();
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  const onPageLoadAction = useRef(true);
  const [serviceList, setServiceList] = useState([]);

  const { serviceMenu, serviceerror } = useSelector(
    (state) => state.serviceMenu
  );

  useEffect(() => {
    if (serviceMenu?.length === 0 && onPageLoadAction.current) {
      onPageLoadAction.current = false;
      dispatch(getServiceValues());
    } else if (serviceMenu.length > 0) {
      setServiceList(serviceMenu);
    }
  }, [serviceMenu]);

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Menu Lable</th>
          <th>URL</th>
          <th>Menu type</th>
          {/* <th className="text-center">Active status</th> */}
          <th className="text-center">Page Publish </th>
          {/* <th className="text-center">Super Admin </th> */}
          <th className="text-center">Admin Pages to View</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  };

  const TreeNode = ({ node, ind }) => {
    const [showChildren, setShowChildren] = useState(false);

    const showChildMenu = () => {
      setShowChildren(!showChildren);
    };
    return (
      <Draggable key={node.id} draggableId={node.id} index={ind} id={node.id}>
        {(provided, snapshot) => (
          <>
            {showContentPerRole(userInfo, node.is_Admin_menu) && (
              <tr
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <td className="p-2 ">
                  {node.childMenu?.length > 0 ? (
                    <i
                      className={`fa ${
                        showChildren ? "fa-minus" : "fa-plus"
                      } mx-2`}
                      aria-hidden="true"
                      onClick={showChildMenu}
                    ></i>
                  ) : (
                    <i
                      className="fa lableIconPlaceholder mx-2"
                      aria-hidden="true"
                    ></i>
                  )}
                  {node.page_label}
                </td>
                <td>
                  <Link to={node.page_url}>{node.page_url}</Link>
                </td>
                <td>{node.is_Parent ? "Parent Menu" : "Child Menu"}</td>
                {/* <td className="text-center">
                  <input
                    type="checkbox"
                    checked={node.page_isActive}
                    readOnly
                    onClick={() => {
                      activeUserMenu(node.id, node, "page_isActive");
                    }}
                    className="form-check-input border border-secondary"
                  />
                </td> */}
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={node.is_Client_menu}
                    readOnly
                    onClick={() => {
                      activeUserMenu(node.id, node, "is_Client_menu");
                    }}
                    className="form-check-input border border-secondary"
                  />
                </td>
                {/* <td className="text-center">
                  <input
                    type="checkbox"
                    checked={node.is_Admin_menu}
                    readOnly
                    onClick={() => {
                      activeUserMenu(node.id, node, "is_Admin_menu");
                    }}
                    className="form-check-input border border-secondary"
                  />
                </td> */}
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={node.is_Maintainer_menu}
                    readOnly
                    onClick={() => {
                      activeUserMenu(node.id, node, "is_Maintainer_menu");
                    }}
                    className="form-check-input border border-secondary"
                  />
                </td>
                <td className="text-center">
                  <Link
                    to=""
                    onClick={() => editHandler("menu", true, node)}
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
                    onClick={() => handleUserDelete(node)}
                  >
                    <i
                      className="fa fa-trash-o fs-5 text-danger"
                      aria-hidden="true"
                      title="Delete"
                    ></i>
                  </Link>
                </td>
              </tr>
            )}
            {showChildren && node.childMenu.length > 0 && (
              <tr className="p-0" id={`${node.id}-page`}>
                <td colSpan="8" className="p-0 ">
                  <table className="table mt-4 mb-4  w-100 border">
                    {tableHeader()}
                    <Treeview treeData={node.childMenu} />
                  </table>
                </td>
              </tr>
            )}
          </>
        )}
      </Draggable>
    );
  };

  const Treeview = ({ treeData }) => {
    const parentOnDragEnd = async (result) => {
      const { source, destination, draggableId } = result;
      if (!destination) return true;

      let _parentObjects = [];
      const _parentMenu = getParentObject(rawData, draggableId, pagesDetails);
      if (isNotEmptyObject(_parentMenu)) {
        let _childmenu = reorder(
          _parentMenu.childMenu,
          source.index,
          destination.index
        );

        _parentObjects = Array.from(pagesDetails);
        _parentObjects.map((item) => {
          if (item.id === _parentMenu.id) {
            item.childMenu = _childmenu;
          }
        });
      } else {
        const _items = reorder(pagesDetails, source.index, destination.index);
        _parentObjects = updateArrIndex(_items, "page_position");
      }

      const _finalObject = [];
      _parentObjects.forEach((element) => {
        _finalObject.push(element);
        if (element.childMenu?.length > 0) {
          const childObjs = updateArrIndex(
            element.childMenu,
            "page_position",
            element.page_position
          );
          _finalObject.push(...childObjs);
        }
      });

      const response = await updateObjectsIndex(_finalObject);
      if (response.length > 0) {
        const result = getMenuObject(response);
        setPagesDetails(result);
      }
      dispatch(getMenu());
    };

    const updateObjectsIndex = async (data) => {
      try {
        let response = await axiosServiceApi.put(
          `/pageMenu/updateindex/`,
          data
        );
        if (response?.data?.PageDetails) {
          return response.data.PageDetails;
        }
      } catch (error) {
        console.log("unable to save menu position");
      }
    };

    return (
      <DragDropContext onDragEnd={parentOnDragEnd}>
        {treeData.map((node, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <tbody
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <TreeNode node={node} key={node.id} ind={ind} />
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    );
  };

  return (
    <div className="container-fluid pt-5">
      <div className="position-relative">
        {componentEdit.menu && (
          <div className={`adminEditTestmonial selected `}>
            <MenuForm
              editHandler={editHandler}
              menuList={pagesDetails}
              popupTitle="Menu"
              editMenu={editMenu}
              componentType="menu"
              selectedServiceMenu={selectedServiceMenu}
            />
          </div>
        )}
      </div>
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"Menu / SEO"} cssClass="fs-2 pageTitle" />

          <div className="text-end">
            <Link
              className="btn btn-primary"
              onClick={() => editHandler("menu", true)}
            >
              Add <i className="fa fa-plus mx-2" aria-hidden="true"></i>
            </Link>
            {/* <EditIcon editHandler={() => editHandler("menu", true)} /> */}
          </div>
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {showContentPerRole(userInfo, hasPermission) ? (
          <table className="table table-striped">
            {tableHeader()}

            {pagesDetails.length > 0 && <Treeview treeData={pagesDetails} />}
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
