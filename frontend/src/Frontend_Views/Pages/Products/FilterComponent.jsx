import React from "react";
import Search from "../../../Common/Search";
import _ from "lodash";

const FilterComponent = ({
  category,
  selectedCategory,
  setSelectedCategory,
  setResponseData,
  setPageloadResults,
  setSearchquery,
  searchQuery,
  searchBy,
  hideSearchBy,
}) => {
  if (category.length === 0) return;
  const changeCategory = (event) => {
    const item = _.filter(category, (item) => {
      return item.id === event.target.value;
    })[0];
    if (item) {
      setSelectedCategory(item);
    }
  };
  return (
    <div className="container position-relative ">
      <div className="row rounded-3 position-absolute overflow-hidden productCategorySearch">
        <div className="col-md-12 px-md-5 productCategory d-flex justify-content-center align-items-center">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={changeCategory}
          >
            <option defaultValue>Open this select menu</option>
            {category.map((option, index) => (
              <option
                key={index}
                selected={option.id === selectedCategory?.id}
                value={option.id}
              >
                {option.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12 p-0 productSearch d-flex justify-content-center align-items-center">
          <Search
            results={category}
            setObject={setResponseData}
            clientSearchURL={`/products/productSearch/${selectedCategory.id}/`}
            adminSearchURL={`/products/createProduct/${selectedCategory.id}/`}
            clientDefaultURL={`/products/productSearch/${selectedCategory.id}/`}
            searchfiledDeatails={"Product Name"}
            setPageloadResults={setPageloadResults}
            setSearchquery={setSearchquery}
            searchQuery={searchQuery}
            searchBy={searchBy ? searchBy : "Search By"}
            hideSearchBy={hideSearchBy}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
