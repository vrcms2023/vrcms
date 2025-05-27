import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Title from "../../../Common/Title";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { getMenuObject } from "../../../util/commonUtil";
import Button from "../../../Common/Button";
import Error from "../../Components/Error";
import { isAppAccess } from "../../../util/permissions";
import SEO from "../../../Common/SEO";

const UserPagePermission = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [userId, setUserId] = useState("");
  const [menuDetails, setMenuDetails] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isUserCheck, setIsUserCheck] = useState([]);
  const [isMenuCheck, setIsMenuCheck] = useState([]);
  const [userPermission, setUserPermission] = useState({});
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAppAccess(userInfo)) {
      setUserId(userInfo.id);
    }
  }, [userInfo]);

  /**
   * get User details
   */
  const getAllUserDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/user/auth/users/`);
      if (response?.status === 200 && response.data?.length > 0) {
        setUserDetails(response.data);
      } else {
        setUserDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  /**
   * get Menu details
   */
  const getMenuDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/pageMenu/createPageMenu/`);
      if (response?.status === 200 && response?.data?.PageDetails?.length > 0) {
        const res = JSON.parse(JSON.stringify(response.data.PageDetails));
        setMenuList(res);
        setMenuDetails(getMenuObject(response.data.PageDetails));
      } else {
        setMenuDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };

  useEffect(() => {
    getAllUserDetails();
    getMenuDetails();
  }, []);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    const listOfObj = menuList.map((item) => ({
      id: item.id,
      name: item.page_url ? item.page_url : item.page_label,
    }));
    setIsMenuCheck(listOfObj);
    if (isCheckAll) {
      setIsMenuCheck([]);
    }
  };

  const userSelection = (e, user) => {
    const { id, checked } = e.target;
    setIsMenuCheck([]);
    setIsCheckAll(false);
    setErrorMessage("");
    setIsUserCheck([...isUserCheck, { id, user }]);
    if (checked) {
      getSelectedUserPermisisons(id);
    }

    if (!checked) {
      setIsUserCheck(isUserCheck.filter((item) => item.id !== id));
    }
  };

  const handleClick = (e) => {
    const { id, name, checked } = e.target;
    setIsCheckAll(false);
    setIsMenuCheck([...isMenuCheck, { id, name }]);
    if (!checked) {
      setIsMenuCheck(isMenuCheck.filter((item) => item.id !== id));
    }
  };

  const isObjectChecked = (ObbArray, id) => {
    const item = ObbArray.filter((item) => item.id === id);
    if (item.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isObjectDisabled = (user, ObbArray, id) => {
    if (!isAppAccess(user)) {
      return true;
    }
    if (ObbArray.length === 0) return;
    const item = ObbArray.filter((item) => item.id === id);
    if (item.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const saveHandle = async () => {
    const selectedUser = isUserCheck[0]?.user;
    if (!selectedUser) {
      setErrorMessage("Please select user");
      window.scrollTo(0, 0);
      return;
    }
    const id = userPermission?.id;
    const data = {
      user_name: selectedUser.userName,
      user_id: selectedUser.id,
      user_email: selectedUser.email,
      user_permission_list: isMenuCheck,
      created_by: getCookie("userName"),
    };

    if (id) {
      userPermission.user_permission_list = isMenuCheck;
      userPermission["updated_by"] = getCookie("userName");
    }

    try {
      let response = "";
      if (id) {
        response = await axiosServiceApi.patch(
          `/pagePermission/updatePermissions/${id}/`,
          userPermission
        );
      } else {
        response = await axiosServiceApi.post(
          `/pagePermission/createPermissions/`,
          data
        );
      }

      if (
        (response?.status === 201 || response?.status === 200) &&
        response?.data?.userPermissions
      ) {
        setUserPermission(response?.data?.userPermissions);
        toast.success("Permission are update successfully");
      } else {
        setUserPermission({});
      }
    } catch (error) {
      toast.error("Unable to save user permission");
    }
  };

  /**
   * get User details
   */
  const getSelectedUserPermisisons = async (id) => {
    try {
      const response = await axiosServiceApi.get(
        `/pagePermission/updatePermissions/${id}/`
      );
      if (response?.status === 200 && response?.data?.userPermissions) {
        const permission = response?.data?.userPermissions;
        setUserPermission(permission);
        setIsMenuCheck(permission.user_permission_list);
        if (menuList.length === permission.user_permission_list.length) {
          setIsCheckAll(true);
        }
      } else {
        setUserPermission({});
      }
    } catch (error) {
      console.log("Unable to load user details");
      setUserPermission({});
    }
  };

  const ChildContent = ({ menu }) => {
    return (
      <React.Fragment key={menu.id}>
        {menu.is_Maintainer_menu && (
          <li
            className={`list-group-item ${
              !menu.childMenu
                ? "d-flex justify-content-between align-items-start"
                : ""
            }`}
          >
            <span className={`${menu.is_Parent ? "fw-bold" : "child"}`}>
              {menu.page_label}
            </span>
            {!menu.childMenu ? (
              <span className="badge">
                <Checkbox
                  key={menu.id}
                  type="checkbox"
                  name={menu.page_url}
                  id={menu.id}
                  handleClick={handleClick}
                  isChecked={isObjectChecked(isMenuCheck, menu.id)}
                  disabled={false}
                />
              </span>
            ) : (
              ""
            )}

            {menu.childMenu?.length > 0 ? (
              <ul className="list-group">
                {menu.childMenu.map((childMenu) => {
                  return <ChildContent menu={childMenu} key={childMenu.id} />;
                })}
              </ul>
            ) : (
              ""
            )}
          </li>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="container-fluid pt-5">
      <SEO
        title={"EZI Press User page permission Page "}
        description={"EZI Press - Custom CMS"}
      />
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between align-items-center">
          <Title title={"User's page Permission"} cssClass="fs-1 pageTitle" />
          <Button
            type="submit"
            cssClass="btn btn-primary"
            label={"save"}
            handlerChange={saveHandle}
          />
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4">
        <div className="col-md-5">
          {errorMessage ? <Error>{errorMessage}</Error> : ""}
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.userName}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.email}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.id !== userId && !user.is_admin ? (
                      <Checkbox
                        key={user.id}
                        type="checkbox"
                        name={user.userName}
                        id={user.id}
                        handleClick={(e) => {
                          userSelection(e, user);
                        }}
                        isChecked={isObjectChecked(
                          isUserCheck,
                          user.id.toString()
                        )}
                        disabled={isObjectDisabled(
                          user,
                          isUserCheck,
                          user.id.toString()
                        )}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-7 bg-light p-4">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-start bg-warning">
              Select All
              <span className="badge">
                <Checkbox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
              </span>
            </li>
          </ul>
          <ul className="list-group list-group-flush">
            {menuDetails?.map((menu) => {
              return <ChildContent menu={menu} key={menu.id} />;
            })}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center gap-1 gap-md-3 ">
          <Button
            type="submit"
            cssClass="btn btn-primary"
            label={"save"}
            handlerChange={saveHandle}
          />
        </div>
      </div>
    </div>
  );
};

const Checkbox = ({ id, type, name, handleClick, isChecked, disabled }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
      disabled={disabled}
      className="form-check-input border border-secondary"
    />
  );
};

export default UserPagePermission;
