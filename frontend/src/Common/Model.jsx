import React from "react";
import { getBaseURL } from "../util/ulrUtil";

const Model = ({ obj, closeModel, flag }) => {
  // console.log(obj)
  const baseURL = getBaseURL();
  // const { dec, title, cr, crm } = privacy;

  // const newImages = obj.imageUrls.length > 0 ? (
  //     <div className="">
  //       <h5 className="text-dark text-center ">Images</h5>
  //       <hr className="m-0 mb-3" />
  //       {imageUrls.map((img) => (
  //         <img src={img} key={img} alt="" width="250" className="m-2" />
  //       ))}
  //     </div>
  //   ) : null;

  return (
    <div className="modal d-block modal-lg" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-dark fw-bold">{obj.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModel}
            ></button>
          </div>
          <div
            className="p-3"
            dangerouslySetInnerHTML={{
              __html: obj && obj.data,
            }}
          ></div>

          {/* {obj && (
                <div className="p-4">
                   dangerouslySetInnerHTML={{
                        __html: (obj.data),
                      }}
                  </div>
              )} */}

          {/* <div className="modal-footer text-center">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModel}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
        </div>
      </div>
    </div>
  );
};
export default Model;
