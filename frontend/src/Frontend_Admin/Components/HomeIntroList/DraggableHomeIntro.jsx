import React, { forwardRef } from "react";

import { Link } from "react-router-dom";

const DraggableHomeIntro = forwardRef(
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
            <div className="col-8">
              <p className="m-0 fw-bold">{item?.intro_title}</p>
            </div>
            <div className="col-4 d-flex justify-content-around align-items-center flex-md-row gap-3">
              <Link onClick={(event) => handleCarouselEdit(event, item)}>
                <i
                  className="fa fa-pencil fs-4 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                onClick={(event) => thumbDelete(item?.id, item?.intro_title)}
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

export default DraggableHomeIntro;
