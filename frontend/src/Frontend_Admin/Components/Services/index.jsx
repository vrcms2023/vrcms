import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../../Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosClientServiceApi, axiosServiceApi } from "../../../util/axiosUtil";
import Error from "../Error";
import _ from "lodash";
import { getCookie, removeCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";
import moment from "moment";
import { sortByCreatedDate, sortByDate } from "../../../util/dataFormatUtil";
import { getClonedObject, sortByFieldName, storeServiceMenuValueinCookie } from "../../../util/commonUtil";

import { useLocation } from "react-router-dom";
import { deleteServiceItem, getSelectedMenuDetails } from "../../../util/menuUtil";
import { getMenu } from "../../../redux/auth/authActions";
import { getServiceValues } from "../../../redux/services/serviceActions";
import Ancher from "../../../Common/Ancher";

const AddService = ({ setSelectedServiceProject, selectedServiceProject, pageType, isNewServiceCreated }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const ulRef = useRef(null);
  const [serviceLinksBoxHeight, setServiceLinksBoxHeight] = useState(86);
  const [linkShow, setLinkHide] = useState(true);
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [editServiceObject, setEditServiceObject] = useState("");
  const [userName, setUserName] = useState("");
  const onPageLoadAction = useRef(true);
  const [editState, setEditState] = useState(false);
  const { serviceMenu, serviceerror } = useSelector((state) => state.serviceMenu);
  const { menuList, menuRawList } = useSelector((state) => state.auth);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setError("");
    setServiceName(event.target.value);
  };

  const onClickSelectedService = (item) => {
    isNewServiceCreated.current = false;
    navigate(item.page_url, { replace: true });
    // storeServiceMenuValueinCookie(item);
    // setSelectedServiceProject(item);
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    if (serviceMenu.length > 0) {
      let filterMenu = _.filter(serviceMenu, (item) => {
        return item?.page_url?.toLowerCase() !== "/services/addservices";
      });

      const sortedMapped = sortByFieldName(filterMenu, "service_postion");

      setServiceList(sortedMapped);
    } else {
      setServiceList(serviceMenu);
    }
  }, [serviceMenu]);

  /**
   * Add Service handler
   */
  async function submitHandler(event) {
    if (serviceName === "") {
      setError("Please Enter Service  name");
      return;
    }
    let response = "";
    let data = {
      services_page_title: serviceName,
      created_by: userName,
      pageType: pageType,
      publish: editServiceObject?.publish ? true : false,
    };
    try {
      if (editServiceObject?.id) {
        const _tempEditObj = _.cloneDeep(editServiceObject);
        data["id"] = editServiceObject.id;
        data["updated_by"] = userName;
        data["page_url"] = editServiceObject.page_url;
        response = await axiosServiceApi.put(`/services/updateService/${editServiceObject.id}/`, data);
        createChildMenu(response.data.services, true, editServiceObject.services_page_title);
        setServiceName("");
        setEditServiceObject({});
      } else {
        const _serviceMenuObject = serviceMenu[0];
        const position = Math.floor(parseInt(_serviceMenuObject?.service_postion) / 10);
        data["service_postion"] = position * 10 + serviceMenu.length + 1;
        data["page_url"] = `/services/${serviceName.replace(/\s/g, "").toLowerCase()}`;
        response = await axiosServiceApi.post(`/services/createService/`, data);
        createChildMenu(response.data.services, false, "");
      }
      if (response?.status === 201 || response?.status === 200) {
        const item = response.data.services;
        toast.success(`${serviceName} service is created `);
        setServiceName("");
        dispatch(getServiceValues());
        isNewServiceCreated.current = true;
        setSelectedServiceProject(item);
        navigate(item.page_url, { replace: true });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(`${serviceName} is already register`);
      toast.error(`${serviceName} is already register`);
    }
  }

  // const getServiceList = async () => {
  //   try {
  //     const response = await axiosServiceApi.get(`/services/createService/`);
  //     if (response?.status === 200) {
  //       const data = sortByCreatedDate(response.data.services);
  //       setServiceList(data);
  //       if (onPageLoadAction.current && !getCookie("pageLoadServiceID")) {
  //         setSelectedServiceProject(data[0]);
  //         onPageLoadAction.current = false;
  //       }
  //     }
  //   } catch (e) {
  //     console.log("unable to access ulr because of server is down");
  //   }
  // };

  /**
   *  get Service list on page load
   */
  useEffect(() => {
    if (serviceMenu?.length === 0 && onPageLoadAction.current) {
      onPageLoadAction.current = false;
      dispatch(getServiceValues());
    }

    if (serviceMenu?.length === 0) {
      removeCookie("pageLoadServiceID");
      removeCookie("pageLoadServiceName");
    }
  }, [serviceMenu]);

  const publishService = async (item) => {
    try {
      let response = await axiosServiceApi.patch(`/services/publishService/${item.id}/`, { publish: !item.publish });

      if (response.status === 200) {
        let services = response.data.services;
        toast.success(`Service ${services.publish ? "published" : "un published"} successfully`);
        setSelectedServiceProject(response.data.services);
        dispatch(getServiceValues());
      }
    } catch (error) {
      console.log("unable to publish the services");
    }
  };

  const deleteService = (item) => {
    CancelServiceNameChange();
    const id = item.id;
    const name = item.services_page_title;
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(`/services/updateService/${item.id}/`);
      if (response.status === 204) {
        const deleteresponse = await deleteServiceItem(item.menu_ID);

        dispatch(getServiceValues());
        dispatch(getMenu());
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            // message={`deleting the ${name} Service?`}
            message={
              <>
                Confirm deletion of <span>{name}</span> Service?
              </>
            }
          />
        );
      },
    });
  };

  const EditService = (item) => {
    setServiceName(item?.services_page_title);
    setEditServiceObject(item);
    setEditState(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const CancelServiceNameChange = () => {
    setServiceName("");
    setEditServiceObject({});
    setEditState(false);
    isNewServiceCreated.current = false;
  };

  const createChildMenu = async (serviceResponse, isEdit, oldTilte) => {
    const _data = await getSelectedMenuDetails(menuList, location, serviceResponse, isEdit, oldTilte);
    dispatch(getServiceValues());
    dispatch(getMenu());
  };

  //   const handlerHeightSetting = () => {
  //   if (ulRef.current) {
  //     const fullHeight = ulRef.current.scrollHeight;

  //     if (serviceLinksBoxHeight === "86px") {
  //       const newHeight = fullHeight > 320 ? "320px" : `${fullHeight}px`;
  //       setServiceLinksBoxHeight(newHeight);
  //       setShowAll("FEW ONLY");
  //       setLinkHide(false)
  //     } else {
  //       setServiceLinksBoxHeight("86px");
  //       setShowAll("SHOW ALL..");
  //       setLinkHide(true)
  //     }
  //   }
  // };

  const handlerHeightSetting = () => {
    if (ulRef.current) {
      const fullHeight = ulRef.current.scrollHeight;
      const newHeight = fullHeight > 320 ? 320 : fullHeight;

      if (!isExpanded) {
        // Expand
        setServiceLinksBoxHeight(newHeight);
      } else {
        // Collapse
        setServiceLinksBoxHeight(86);
      }

      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="pb-3 border border-0">
      <Title title="Create New Service Page" cssClass="py-3 fs-5 text-center text-uppercase m-0" />
      <hr className="m-0 mb-5" />
      {/* <h3 className={`text-center ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''} `}>Add New Service </h3> */}

      <div className="container">
        {/* <div className={`container bg-light p-5 border shadow-lg ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''}`}> */}
        <div className="row">
          {error ? <Error>{error}</Error> : ""}
          <div
            className={`col-md-6 pb-2 pb-md-0 
          d-flex flex-column justify-content-start align-items-center 
          text-center ${serviceList.length === 0 ? "offset-md-3" : ""}
          addPageForm`}
          >
            <input
              type="text"
              className={`form-control py-4 text-center fs-4  ${editState ? "border border-warning text-warning" : ""}`}
              name="services_page_title"
              id=""
              value={serviceName}
              placeholder={serviceName || isFocused ? "" : "Add Service Name"}
              onChange={onChangeHandler}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={inputRef}
            />

            <div className="d-flex gap-2">
              <Button
                type="submit"
                // cssClass="btn btn-primary mt-2"
                cssClass={isFocused || serviceName ? "btn btn-primary btn-sm mt-2" : "btn btn-secondary mt-2 disabled"}
                handlerChange={submitHandler}
                label={editServiceObject?.id ? "Change Name" : "SAVE"}
              />
              {editServiceObject?.id ? <Button cssClass="btn btn-outline btn-sm mt-2" handlerChange={CancelServiceNameChange} label="Cancel" /> : ""}
            </div>
          </div>

          {serviceList.length > 0 && (
            <div className={"col-md-6 p-0 servicePageLinks"}>
              {/* <Title title="Pages" cssClass="fs-6 fw-bold text-center border-bottom pb-2 mb-2 " /> */}
              <ul
                ref={ulRef}
                style={{
                  height: `${serviceLinksBoxHeight}px`,
                  maxHeight: "320px",
                  padding: 0,
                  border: "1px solid #ddd",
                  // overflowY: isExpanded && ulRef.current && ulRef.current.scrollHeight > 320 && "auto",
                  overflowY: "auto",
                  transition: "height 0.3s ease",
                }}
              >
                {serviceList &&
                  serviceList.map((item) => (
                    <li
                      className={`d-flex justify-content-between align-items-center py-1
                     ${editState && item.id === editServiceObject?.id ? "border border-warning" : ""} 
              ${item.id === selectedServiceProject?.id ? "border border-1 border-info shadow-md" : ""}`}
                      key={item.id}
                    >
                      <div className="w-50">
                        <Ancher
                          Ancherpath={item.page_url}
                          AncherClass="text-dark pageTitle"
                          AncherLabel={item.services_page_title}
                          handleModel={(event) => onClickSelectedService(item)}
                        />
                        {/* <Link
                        to={item.page_url}
                        onClick={(event) => onClickSelectedService(item)}
                        className="text-dark pageTitle"
                      >
                        {item.services_page_title}{" "}
                      </Link> */}
                      </div>

                      {/* <p>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</p> */}
                      <div className="w-50 text-end publishState">
                        <Link
                          onClick={() => publishService(item)}
                          // className={`p-1 px-2 rounded ${
                          //   item.publish
                          //     ? "bg-success text-white"
                          //     : "bg-secondary text-light"
                          // }`}
                          title={item.publish ? "Page Published" : "Page Not Published"}
                        >
                          {item.publish ? (
                            <span className="text-success fs-5 fw-bold">P</span>
                          ) : (
                            // <i
                            //   className="fa fa-thumbs-up fs-5"
                            //   aria-hidden="true"
                            // ></i>
                            <span className="fs-5 fw-bold notPublished">P</span>
                            // <i
                            //   className="fa fa-thumbs-down"
                            //   aria-hidden="true"
                            // ></i>
                          )}
                        </Link>
                        <Link onClick={() => EditService(item)}>
                          {" "}
                          <i className="fa fa-pencil text-warning fs-5 mx-3" aria-hidden="true"></i>
                        </Link>
                        <Link onClick={() => deleteService(item)}>
                          {" "}
                          <i className="fa fa-trash-o text-danger fs-5" aria-hidden="true"></i>
                        </Link>
                      </div>
                    </li>
                  ))}
              </ul>

              {linkShow && serviceList.length > 2 && (
                <div className="row">
                  <div className="col-12 text-end">
                    <a href="#" className="btn viewAllServices" onClick={() => handlerHeightSetting()}>
                      {isExpanded ? "FEW ONLY" : "SHOW ALL.."}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddService;
