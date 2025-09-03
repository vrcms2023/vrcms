import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import { getCookie } from "../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";

import ModalBg from "../../Common/ModelBg";
// import EditIcon from "../AdminEditIcon";
import { isPathExit } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Styled Components
import { StyledMenu } from "../StyledComponents/Styled-NavMenu";

// import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getMenu, getSelectedUserPermissions, getUser } from "../../redux/auth/authActions";
import {
  getClonedObject,
  getMenuObject,
  getPublishedSericeMenu,
  getselectedUserMenu,
  getServiceMainMenu,
  storeServiceMenuValueinCookie,
  urlStringFormat,
} from "../../util/commonUtil";

import { getServiceValues } from "../../redux/services/serviceActions";
import { isAppAccess } from "../../util/permissions";

import { updatedMenulist, updatedMenuloadedStatus } from "../../redux/auth/authSlice";
import { axiosServiceApi } from "../../util/axiosUtil";
import { toast } from "react-toastify";
import Menudata from "../../data/Menu.json";
import ImageInputsForm from "../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import EditIcon from "../AdminEditIcon";
import { getFormDynamicFields, getLogoFormFields } from "../../util/dynamicFormFields";
import ApplicationLogo from "../Logo/ApplicationLogo";
import AdminSingleRecordUpload from "../../Frontend_Admin/Components/forms/V2/AdminSingleRecordUpload";
import AdminListOfRecordsUpload from "../../Frontend_Admin/Components/forms/V2/AdminListOfRecordsUpload";

const Header = () => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const { userInfo, menuList, menuRawList, permissions, menuloadedStatus } = useSelector(
    (state) => state.auth
  );
  const { serviceMenu } = useSelector((state) => state.serviceMenu);
  const dispatch = useDispatch();
  const onPageLoadServiceAction = useRef(true);
  const [rootServiceMenu, setRootServiceMenu] = useState({});
  const navigate = useNavigate();
  const pageType = "header";
  const category = "logo";
  const componentType = "menu";

  const pathList = [
    "/login",
    "/register",
    "/resend_activation",
    "/reset_password",
    "/authForm",
    // "/dashboard",
    // "/addproject",
    // "/editproject/",
    // "/adminnews",
    // "/testimonial",
    // "/userAdmin",
  ];
  const isHideMenu = isPathExit(pathList);

  const burgetHide = [
    "/login",
    "/register",
    "unauthorized",
    "activate",
    "reset_password",
    "authForm",
    "resend_activation",
    "password",
    "settings",
  ];
  const isHideBurgetIcon = isPathExit(burgetHide);
  const [serviceMenuList, setServiceMenuList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showAddMenuMessage, setshowAddMenuMessage] = useState(false);
  const menuUpdateInitialized = useRef(true);
  const [isServiceMenuAvailable, setIsServiceMenuAvailable] = useState(false);
  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (isAppAccess(userInfo)) {
      dispatch(getSelectedUserPermissions(userInfo?.id));
    }
    if (!userInfo && getCookie("access")) {
      dispatch(getUser());
    }
    if (menuRawList?.length === 0 && counter < 3) {
      menuUpdateInitialized.current = true;
      dispatch(getMenu());
      setCounter(counter + 1);
    } else if (menuRawList?.length === 0 && counter >= 3) {
      setshowAddMenuMessage(true);
    }
  }, [userInfo, dispatch, menuRawList]);

  useEffect(() => {
    if (permissions?.length > 0 && menuRawList?.length > 0 && menuloadedStatus) {
      let _customMenulist = getClonedObject(menuRawList);
      if (permissions[0]?.name.toLowerCase() !== "all") {
        _customMenulist = getselectedUserMenu(permissions, menuRawList);

        let mainServiceMenu = getServiceMainMenu(_customMenulist);
        if (mainServiceMenu?.length > 0) {
          setIsServiceMenuAvailable(true);
        }
      } else {
        setIsServiceMenuAvailable(true);
      }
      const menuObject = getMenuObject(_customMenulist);

      dispatch(updatedMenulist(menuObject));
      dispatch(updatedMenuloadedStatus());
    }
  }, [permissions, menuRawList, menuloadedStatus]);

  useEffect(() => {
    if (menuRawList?.length > 0 && menuloadedStatus) {
      let _customMenulist = getClonedObject(menuRawList);
      const _rootservicemenu = getServiceMainMenu(_customMenulist);
      setRootServiceMenu(_rootservicemenu);

      if (_rootservicemenu) {
        setIsServiceMenuAvailable(true);
      }
    }
  }, [menuRawList, menuloadedStatus]);

  useEffect(() => {
    if (
      serviceMenu.length === 0 &&
      menuList.length > 0 &&
      onPageLoadServiceAction.current &&
      isServiceMenuAvailable
    ) {
      onPageLoadServiceAction.current = false;
      dispatch(getServiceValues());
    }
  }, [serviceMenu, dispatch, menuList, isServiceMenuAvailable]);

  useEffect(() => {
    setServiceMenuList(serviceMenu);
    if (!getCookie("pageLoadServiceName") && serviceMenu.length > 0) {
      storeServiceMenuValueinCookie(serviceMenu[0]);
    }
  }, [serviceMenu]);

  useEffect(() => {
    if (menuList.length > 0 && serviceMenuList.length > 0 && menuUpdateInitialized.current) {
      menuUpdateInitialized.current = false;
      const updateMainMenu = getPublishedSericeMenu(menuList, serviceMenuList);
      dispatch(updatedMenulist(updateMainMenu));
    }
  }, [serviceMenuList, menuList, isAdmin]);

  useEffect(() => {
    setTimeout(() => {
      const links = document.querySelectorAll("#navbarSupportedContent li");

      const menu = document.getElementById("navbarSupportedContent");

      // on clicking of menu Item Menu will be hided
      links.forEach((item) => {
        item.addEventListener("click", function (event) {
          if (!event.target.classList.contains("isChildAvailable")) {
            menu.classList.remove("show");
          }
        });
      });
    }, 2000);
  }, []);

  const loadAndSubmitMenuJSON = async () => {
    try {
      const response = await axiosServiceApi.post(`/pageMenu/uploadMenuData/`, Menudata);

      if (response.status === 201) {
        toast.success(response.data.message || "File uploaded successfully!");
        navigate("/adminPagesConfiguration");
      }
    } catch (error) {
      toast.error("An error occurred while uploading.");
    }
  };

  // useEffect(() => {
  //   function scrollFunction() {
  //     const navbar = document.getElementsByClassName("navbar")[0]; // Get the first element with the class name
  //     const logo = document.getElementsByClassName("logo")[0]; // Get the first element with the class name
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       navbar.style.position = "fixed";
  //       navbar.style.top = 0;
  //       navbar.style.width = "100%";
  //       navbar.style.transition = "0.4s";
  //     } else {
  //       navbar.style.position = "static";
  //     }
  //   }

  //   window.addEventListener("scroll", scrollFunction);
  // });

  // function logOutHandler() {
  //   removeAllCookies();
  //   dispatch(logout());
  //   toast.success("Logout successfully");
  //   navigate("/");
  // }
  return (
    <StyledMenu>
      <nav
        className={
          isAdmin ? "navbar navbar-expand-lg navbar-dark" : "navbar navbar-expand-lg navbar-dark"
        }
      >
        <div className="container">
          {isAdmin && hasPermission && (
            <div className="position-relative">
              <EditIcon editHandler={() => editHandler("menu", true)} editlabel="Logo" />
            </div>
          )}
          <Link to={isHideMenu ? "#" : "/"} className="navbar-brand logo">
            <ApplicationLogo
              getBannerAPIURL={`banners/by-category/${category}/`}
              bannerState={componentEdit.menu}
            />
          </Link>

          {!isHideBurgetIcon && !showAddMenuMessage && (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
          {menuRawList?.length === 0 && isAdmin && (
            <div className="w-75 text-end">
              {/* <Link to="/adminPagesConfiguration" className="btn btn-outline ">
                Go for Menu Creation
              </Link> */}
              <Link className="btn btn-primary mx-4" onClick={loadAndSubmitMenuJSON}>
                Generate Menu
                {/* <i className="fa fa-plus mx-2" aria-hidden="true"></i> */}
              </Link>
            </div>
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!isHideMenu && (
              <ClientMenu
                serviceMenuList={serviceMenuList}
                rootServiceMenu={rootServiceMenu}
                key="clientMenu"
              />
            )}
          </div>
        </div>
      </nav>

      {/* Edit Logo Code */}
      {componentEdit.menu && (
        <div className={`adminEditTestmonial selected `}>
          <AdminSingleRecordUpload
            editHandler={editHandler}
            componentType={componentType}
            popupTitle="Image Gallery"
            onPageLoadServiceCall={true}
            imagePostURL="banners/createBanner/"
            imageGetURL={`banners/by-page-and-category/${pageType}-${componentType}/category/${category}/`}
            imageUpdateURL="banners/updateBanner/"
            imageDeleteURL="banners/deleteBanner/"
            imageLabel="Upload Image"
            validTypes={"image/svg+xml"}
            showExtraFormFields={getFormDynamicFields(`${pageType}-${componentType}`, category)}
            sideDeck="imagepopup"
          />
        </div>
      )}
      {show && <ModalBg />}
    </StyledMenu>
  );
};

export const ClientMenu = ({ serviceMenuList, rootServiceMenu }) => {
  const { menuList } = useSelector((state) => state.auth);

  const getSelectedServiceMenu = (menu) => {
    const tempService = _.filter(serviceMenuList, (item) => {
      return item.services_page_title === menu.page_label;
    })[0];
    if (tempService) {
      storeServiceMenuValueinCookie(tempService);
    }
  };

  const ChildMenuContent = ({ menu, className }) => {
    const location = useLocation();
    const isParentActive = (item) => {
      const current = location.pathname;

      // Check if home route matches
      if (current === "/" && item.page_url === "/home") return true;

      // Check if current route matches parent or aliases
      if (current === item.page_url) return true;

      // Check if any child path exactly matches
      if (item.childMenu) {
        return item.childMenu.some((child) => child.page_url.toLowerCase() === current);
      }

      return false;
    };

    return (
      <li
        className={`nav-item ${className}-${menu.page_label.replaceAll(" ", "-")} ${menu.childMenu ? "dropdown" : ""}`}
        key={menu.id}
      >
        <NavLink
          to={urlStringFormat(`${menu.page_url}`)}
          className={({ isActive }) => {
            const baseClass = menu.is_Parent ? "nav-Link" : "dropdown-item";
            const childToggleClass =
              menu.childMenu?.length > 0 ? "dropdown-toggle isChildAvailable" : "";
            const activeClass = isActive || isParentActive(menu) ? "active" : "";

            return `${baseClass} ${childToggleClass} ${activeClass}`;
          }}
          onClick={(e) => {
            if (menu?.page_parent_ID === rootServiceMenu?.id) {
              getSelectedServiceMenu(menu);
            }
          }}
          id={menu.id}
          data-bs-toggle={menu.childMenu?.length > 0 ? "dropdown" : undefined}
          aria-expanded={menu.childMenu?.length > 0 ? "false" : "true"}
          role={menu.childMenu?.length > 0 ? "button" : undefined}
        >
          {menu.page_label}
        </NavLink>
        {menu.childMenu?.length > 0 && (
          <ul
            className={`dropdown-menu child-${menu.page_label}`}
            aria-labelledby={`${menu.page_label}-navbarDropdown`}
          >
            {menu.childMenu.map((childMenu) => (
              <ChildMenuContent menu={childMenu} key={childMenu.id} className="child" />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
      {menuList?.map((menu) => (
        <ChildMenuContent menu={menu} key={menu.id} className="parent" />
      ))}
    </ul>
  );
};

export default Header;
