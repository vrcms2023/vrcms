import React, { useEffect, useState } from "react";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { getDateAndTimeValue, getTodayDate, paginationDataFormat } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";

const RAQAdmininistration = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * get User details
   */

  const getAllRaqFormDetails = async () => {
    try {
      const url = searchQuery
        ? `/contactus/raqsearchContacts/${searchQuery}/`
        : `/contactus/raqform/`;
      const response = await axiosServiceApi.get(url);
      if (response?.status === 200 && response.data?.results?.length > 0) {
        setResponseData(response.data);
        setPageloadResults(true);
      } else {
        setUserDetails([]);
        setPageloadResults(false);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAllRaqFormDetails();
  }, []);

  const setResponseData = (data) => {
    setUserDetails(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const downloadExcelfile = async () => {
    try {
      const response = await axiosServiceApi.get(`/contactus/raqexportExcel/`, {
        responseType: "blob",
        withCredentials: true,
      });
      const filename = response.headers["content-disposition"]
        .split("filename=")[1]
        .replace(/"/g, "");

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleRAQdetailsDelete = (user) => {
    const title = user.name;
    const deleteRAQDetailsByID = async () => {
      const response = await axiosServiceApi.delete(`/contactus/raqDeleteRecord/${user.id}/`);
      if (response.status === 204) {
        toast.success(`${title} User details is delete successfully `);
        getAllRaqFormDetails();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteRAQDetailsByID}
            message={
              <>
                Confirm deletion of <span>{title}</span> user details?
              </>
            }
          />
        );
      },
    });
  };

  return (
    <div className="container-fluid pt-5 contactsList">
      <div className="row px-2 px-lg-5">
        <div className="col-md-3">
          <Title title={"RAQ Contacts"} cssClass="fs-1 pageTitle" />
        </div>

        <>
          <div className="col-md-7">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/contactus/raqsearchContacts/"}
              adminSearchURL={"/contactus/raqform/"}
              clientDefaultURL={"/contactus/raqform/"}
              searchfiledDeatails={" Name / Email / Phone Number"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>

          <div className="col-md-2 p-0">
            <Button
              label={"RAQ Contacts"}
              handlerChange={downloadExcelfile}
              cssClass="btn btn-outline float-end"
              icon="fa-download  me-2 d-inline-block"
            />
          </div>
        </>
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {userDetails?.length > 0 ? (
          <table className="table table-striped table-hover contacts">
            <thead>
              <tr>
                <th class="align-middle">FirstName</th>
                <th class="align-middle">Email</th>
                <th class="align-middle">phoneNumber</th>
                <th class="align-middle">description</th>
                <th class="align-middle">Date | Time</th>
                <th class="align-middle">Action</th>
                {/* <th className="text-end align-middle">Send Request</th> */}
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td class="align-middle">{user.name}</td>
                  <td class="align-middle">
                    <i class="fa fs-6 me-2 text-primary fa-envelope" aria-hidden="true"></i>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td class="align-middle">
                    <i class="fa fs-4 me-2 fa-mobile" aria-hidden="true"></i>
                    <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                  </td>
                  <td class="align-middle">{user.description} </td>
                  <td class="align-middle">
                    {getDateAndTimeValue(user.created_at)}
                    {getTodayDate(user.created_at) && (
                      <span className="badge bg-warning text-dark px-2 ms-2">NEW</span>
                    )}
                  </td>
                  <td>
                    <Link to="" className=" ms-4" onClick={() => handleRAQdetailsDelete(user)}>
                      <i
                        className="fa fa-trash-o fs-4 text-danger"
                        aria-hidden="true"
                        title="Delete"
                      ></i>
                    </Link>
                  </td>
                  {/* <td class="align-middle"> */}
                  {/* <Button
                      label={"Send Request"}
                      handlerChange={() => {
                        //sendRequest(user);
                        showModel(user);
                      }}
                      cssClass="btn btn-outline px-3 float-end"
                      icon="fa-paper-plane"
                    /> */}
                  {/* <Ancher
                      AncherClass="btn btn-outline px-3 float-end"
                      AncherLabel="Send Request "
                      icon="fa-paper-plane"
                    /> */}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No Result found"
        )}
      </div>
      <div>
        {paginationData?.total_count ? (
          <CustomPagination
            paginationData={paginationData}
            paginationURL={"/contactus/raqform/"}
            paginationSearchURL={
              searchQuery ? `/contactus/searchContacts/${searchQuery}/` : "/contactus/raqform/"
            }
            searchQuery={searchQuery}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setResponseData={setResponseData}
            pageLoadResult={pageLoadResult}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RAQAdmininistration;
