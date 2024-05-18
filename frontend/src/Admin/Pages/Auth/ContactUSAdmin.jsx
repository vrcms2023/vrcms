import React, { useEffect, useState } from "react";
import Title from "../../../Common/Title";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { toast } from "react-toastify";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { paginationDataFormat } from "../../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";

const ContactUSAdmin = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="container-fluid pt-5">
      <div className="row mb-4">
        <div className="col-md-6">&nbsp;</div>
        <div className="col-md-6"></div>
      </div>
      <div className="row px-3 px-lg-5">
        <div className="col-md-6">
          <Title title={"Contact list"} cssClass="fs-1 pageTitle" />
        </div>
        <div className="col-md-6">
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
      </div>

      <div className="row px-3 px-lg-5 py-4 table-responsive">
        {userDetails?.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>Email</th>
                <th>phoneNumber</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.description} </td>
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
    </div>
  );
};

export default ContactUSAdmin;
