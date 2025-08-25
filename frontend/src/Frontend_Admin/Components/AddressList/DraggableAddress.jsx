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
        <div {...dragHandleProps}>
          <div className="row position-reltive">
            <div className="col-9">
              <p className="m-0 fw-bold">{item?.location_title}</p>
              <small>
                {item?.city} - {item?.postcode}
              </small>
              <small>{item?.state} </small>
            </div>
            <div className="col-3 d-flex justify-content-around align-items-center flex-md-row">
              <Link onClick={(event) => handleCarouselEdit(event, item)}>
                <i
                  className="fa fa-pencil fs-5 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                onClick={(event) => thumbDelete(item?.id, item?.location_title)}
              >
                <i
                  className="fa fa-trash fs-5 text-danger"
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
