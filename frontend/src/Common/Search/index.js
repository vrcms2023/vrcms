import React from "react";

// Components
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getCookie } from "../../util/cookieUtil";

const Search = ({
  setObject,
  clientSearchURL,
  adminSearchURL,
  clientDefaultURL,
  searchfiledDeatails,
  setPageloadResults,
  setSearchquery,
  searchQuery,
  imageGallery,
  setImageGallery,
  noSearchBy,
}) => {
  const userCookie = getCookie("access");

  const onChangeInputHandler = (event) => {
    setSearchquery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchResults();
    }
  };

  // const searchResults = () => {
  //   const searchResults = imageGallery?.filter(image => image.title.toLowerCase() === searchQuery.toLowerCase())
  //   setImageGallery(searchResults);
  // };

  const searchResults = async () => {
    let response;
    try {
      if (searchQuery) {
        response = await axiosClientServiceApi.get(
          `${clientSearchURL}${searchQuery}/`
        );
      } else if (userCookie) {
        response = await axiosServiceApi.get(adminSearchURL);
      } else {
        response = await axiosClientServiceApi.get(clientDefaultURL);
      }
      setObject(response.data);
      setPageloadResults(false);
    } catch (error) {
      console.log("Unable to get the  data");
    }
  };

  return (
    <div className="d-flex justify-conent-start align-items-start flex-column">
      <div className="input-group mb-1 search my-3 my-md-0">
        <input
          type="text"
          className="form-control"
          placeholder="Search by"
          aria-label="Search"
          onChange={onChangeInputHandler}
          onKeyDown={handleKeyDown}
        />
        <span
          className="input-group-text cursorPointer"
          onClick={searchResults}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      {noSearchBy && (
        <div className="d-flex justify-conent-center align-items-center gap-2">
          {/* <span className="text-muted">Search by</span> */}
          <small className="text-dark">
            <span className="fw-bolder">Search by</span> :{" "}
            {searchfiledDeatails ? searchfiledDeatails : ""}
          </small>
        </div>
      )}
    </div>
  );
};

export default Search;
