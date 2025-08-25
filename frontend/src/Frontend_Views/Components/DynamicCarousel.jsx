import React from "react";
import "./DynamicCarousel.css";
import { getImagePath, getImageURL } from "../../util/commonUtil";
import RichTextView from "../../Common/RichTextView";

const DCarousel = ({ obj, all, closeCarousel }) => {
  // content_type, category, path, image_title, image_description

  const findImg = all.find((item) => item.id === obj.id);
  const imgs = [findImg, ...all];

  const uniqueImgsArray = imgs.filter(function (item, pos) {
    return imgs.indexOf(item) === pos;
  });

  //console.log(uniqueImgsArray, "Video Obj");
  const extractYouTubeEmbed = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div id="carouselExampleIndicators" className="dcarousel carousel slide shadow-lg" data-bs-ride="carousel">
      <span className="closeCarousel" onClick={closeCarousel} onBlur={closeCarousel}>
        <i className="fa fa-times fs-4" aria-hidden="true"></i>
      </span>
      <div className="carousel-inner">
        {uniqueImgsArray.length > 0
          ? uniqueImgsArray.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""} ${item.content_type == ".mp4" || item.category == "VideosGallery" ? "videoGallery" : "imageGallery"}`}
                key={item.id}
              >
                <div className="imgContainer d-flex justify-content-center align-items-center">
                  {item.content_type == ".mp4" || item.category == "VideosGallery" ? (
                    item.video_id ? (
                      <iframe
                        width="100%"
                        height="600"
                        src={`https://www.youtube.com/embed/${extractYouTubeEmbed(item.video_WebURL)}?autoplay=1`}
                        frameBorder="0"
                        allowFullScreen
                        title="YouTube video player"
                        className="d-block"
                      />
                    ) : (
                      <video width="100%" height="740" className="d-block" controls src={obj.path} />
                    )
                  ) : (
                    // <video width="100%" height="740" controls className="d-block w-75">
                    //   <source src={getImagePath(item.path)} type={`video/${item?.content_type.replace(".", "").toUpperCase()}`} />
                    //   Your browser does not support the video tag.
                    // </video>
                    <img src={getImageURL(item)} alt={item.alternitivetext} className="d-block img-fluid" />
                  )}
                </div>
                <div className="imgInfo">
                  {item?.image_title ||
                    (item?.client_title && (
                      <h5 className=" w-100 py-2 fs-4 text-center d-block" style={{}}>
                        {item?.image_title || item?.client_title}
                      </h5>
                    ))}
                  {item?.image_description ||
                    (item?.client_description && (
                      // <p
                      //   className=" w-100 px-0 text-center"
                      //   style={{

                      //   }}
                      // >
                      //   {item?.image_description}
                      // </p>

                      <RichTextView
                        data={item?.image_description || item?.client_description}
                        className={" w-100 px-0 text-center"}
                        showMorelink={false}
                      />
                    ))}
                </div>
              </div>
            ))
          : null}
      </div>
      {obj.category === "VideosGallery" ? "" : (
        <>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      </>
      )}
      
    </div>
  );
};
export default DCarousel;
