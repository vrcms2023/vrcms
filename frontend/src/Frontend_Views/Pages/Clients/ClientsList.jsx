import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import ImageInputsForm from "../../../Frontend_Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../../Frontend_Admin/Components/BriefIntro/index";
import { getFormDynamicFields, imageDimensionsJson } from "../../../util/dynamicFormFields";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import { paginationDataFormat, sortByFieldName } from "../../../util/commonUtil";
import Title from "../../../Common/Title";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import AddEditAdminNews from "../../../Frontend_Admin/Components/News";
import { toast } from "react-toastify";

import { getClinetLogsFields } from "../../../util/dynamicFormFields";
import Search from "../../../Common/Search";
import CustomPagination from "../../../Common/CustomPagination";
import { ClientStyled } from "../../../Common/StyledComponents/Styled-Clients";
import { ClientListComponent } from "../../Components/ClientListComponent";
import NoteComponent from "../../../Common/NoteComponent";
import EditIcon from "../../../Common/AdminEditIcon";
import Banner from "../../../Common/Banner";
import ShowHideToggle from "../../../Common/ShowHideToggle";
import {
  createShowHideComponent,
  getAllShowHideComponentsList,
  updateShowHideComponent,
} from "../../../redux/showHideComponent/showHideActions";
import { getObjectsByKey } from "../../../util/showHideComponentUtil";
import PageBannerComponent from "../../../Common/Banner/PageBannerComponent";

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
    if (data?.results?.length > 0) {
      const _clientList = sortByFieldName(data.results, "client_position");
      setClientsList(_clientList);
      setPaginationData(paginationDataFormat(data));
      setCurrentPage(1);
    } else {
      setClientsList(data.clientLogo);
    }
  };

  useEffect(() => {
    if ((!componentEdit.addSection || !componentEdit.editSection) && !searchQuery) {
      getClinetDetails();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

  const getClinetDetails = async () => {
    try {
      const response = await axiosClientServiceApi.get(`/client/getAllClientLogos/`);
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
      const response = await axiosServiceApi.delete(`/client/updateClientLogo/${id}/`);
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
            // message={`deleting the ${name} Service?`}
            message={
              <>
                Confirm deletion of <span>{name}</span> service?
              </>
            }
          />
        );
      },
    });
  };

  const [showHideCompList, setShowHideCompList] = useState([]);
  const dispatch = useDispatch();
  const { error, success, showHideList } = useSelector((state) => state.showHide);

  useEffect(() => {
    if (showHideList.length > 0) {
      setShowHideCompList(getObjectsByKey(showHideList));
    }
  }, [showHideList]);

  const showHideHandler = async (id, compName) => {
    if (id) {
      dispatch(updateShowHideComponent(id));
    } else {
      const newData = {
        componentName: compName.toLowerCase(),
        pageType: pageType,
      };
      dispatch(createShowHideComponent(newData));
    }
  };

  return (
    <>
      {/* Page Banner Component */}
      <PageBannerComponent
        editHandler={editHandler}
        componentEdit={componentEdit}
        pageType={pageType}
        category={"clientlist-banner"}
        showHideCompList={showHideCompList}
        showHideHandler={showHideHandler}
        popupTitle={"Client List Banner"}
        showHideComponentName={"clientlistbanner"}
      />

      <div
        className={
          showHideCompList?.clientsbriefintro?.visibility && isAdmin && hasPermission
            ? "componentOnBorder"
            : ""
        }
      >
        {isAdmin && hasPermission && (
          <ShowHideToggle
            showhideStatus={showHideCompList?.clientsbriefintro?.visibility}
            title={"A Brief Introduction Component"}
            componentName={"clientsbriefintro"}
            showHideHandler={showHideHandler}
            id={showHideCompList?.clientsbriefintro?.id}
          />
        )}

        {/* INTRODUCTION COMPONENT */}
        {showHideCompList?.clientsbriefintro?.visibility && (
          <div>
            {/* Brief Introduction */}
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("briefIntro", true)} />
            )}

            <BriefIntroFrontend
              introState={componentEdit.briefIntro}
              pageType={pageType}
              introTitleCss="fs-3 fw-medium text-md-center"
              introSubTitleCss="fw-medium text-muted text-md-center"
              introDecTitleCss="fs-6 fw-normal w-75 m-auto text-md-center"
            />
            {componentEdit.briefIntro && (
              <div className={`adminEditTestmonial selected `}>
                <AdminBriefIntro
                  editHandler={editHandler}
                  popupTitle="Client list"
                  componentType="briefIntro"
                  pageType={pageType}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Clients */}
      <div className="container-fluid container-lg my-md-5 ">
        {/* <div className="row">
          {isAdmin && hasPermission && (
            <div className="col-md-12">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <button
                  type="submit"
                  className="btn btn-outline px-3"
                  onClick={() => editHandler("addSection", true, {})}
                >
                  New Client
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div> */}

        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start">
            <Title title="Clients" cssClass="pageTitle fs-4" />

            {isAdmin && hasPermission && (
              <div className="">
                <button
                  type="submit"
                  className="btn btn-outline px-3 ms-3"
                  onClick={() => editHandler("addSection", true, {})}
                >
                  New
                  <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
              </div>
            )}
          </div>

          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/client/searchClientLogos/"}
              adminSearchURL={"/client/createClientLogo/"}
              clientDefaultURL={"/client/getAllClientLogos/"}
              searchfiledDeatails={"client Title"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
              addStateChanges={componentEdit.addSection}
              editStateChanges={!componentEdit.editSection}
            />
          </div>
        </div>
        {componentEdit.editSection || componentEdit.addSection ? (
          <div className={`adminEditTestmonial selected `}>
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              popupTitle="Client"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${componentEdit.editSection ? "editSection" : "addSection"}`}
              imageGetURL="client/createClientLogo/"
              imagePostURL="client/createClientLogo/"
              imageUpdateURL="client/updateClientLogo/"
              imageDeleteURL="client/updateClientLogo/"
              imageLabel="Upload Image"
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
          <NoteComponent note="Use drag option to shuffle the Items" cssClass="bg-warning" />
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
            paginationURL={isAdmin ? "/client/createClientLogo/" : "/client/getAllClientLogos/"}
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
