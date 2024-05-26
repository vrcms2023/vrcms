import React, { useState, useEffect } from "react";


import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Admin/Components/BriefIntro/index";
import {
  getFormDynamicFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import { paginationDataFormat, sortByFieldName } from "../../../util/commonUtil";
import Title from "../../../Common/Title";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import AddEditAdminNews from "../../../Admin/Components/News";
import { toast } from "react-toastify";

import { getClinetLogsFields } from "../../../util/dynamicFormFields";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { ClientStyled } from "../../../Common/StyledComponents/Styled-Clients";
import { ClientListComponent } from "../../Components/ClientListComponent";
import NoteComponent from "../../../Common/NoteComponent";
import EditIcon from "../../../Common/AdminEditIcon";
import Banner from "../../../Common/Banner";

const ClientsList = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "clients";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [clientsList, setClientsList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  const [paginationData, setPaginationData] = useState({});
  const [pageLoadResult, setPageloadResults] = useState(false);
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const setResponseData = (data) => {
    setClientsList(
      data.results.length > 0
        ? sortByFieldName(data.results, "client_position")
        : []
    );
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!componentEdit.addSection || !componentEdit.editSection) {
      getClinetDetails();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  const getClinetDetails = async () => {
    try {
      const response = await axiosClientServiceApi.get(
        `/client/getAllClientLogos/`
      );
      if (response?.status === 200) {
        setResponseData(response.data);
      }
    } catch (error) {
      console.log("unable to access ulr because of server is down");
    }
  };

  useEffect(() => {
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });

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

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.client_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/client/updateClientLogo/${id}/`
      );
      if (response.status === 204) {
        const list = clientsList.filter((list) => list.id !== id);
        setClientsList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };

  return (
    <>
      {/* Page Banner Component */}
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
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
            dimensions={imageDimensionsJson("banner")}
          />
        </div>
      ) : (
        ""
      )}

      {/* Brief Introduction */}
      {isAdmin && hasPermission && (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      )}

      <BriefIntroFrontend
        introState={componentEdit.briefIntro}
        pageType={pageType}
      />

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      {/* Add Clients */}
      <div className="container-fluid container-lg my-md-5 ">
        <div className="row">
          {isAdmin && hasPermission && (
            <div className="col-md-12">
              <div className="d-flex justify-content-end align-items-center mb-3">
                {/* <span className="fw-bold me-2">Add content </span> */}
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("addSection", true, {})}
                >
                  Add New Client{" "}
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="Clients" cssClass="fs-1 pageTitle" />
          </div>

          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/client/searchClientLogos/"}
              adminSearchURL={"/client/createClientLogo/"}
              clientDefaultURL={"/client/getAllClientLogos/"}
              searchfiledDeatails={"client Title / client description "}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              imageGetURL="client/createClientLogo/"
              imagePostURL="client/createClientLogo/"
              imageUpdateURL="client/updateClientLogo/"
              imageDeleteURL="client/updateClientLogo/"
              imageLabel="Add Client Logo"
              showDescription={false}
              showExtraFormFields={getClinetLogsFields()}
              dimensions={imageDimensionsJson("aboutus")}
              scrollEnable={false}
            />
          </div>
        ) : (
          ""
        )}
        <br />
        {isAdmin && (
          <NoteComponent note="Use drag option to shuffle the Items" />
        )}
        <ClientStyled>
          <ClientListComponent
            clientsList={clientsList}
            setClientsList={setClientsList}
            deleteAboutSection={deleteAboutSection}
            editHandler={editHandler}
            getClinetDetails={getClinetDetails}
          />
        </ClientStyled>
        {paginationData?.total_count ? (
          <CustomPagination
            paginationData={paginationData}
            paginationURL={
              isAdmin
                ? "/client/createClientLogo/"
                : "/client/getAllClientLogos/"
            }
            paginationSearchURL={
              searchQuery
                ? `/client/searchClientLogos/${searchQuery}/`
                : isAdmin
                  ? "/client/createClientLogo/"
                  : "/client/getAllClientLogos/"
            }
            searchQuery={searchQuery}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setResponseData={setResponseData}
            pageLoadResult={pageLoadResult}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ClientsList;
