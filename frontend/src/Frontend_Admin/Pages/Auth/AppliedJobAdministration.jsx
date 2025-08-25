import React, { useEffect, useState } from "react";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { getDateAndTimeValue, getTodayDate, paginationDataFormat } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";
import Ancher from "../../../Common/Ancher";
import { getBaseURL } from "../../../util/ulrUtil";

import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import ContactsendRequstModel from "../../Components/contactsendRequstModel";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import { Link } from "react-router-dom";

const AppliedJobAdministration = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modelShow, setModelShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const baseURL = getBaseURL();

  /**
   * get User details
   */
  const getAllJobDetails = async () => {
    try {
      const response = await axiosServiceApi.get(`/careers/applyJob/`);
      if (response?.status === 200) {
        setResponseData(response.data);
        setPageloadResults(true);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };
  useEffect(() => {
    getAllJobDetails();
  }, []);

  const setResponseData = (data) => {
    setUserDetails(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const downloadExcelfile = async () => {
    try {
      const response = await axiosServiceApi.get(`/careers/appliedJobexportExcel/`, {
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

  const downloadPDF = (url) => {
    window.open(url, "_blank", "location=yes,height=800,width=600 ,scrollbars=yes,status=yes");
  };

  const handleApplicantdetailsDelete = (user) => {
    const title = user.firstName;
    const deleteRAQDetailsByID = async () => {
      const response = await axiosServiceApi.delete(`/careers/applyJob/${user.id}/`);
      if (response.status === 204) {
        toast.success(`${title} User details is delete successfully `);
        getAllJobDetails();
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
          <Title title={"Applicant list"} cssClass="fs-1 pageTitle" />
        </div>

        <>
          <div className="col-md-7">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/careers/appliedJobsearchContacts/"}
              adminSearchURL={"/careers/appliedJobsearchContacts/"}
              clientDefaultURL={"/careers/applyJob/"}
              searchfiledDeatails={" Name / Email / Phone Number / Job Title / Job ID"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>

          <div className="col-md-2 p-0">
            <Button
              label={"Download List"}
              handlerChange={downloadExcelfile}
              cssClass="btn btn-outline float-end"
              icon="fa-file-excel-o me-2 d-inline-block"
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
                <th class="align-middle">Job Title</th>
                <th class="align-middle">Job ID</th>
                <th class="align-middle">Date</th>
                <th class="align-middle">Resume</th>
                <th class="align-middle">Action</th>
                {/* <th className="text-end align-middle">Send Request</th> */}
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td class="align-middle">{user.firstName}</td>
                  <td class="align-middle">
                    <i class="fa fs-6 me-2 text-primary fa-envelope" aria-hidden="true"></i>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td class="align-middle">
                    <i class="fa fs-4 me-2 fa-mobile" aria-hidden="true"></i>
                    <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                  </td>
                  <td class="align-middle">{user.jobtitle} </td>
                  <td class="align-middle">{user.jobID} </td>
                  <td class="align-middle">
                    {getDateAndTimeValue(user.created_at)}
                    {getTodayDate(user.created_at) && (
                      <span className="badge bg-warning text-dark px-2 ms-2">NEW</span>
                    )}
                  </td>
                  <td class="align-middle">
                    <a
                      href="#!"
                      onClick={() => downloadPDF(`${user.path}`)}
                      className="mx-1 text-dark"
                    >
                      <i class="fa fs-6 me-2 text-secondary fa-download" aria-hidden="true"></i>
                      {user.original_name ? user.original_name : "Resume"}
                    </a>
                  </td>
                  <td>
                    <Link
                      to=""
                      className=" ms-4"
                      onClick={() => handleApplicantdetailsDelete(user)}
                    >
                      <i
                        className="fa fa-trash-o fs-4 text-danger"
                        aria-hidden="true"
                        title="Delete"
                      ></i>
                    </Link>
                  </td>
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
            paginationURL={"/careers/applyJob/"}
            paginationSearchURL={
              searchQuery
                ? `/careers/appliedJobsearchContacts/${searchQuery}/`
                : "/careers/applyJob/"
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
      {modelShow && <ContactsendRequstModel closeModel={closeModel} selectedUser={selectedUser} />}
      {modelShow && <ModelBg closeModel={closeModel} />}
    </div>
  );
};

export default AppliedJobAdministration;
