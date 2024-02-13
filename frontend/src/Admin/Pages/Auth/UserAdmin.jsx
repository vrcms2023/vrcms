import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Title from "../../../Common/Title";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";

const UserAdmin = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUserName(getCookie("userName"));
    setisSuperAdmin(JSON.parse(getCookie("is_admin")));
    setUserId(JSON.parse(getCookie("userId")));
  }, []);

  const navigate = useNavigate();

  /**
   * get User details
   */
  const getAllUserDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/user/auth/users/`);
      if (response?.status == 200 && response.data?.length > 0) {
        setUserDetails(response.data);
      } else {
        setUserDetails([]);
      }
    } catch (error) {
      toast.error("Unable to load user details");
    }
  };
  useEffect(() => {
    getAllUserDetails();
  }, []);

  const handleUserDelete = (user) => {
    console.log(user);
    const deleteUser = async () => {
      // const response = await axiosServiceApi.delete(
      // `/user/auth/users/me/?current_password=Abcd@1234`,
      // );
      // console.log(response)
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteUser}
            message={`you want to delete the ${user.userName}`}
          />
        );
      },
    });
  };

  /**
   * user activation
   * @param {*} user
   */
  const activeDeactiveUser = async (user) => {
    try {
      const response = await axiosServiceApi.put(
        `/user/auth/appAccess/${user.id}/`,
        {
          is_appAccess: !user.is_appAccess,
        },
      );

      if (response.status !== 200) {
        toast.error("Unable to active user");
      }

      if (response.status == 200) {
        toast.success(`${user.userName} is status updated`);
        getAllUserDetails();
      }
    } catch (error) {
      toast.error("Unable to active user");
    }
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row px-3 px-lg-5">
        <div className="text-end d-flex justify-content-between">
          <Title title={"User's"} cssClass="fs-1 pageTitle" />
          {/* <Search
              setObject={userDetails}
              clientSearchURL={""}
              adminSearchURL={""}
              clientDefaultURL={""}
              searchfiledDeatails={"Name / Email ID / Admin Type "}
            /> */}
        </div>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {isSuperAdmin ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin type</th>
                <th colSpan={2}>Active status</th>
                <th>Action</th>
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
                    {user.is_admin ? "Super Admin" : "Maintainer"}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    <span
                      className={`badge ${
                        user.is_appAccess
                          ? "bg-success"
                          : "bg-secondary text-mute"
                      } fw-normal`}
                    >
                      {user.is_appAccess ? "Active" : "In Active"}{" "}
                    </span>
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.id !== userId && !user.is_admin ? (
                      <input
                        type="checkbox"
                        checked={user.is_appAccess}
                        readOnly
                        onClick={() => {
                          activeDeactiveUser(user);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {user.id !== userId && !user.is_admin ? (
                      <Link to="" onClick={() => handleUserDelete(user)}>
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                          title="Delete"
                        ></i>
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Not authorized to view this page </h3>
        )}
        <div className="text-center">
          <p className="text-white h4 bg-info m-5 p-4">After activating the user account, granting page permissions is also required to access the application.</p>


          <Link to="/userPermission" className="btn btn-outline">Page Permissions</Link>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
