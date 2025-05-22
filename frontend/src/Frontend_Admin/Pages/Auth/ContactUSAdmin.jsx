import React, { useEffect, useState } from "react";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import {
  getDateAndTimeValue,
  getTodayDate,
  paginationDataFormat,
} from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import Button from "../../../Common/Button";
import Ancher from "../../../Common/Ancher";
import { getBaseURL } from "../../../util/ulrUtil";

import Model from "../../../Common/Model";
import ModelBg from "../../../Common/ModelBg";
import ContactsendRequstModel from "../../Components/contactsendRequstModel";

const ContactUSAdmin = () => {
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

  useEffect(() => {
    const getAllUserDetails = async () => {
      try {
        const response = await axiosServiceApi.get(`/contactus/`);
        if (response?.status === 200 && response.data?.results?.length > 0) {
          setResponseData(response.data);
          setPageloadResults(true);
        }
      } catch (error) {
        toast.error("Unable to load contactus details");
      }
    };

    getAllUserDetails();
  }, []);

  const setResponseData = (data) => {
    setUserDetails(
      data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const downloadExcelfile = async () => {
    try {
      const response = await axiosServiceApi.get(`/contactus/exportExcel/`, {
        responseType: "blob",
        withCredentials: true,
      });
      const filename = response.headers["content-disposition"]
        .split("filename=")[1]
        .replace(/"/g, "");
      console.log("filename", filename);
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

  const sendRequest = async (user) => {
    const data = {
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      description: user.description,
    };
    try {
      const response = await axiosServiceApi.post(
        `/contactus/sendRequesttoClient/`,
        {
          ...data,
        }
      );

      if (response.status === 200) {
        toast.success(`Request is sent successfully`);
      }
    } catch (error) {
      console.log("unable to save the career form");
    }
  };

  const showModel = (user) => {
    setModelShow(!modelShow);
    setSelectedUser(user);
  };

  const closeModel = () => {
    setModelShow(!modelShow);
    setSelectedUser("");
  };

  return (
    <div className="container-fluid pt-5 contactsList">
      <div className="row px-2 px-lg-5">
        <div className="col-md-2">
          <Title title={"Contact list"} cssClass="fs-1 pageTitle" />
        </div>
        <div className="col-md-8">
          <Search
            setObject={setResponseData}
            clientSearchURL={"/contactus/searchContacts/"}
            adminSearchURL={"/contactus/"}
            clientDefaultURL={"/contactus/"}
            searchfiledDeatails={"First Name / Email / Phone Number"}
            setPageloadResults={setPageloadResults}
            setSearchquery={setSearchquery}
            searchQuery={searchQuery}
          />
        </div>
        <div className="col-md-2 p-0">
          <Button
            label={"Contacts"}
            handlerChange={downloadExcelfile}
            cssClass="btn btn-outline float-end"
            icon="fa-download"
          />
        </div>
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
                <th className="text-end align-middle">Send Request</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td class="align-middle">{user.firstName}</td>
                  <td class="align-middle">{user.email}</td>
                  <td class="align-middle">{user.phoneNumber}</td>
                  <td class="align-middle">{user.description} </td>
                  <td class="align-middle">
                    {getDateAndTimeValue(user.created_at)}
                    {getTodayDate(user.created_at) && (
                      <span className="badge bg-warning text-dark px-2 ms-2">
                        NEW
                      </span>
                    )}
                  </td>
                  <td class="align-middle">
                    <Button
                      label={"Send Request"}
                      handlerChange={() => {
                        //sendRequest(user);
                        showModel(user);
                      }}
                      cssClass="btn btn-outline px-3 float-end"
                      icon="fa-paper-plane"
                    />
                    {/* <Ancher
                      AncherClass="btn btn-outline px-3 float-end"
                      AncherLabel="Send Request "
                      icon="fa-paper-plane"
                    /> */}
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
            paginationURL={"/contactus/"}
            paginationSearchURL={
              searchQuery
                ? `/contactus/searchContacts/${searchQuery}/`
                : "/contactus/"
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
      {modelShow && (
        <ContactsendRequstModel
          closeModel={closeModel}
          selectedUser={selectedUser}
        />
      )}
      {modelShow && <ModelBg closeModel={closeModel} />}
    </div>
  );
};

export default ContactUSAdmin;
