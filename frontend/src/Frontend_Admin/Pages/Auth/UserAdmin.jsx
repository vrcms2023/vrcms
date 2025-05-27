import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Title from "../../../Common/Title";

import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import { isAppAccess } from "../../../util/permissions";
import SEO from "../../../Common/SEO";

const UserAdmin = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isSuperAdmin, setisSuperAdmin] = useState("");
  const [userId, setUserId] = useState("");
  const [showMesg, setShowMesg] = useState(false);

  useEffect(() => {
    setisSuperAdmin(JSON.parse(getCookie("is_admin")));
    setUserId(JSON.parse(getCookie("userId")));
  }, []);

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
        }
      );

      if (response.status !== 200) {
        toast.error("Unable to active user");
      }

      if (response.status === 200) {
        toast.success(`${user.userName} is status updated`);
        setShowMesg(!user.is_appAccess);
        getAllUserDetails();
      }
    } catch (error) {
      toast.error("Unable to active user");
    }
  };

  return (
    <div className="container-fluid pt-5 userAdmin">
      <SEO
        title={"EZI Press User Admin Page "}
        description={"EZI Press - Custom CMS"}
      />
      <div className="row px-3 px-lg-5">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
          <Title title={"User's"} cssClass="fs-5 pageTitle " />
          <Link to="/admin/userPermission" className="btn btn-outline ">
            Go for Page Permissions
          </Link>
          {/* <Search
              setObject={userDetails}
              clientSearchURL={""}
              adminSearchURL={""}
              clientDefaultURL={""}
              searchfiledDeatails={"Name / Email ID / Admin Type "}
            /> */}
        </div>
      </div>

      <div className="row p-5 table-responsive userAdminLlist">
        {isSuperAdmin ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin type</th>
                <th>Active status</th>
                <th> Admin Permissions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td className={`${user.is_admin ? "" : ""}`}>
                    {user.userName}
                  </td>
                  <td className={`${user.is_admin ? "" : ""}`}>{user.email}</td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.is_admin ? "Super Admin" : "Maintainer"}
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    <span
                      className={`badge ${
                        isAppAccess(user)
                          ? "bg-success"
                          : "bg-secondary text-mute"
                      } fw-normal`}
                    >
                      {isAppAccess(user) ? "Active" : "In Active"}{" "}
                    </span>
                  </td>
                  <td className={`${user.is_admin ? "text-danger" : ""}`}>
                    {user.id !== userId && !user.is_admin ? (
                      <input
                        type="checkbox"
                        checked={isAppAccess(user)}
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

        <div className="text-center my-5">
          {/* <p className="text-white h4 bg-info m-5 p-4">
            After activating the user account, granting page permissions is also
            required to access the application.
          </p> */}
          {showMesg && (
            <>
              <p className="text-black bg-warning p-2 fs-4">
                {/* After activating the admin account, <br />  */}
                you'll need to grant permission to access the app's pages
              </p>
              <p className="text-center">
                <i
                  className="fa fa-arrow-down fs-1 text-warning"
                  aria-hidden="true"
                ></i>
              </p>
            </>
          )}

          {/* <Link to="/admin/userPermission" className="btn btn-outline ">
            Go for Page Permissions
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
