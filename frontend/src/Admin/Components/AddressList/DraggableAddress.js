import React, { forwardRef } from "react";

import { Link } from "react-router-dom";

const DraggableAddress = forwardRef(
  (
    {
      item,
      date,
      id,
      dragHandleProps,
      snapshot,
      handleCarouselEdit,
      thumbDelete,
      ...props
    },
    ref
  ) => {
    // The styling is provided for demo purpose. Prefer using a class or some css-in-js library.
    return (
      <li
        ref={ref}
        {...props}
        className={"card p-2 my-2 " + (snapshot.isDragging ? "hovering" : "")}
      >
        <div>
          <div className="row position-reltive">
           
          <span {...dragHandleProps} className="position-absolute" style={{top: "-1px", left: "-30px", padding: "5px", background: "#ddd", width: "30px", borderRadius: "5px"}}>
                <i className="fa fa-arrows-alt fs-5" aria-hidden="true"></i>
              </span>
           
            <div className="col-8">
              <p className="m-0 fw-bold">{item?.location_title}</p>
              <small>
                {item?.city} - {item?.postcode}
              </small>{" "}
              <br />
              <small>{item?.state} </small>
            </div>
            <div className="col-4 d-flex justify-content-around align-items-center flex-md-row gap-3">
              <Link onClick={(event) => handleCarouselEdit(event, item)}>
                <i
                  className="fa fa-pencil fs-4 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                onClick={(event) => thumbDelete(item?.id, item?.location_title)}
              >
                <i
                  className="fa fa-trash fs-4 text-danger"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default DraggableAddress;
