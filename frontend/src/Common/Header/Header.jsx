import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { HashLink  } from 'react-router-hash-link';
import Button from "../Button";
import { getCookie, removeAllCookies } from "../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import AdminHeader from "../../Admin/Components/Header";
// import _ from "lodash";

import ModalBg from "../../Common/ModelBg";
// import EditIcon from "../AdminEditIcon";
import { hideHandBurgerIcon } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Styled Components
import { StyledMenu } from "../StyledComponents/Styled-NavMenu";

// Styles
import "./Styles.css";

// Images
import Logo from "../../Images/logo.svg";
// import { axiosClientServiceApi } from "../../util/axiosUtil";
import {
  getMenu,
  getSelectedUserPermissions,
  getUser,
} from "../../features/auth/authActions";
import {
  HideFooterForAdmin,
  storeServiceMenuValueinCookie,
  urlStringFormat,
} from "../../util/commonUtil";

import { getServiceValues } from "../../features/services/serviceActions";
import { showContentPerRole } from "../../util/permissions";

const Header = () => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { userInfo, menuList } = useSelector((state) => state.auth);
  const { serviceMenu, serviceerror } = useSelector(
    (state) => state.serviceMenu
  );
  const dispatch = useDispatch();
  const onPageLoadAction = useRef(true);

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
  const isHideMenu = hideHandBurgerIcon(pathList);

  const burgetHide = [
    "/login",
    "/register",
    "unauthorized",
    "activate",
    "reset_password",
    "authForm",
    "resend_activation",
    "password",
  ];
  const isHideBurgetIcon = hideHandBurgerIcon(burgetHide);
  const [serviceMenuList, setServiceMenuList] = useState([]);
  const [userName, setUserName] = useState("");

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (serviceMenu.length === 0 && onPageLoadAction.current) {
      onPageLoadAction.current = false;
      dispatch(getServiceValues());
    } else {
      setServiceMenuList(serviceMenu);
      if (!getCookie("pageLoadServiceName") && serviceMenu.length > 0) {
        storeServiceMenuValueinCookie(serviceMenu[0]);
      }
    }
  }, [serviceMenu, dispatch]);

  useEffect(() => {
    if (userInfo?.is_appAccess) {
      const uName = userInfo ? userInfo.userName : getCookie("userName");
      setUserName(uName);
      dispatch(getSelectedUserPermissions(userInfo?.id));
    } else {
      setUserName("");
    }
    if (!userInfo && getCookie("access")) {
      dispatch(getUser());
    }
    if (userInfo?.is_appAccess && menuList.length === 0) {
      dispatch(getMenu());
    }
  }, [userInfo]);

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

  function logOutHandler() {
    removeAllCookies();
    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  }
  return (
    <>
      {componentEdit.menu ? (
        <div className="adminEditTestmonial">
          <AdminHeader editHandler={editHandler} />
        </div>
      ) : (
        ""
      )}
      <nav
        className={
          isAdmin
            ? "navbar navbar-expand-lg navbar-dark"
            : "navbar navbar-expand-lg navbar-dark"
        }
      >
        <div className="container">
          <Link to={isHideMenu ? "#" : "/"} className="navbar-brand logo">
            {/* <img src={Logo} alt="" /> */}
            SAP Design Studio
          </Link>

          {!isHideBurgetIcon ? (
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
          ) : (
            ""
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!isHideMenu && <ClientMenu serviceMenuList={serviceMenuList} />}
          </div>
        </div>
      </nav>
      {show && <ModalBg />}
    </>
  );
};

export const ClientMenu = ({ serviceMenuList }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const { userInfo, menuList } = useSelector((state) => state.auth);

  const ChildMenuContent = (menu) => {
    return (
      <React.Fragment key={menu.id}>
        <li className={`nav-item ${menu.childMenu ? "dropdown" : ""}`}>
          <NavLink
            to={menu.page_url}
            className={`${menu.is_Parent ? "nav-Link" : "dropdown-item"} ${
              menu.childMenu?.length > 0 && "dropdown-toggle isChildAvailable"
            }`}
            id={menu.id}
            data-bs-toggle={`${menu.childMenu?.length > 0 && "dropdown"}`}
            aria-expanded={`${menu.childMenu?.length > 0 && "false"}`}
            role={`${menu.childMenu?.length > 0 && "button"}`}
          >
            {menu.page_label}
          </NavLink>
          {menu.childMenu?.length > 0 ? (
            <ul className="dropdown-menu">
              {menu.childMenu.map((childMenu) =>
                ChildMenuContent(childMenu, true)
              )}
            </ul>
          ) : (
            ""
          )}
        </li>
      </React.Fragment>
    );
  };

  return (
    <StyledMenu>
      {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
        <li className="nav-item">
          <NavLink
            to="/"
            className={useCallback(({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            )}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            AboutUs
          </NavLink>
        </li>

        <li className="nav-item dropdown">
          <NavLink
            id="ServicesnavbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
            to="/rishservices"
            className={useCallback(({ isActive }) =>
              isActive
                ? "nav-Link dropdown-toggle isChildAvailable active"
                : "nav-Link dropdown-toggle isChildAvailable"
            )}
          >
            Services
          </NavLink>
          <ul
            className="dropdown-menu"
            aria-labelledby="ServicesnavbarDropdown"
          >
            {}
            {serviceMenuList &&
              serviceMenuList.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/services/${urlStringFormat(
                      item.services_page_title
                    )}/`}
                    onClick={() => {
                      storeServiceMenuValueinCookie(item);
                    }}
                    className="dropdown-item"
                  >
                    {item.services_page_title}
                  </Link>
                </li>
              ))}
            {isAdmin ? (
              <>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="pt-3">
                  <Link 
                    to="/services#servicesPage"
                    className="dropdown-item btn btn-primary"
                  >
                    Add New Service
                  </Link>
                  
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </li>

        <li className="nav-item">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Projects
          </NavLink>
        </li>

        <li className="nav-item dropdown">
          <NavLink
            id="KnowledgeHubnavbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
            to="khub"
            className={useCallback(({ isActive }) =>
              isActive
                ? "nav-Link dropdown-toggle isChildAvailable active"
                : "nav-Link dropdown-toggle isChildAvailable"
            )}
          >
            Clients
          </NavLink>
          <ul
            className="dropdown-menu"
            aria-labelledby="KnowledgeHubnavbarDropdown"
          >
            <li>
              <Link to="/casestudies" className="dropdown-item">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/clients" className="dropdown-item">
                Client List
              </Link>
            </li>
            <li>
              <Link to="/news" className="dropdown-item">
                News
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="dropdown-item">
                Testimonials
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Careers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Team
          </NavLink>
        </li>

        <li className="nav-item dropdown">
          <NavLink
            id="KnowledgeHubnavbarDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
            to="khub"
            className={useCallback(({ isActive }) =>
              isActive
                ? "nav-Link dropdown-toggle isChildAvailable active"
                : "nav-Link dropdown-toggle isChildAvailable"
            )}
          >
            Gallery
          </NavLink>
          <ul
            className="dropdown-menu"
            aria-labelledby="KnowledgeHubnavbarDropdown"
          >
            <li>
              <Link to="/gallery" className="dropdown-item">
                Image Gallery
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="dropdown-item">
                Video Gallery
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="dropdown-item">
                Projects Gallery
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-Link active" : "nav-Link"
            }
          >
            Contact
          </NavLink>
        </li>
        {isAdmin ? (
          <li className="nav-item dropdown">
            <NavLink
              id="AdminSettingnavbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
              to="khub"
              className={({ isActive }) =>
                isActive
                  ? "nav-Link dropdown-toggle isChildAvailable active"
                  : "nav-Link dropdown-toggle isChildAvailable"
              }
            >
              Admin Settings
            </NavLink>
            <ul
              className="dropdown-menu"
              aria-labelledby="AdminSettingnavbarDropdown"
            >
              <Link to="/dashboard" className="dropdown-item">
                Dashboard
              </Link>
              <li>
                {showContentPerRole(userInfo, false) ? (
                  <>
                    <Link to="/userAdmin" className="dropdown-item">
                      Users
                    </Link>
                    <Link to="/userPermission" className="dropdown-item">
                      User Pages Permissions
                    </Link>
                    <Link
                      to="/adminPagesConfigurtion"
                      className="dropdown-item"
                    >
                      Admin Pages Configurtion
                    </Link>
                  </>
                ) : (
                  ""
                )}
                <Link to="/contactUSList" className="dropdown-item">
                  Contact List
                </Link>
                <Link to="/change_password" className="dropdown-item">
                  Change Password
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          ""
        )}
      </ul> */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
        {menuList?.map((menu) => ChildMenuContent(menu, false))}
      </ul>
    </StyledMenu>
  );
};

export default Header;
