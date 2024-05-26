import React from "react";
import Search from "../../../Common/Search";

const FilterComponent = () => {
  return (
    <div className="container position-relative ">
      <div className="row rounded-3 position-absolute overflow-hidden productCategorySearch">
        <div className="col-md-12 px-5 productCategory d-flex justify-content-center align-items-center">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-12 p-0 productSearch d-flex justify-content-center align-items-center">
          <Search
            setObject={""}
            clientSearchURL={""}
            adminSearchURL={""}
            clientDefaultURL={""}
            searchfiledDeatails={"Product Name"}
            setPageloadResults={""}
            setSearchquery={""}
            searchQuery={""}
            hideSearchBy="true"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
