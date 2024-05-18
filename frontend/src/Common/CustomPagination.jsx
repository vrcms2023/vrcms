import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosClientServiceApi, axiosServiceApi } from "../util/axiosUtil";
import { getCookie } from "../util/cookieUtil";

const CustomPagination = ({
  paginationData,
  paginationURL,
  paginationSearchURL,
  setCurrentPage,
  currentPage,
  setResponseData,
  pageLoadResult,
}) => {
  const { total_count, per_page_size, next_url, previous_url } = paginationData;
  const userCookie = getCookie("access");
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(total_count / per_page_size); i++) {
    pageNumbers.push(i + 1);
  }

  const getSelectedPageData = async (number) => {
    const apiURL = pageLoadResult ? paginationURL : paginationSearchURL;
    let response;
    try {
      if (userCookie) {
        response = await axiosServiceApi.get(`${apiURL}?p=${number}`);
      } else {
        response = await axiosClientServiceApi.get(`${apiURL}?p=${number}`);
      }

      if (response?.status === 200 && response.data?.results?.length > 0) {
        setResponseData(response.data);
        setCurrentPage(number);
      }
    } catch (error) {
      toast.error("Unable to load contactus details");
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${previous_url ? "" : "disabled"}`}>
          <Link
            to={"#"}
            onClick={() => getSelectedPageData(currentPage - 1)}
            className="page-link"
            tabIndex="-1"
          >
            Previous
          </Link>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <Link
              className="page-link"
              to={"#"}
              onClick={() => getSelectedPageData(number)}
            >
              {number}
            </Link>
          </li>
        ))}

        <li className={`page-item ${next_url ? "" : "disabled"}`}>
          <Link
            to={"#"}
            onClick={() => getSelectedPageData(currentPage + 1)}
            className="page-link"
            tabIndex="-1"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default CustomPagination;
