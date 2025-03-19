import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import { getCookie } from "../../util/cookieUtil";
import { useDispatch, useSelector } from "react-redux";

import ModalBg from "../../Common/ModelBg";
// import EditIcon from "../AdminEditIcon";
import { hideHandBurgerIcon } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../customhook/useAdminLoginStatus";

// Styled Components
import { StyledMenu } from "../StyledComponents/Styled-NavMenu";

// import { axiosClientServiceApi } from "../../util/axiosUtil";
import {
  getMenu,
  getSelectedUserPermissions,
  getUser,
} from "../../redux/auth/authActions";
import {
  storeServiceMenuValueinCookie,
  urlStringFormat,
} from "../../util/commonUtil";

import { getServiceValues } from "../../redux/services/serviceActions";
import { isAppAccess } from "../../util/permissions";

import Logo from "../../Images/logo.png";
import LogoForm from "../../Frontend_Admin/Components/forms/Logo";

const Header = () => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };
  const { isAdmin } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const { userInfo, menuList } = useSelector((state) => state.auth);
  const { serviceMenu } = useSelector((state) => state.serviceMenu);
  const dispatch = useDispatch();
  const onPageLoadServiceAction = useRef(true);

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
  const [counter, setCounter] = useState(0);
  const [showAddMenuMessage, setshowAddMenuMessage] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (serviceMenu.length === 0 && onPageLoadServiceAction.current) {
      onPageLoadServiceAction.current = false;
      dispatch(getServiceValues());
    } else {
      setServiceMenuList(serviceMenu);
      if (!getCookie("pageLoadServiceName") && serviceMenu.length > 0) {
        storeServiceMenuValueinCookie(serviceMenu[0]);
      }
    }
  }, [serviceMenu, dispatch]);

  useEffect(() => {
    if (isAppAccess(userInfo)) {
      dispatch(getSelectedUserPermissions(userInfo?.id));
    }
    if (!userInfo && getCookie("access")) {
      dispatch(getUser());
    }
    if (menuList.length === 0 && counter < 3) {
      dispatch(getMenu());
      setCounter(counter + 1);
    } else if (menuList.length === 0 && counter >= 3) {
      setshowAddMenuMessage(true);
    }
  }, [userInfo, dispatch, menuList]);

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
      {componentEdit.menu ? (
        <div className="adminEditTestmonial">
          <LogoForm editHandler={editHandler} />
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
            <img src={Logo} alt="" />
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
          {showAddMenuMessage && (
            <div className="w-75 text-end">
              <Link to="/adminPagesConfiguration" className="btn btn-outline ">
                Go for Menu Creation
              </Link>
            </div>
          )}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!isHideMenu && (
              <ClientMenu serviceMenuList={serviceMenuList} key="clientMenu" />
            )}
          </div>
        </div>
      </nav>
      {show && <ModalBg />}
    </StyledMenu>
  );
};

export const ClientMenu = ({ serviceMenuList }) => {
  const { menuList } = useSelector((state) => state.auth);

  const getSelectedServiceMenu = (menu) => {
    const tempService = _.filter(serviceMenuList, (item) => {
      return item.services_page_title === menu.page_label;
    })[0];
    if (tempService) {
      storeServiceMenuValueinCookie(tempService);
    }
  };

  const ChildMenuContent = ({ menu }) => {
    return (
      <li
        className={`nav-item ${menu.childMenu ? "dropdown" : ""}`}
        key={menu.id}
      >
        <NavLink
          to={urlStringFormat(menu.page_url)}
          className={
            (({ isActive }) => (isActive ? "active" : ""),
            `${menu.is_Parent ? "nav-Link" : "dropdown-item"} ${
              menu.childMenu?.length > 0 && "dropdown-toggle isChildAvailable"
            }`)
          }
          onClick={
            menu.page_url.startsWith("/services/")
              ? () => {
                  getSelectedServiceMenu(menu);
                }
              : ""
          }
          id={menu.id}
          data-bs-toggle={`${menu.childMenu?.length > 0 ? "dropdown" : ""}`}
          aria-expanded={`${menu.childMenu?.length > 0 ? false : true}`}
          role={`${menu.childMenu?.length > 0 ? "button" : ""}`}
        >
          {menu.page_label}
        </NavLink>
        {menu.childMenu?.length > 0 && (
          <ul
            className="dropdown-menu"
            aria-labelledby={`${menu.page_label}navbarDropdown`}
          >
            {menu.childMenu.map((childMenu) => (
              <ChildMenuContent menu={childMenu} key={childMenu.id} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 menu">
      {menuList?.map((menu) => (
        <ChildMenuContent menu={menu} key={menu.id} />
      ))}
    </ul>
  );
};

export default Header;
