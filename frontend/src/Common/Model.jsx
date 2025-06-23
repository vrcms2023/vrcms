import React from "react";
import RichTextView from "./RichTextView";

const Model = ({ obj, closeModel, flag }) => {
  // console.log(obj)

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
    <div
      className="modal d-block modal-lg"
      tabIndex="-1"
      style={{ position: "absolute", zIndex: 99999 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
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
          <div className="modal-body">
            <div className="text-center">
              {obj.path && (
                <img src={obj.path} alt="Testimonial" className="img-fluid" />
              )}
            </div>
            <RichTextView data={obj.data || obj.testimonial_description} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Model;
