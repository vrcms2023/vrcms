import React, { useEffect } from "react";

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
  hideSearchBy = true,
  searchBy = " Search ",
  addStateChanges,
  editStateChanges,
  cssClass
}) => {
  const userCookie = getCookie("access");

  const onChangeInputHandler = (event) => {
    setSearchquery(event.target.value);
    if (!event.target.value) {
      searchResults();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchResults();
    }
  };

  // console.log(hideSearchBy, "hideSearchBy")

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

  useEffect(() => {
    if (!addStateChanges && searchQuery) {
      searchResults();
    }
  }, [addStateChanges]);

  useEffect(() => {
    if (editStateChanges && searchQuery) {
      searchResults();
    }
  }, [editStateChanges]);

  return (
    <div className={`${cssClass} d-flex justify-conent-start align-items-start flex-column`}>
      <div className="input-group mb-1 search my-2 my-md-0 ">
        <input
          type="text"
          className="form-control"
          placeholder={searchBy}
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
      {hideSearchBy && (
        <div className="d-flex justify-conent-center align-items-center gap-2">
          {/* <span className="text-muted">Search by</span> */}
          <small className="text-dark">
            <span className="fw-bolder">Search by</span> :{" "}
            <span>{searchfiledDeatails ? searchfiledDeatails : ""}</span>
          </small>
        </div>
      )}
    </div>
  );
};

export default Search;
