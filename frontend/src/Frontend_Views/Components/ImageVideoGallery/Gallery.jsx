import React, { useState } from "react";
import EditIcon from "../../../Common/AdminEditIcon";
import Banner from "../../../Common/Banner";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import Search from "../../../Common/Search";
import Title from "../../../Common/Title";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import { paginationDataFormat } from "../../../util/commonUtil";
import GalleryImage from "./GalleryImage";

const Gallery = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "imgGallery";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState([]);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const gallerySoruce = [
    {
      url: "https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
      description: "Photo Description",
      title: "NEOM",
      tags: ["hills", "Planet", "Mars"],
    },
    {
      url: "https://images.unsplash.com/photo-1707779734349-ef2bba17dfdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
      description: "Photo Description",
      title: "City on Water",
      tags: ["hills", "Planet", "Mars"],
    },
    {
      url: "https://images.unsplash.com/photo-1707343846292-56e4c6abf291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
      description: "Photo Description",
      title: "Under Water",
      tags: ["hills", "Planet", "Mars"],
    },
    {
      url: "https://images.unsplash.com/photo-1682685796186-1bb4a5655653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
      description: "Photo Description",
      title: "Mountain Climbing",
      tags: ["hills", "Planet", "Mars"],
    },
  ];
  const [imageGallery, setImageGallery] = useState(gallerySoruce);

  const setResponseData = (data) => {
    setTeam(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);

    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    } else {
      setEditCarousel({});
    }
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className="position-relative">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>

      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            popupTitle="Gallery Banner"
            pageType={`${pageType}-banner`}
            imageLabel="Gallery Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      <div className="container-fluid">
        <div className="row mb-4 px-5 py-4">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Image Gallery" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6 mb-4">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/ourteam/OurteamSearchAPIView/"}
              adminSearchURL={"/ourteam/createteam/"}
              clientDefaultURL={"/ourteam/clentViewOurTeamDetails/"}
              searchfiledDeatails={"Imae Name, Image Title"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
              imageGallery={imageGallery}
              setImageGallery={setImageGallery}
            />
          </div>
        </div>

        <div className="row mb-4">
          {imageGallery?.map((item, index) => (
            <GalleryImage image={item} key={index} />
          ))}
          {/* <div className="col-md-3 mb-3">
            
            <img src='https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8' className='w-100' />
            <h6><Title title="Image Title"/></h6>
          </div>

          <div className="col-md-3 mb-3">
            <img src='https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8' className='w-100' />
            <h6><Title title="Image Title"/></h6>
          </div>

          <div className="col-md-3 mb-3">
            <img src='https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8' className='w-100' />
            <h6><Title title="Image Title"/></h6>
          </div>

          <div className="col-md-3 mb-3">
            <img src='https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8' className='w-100' />
            <h6><Title title="Image Title"/></h6>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Gallery;
