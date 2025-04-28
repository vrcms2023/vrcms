import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import Error from "../Error";
import _ from "lodash";
import { getCookie, removeCookie } from "../../../util/cookieUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";
import Title from "../../../Common/Title";
import moment from "moment";
import { sortByCreatedDate } from "../../../util/dataFormatUtil";
import { storeServiceMenuValueinCookie } from "../../../util/commonUtil";

import { useLocation } from "react-router-dom";
import { getSelectedMenuDetails } from "../../../util/menuUtil";
import { getMenu } from "../../../redux/auth/authActions";
import { getServiceValues } from "../../../redux/services/serviceActions";

const AddService = ({
  setSelectedServiceProject,
  selectedServiceProject,
  pageType,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [error, setError] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [editServiceObject, setEditServiceObject] = useState("");
  const [userName, setUserName] = useState("");
  const onPageLoadAction = useRef(true);
  const { serviceMenu, serviceerror } = useSelector(
    (state) => state.serviceMenu
  );
  const { menuList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const onChangeHandler = (event) => {
    setError("");
    setServiceName(event.target.value);
  };

  const onClickSelectedService = (item) => {
    storeServiceMenuValueinCookie(item);
    setSelectedServiceProject(item);
    window.scroll(0, 700);
    // document.getElementById('servicesPage').scrollTo(0,100);
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

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
      publish: editServiceObject.publish ? true : false,
    };
    try {
      if (editServiceObject?.id) {
        const _tempEditObj = _.cloneDeep(editServiceObject);
        data["id"] = editServiceObject.id;
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/services/updateService/${editServiceObject.id}/`,
          data
        );
        createChildMenu(
          response.data.services,
          true,
          editServiceObject.services_page_title
        );
        setServiceName("");
        setEditServiceObject({});
      } else {
        response = await axiosServiceApi.post(`/services/createService/`, data);
        createChildMenu(response.data.services, false, "");
      }
      if (response?.status === 201 || response?.status === 200) {
        toast.success(`${serviceName} service is created `);
        setServiceName("");
        dispatch(getServiceValues());

        setSelectedServiceProject(response.data.services);
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
    } else if (serviceMenu) {
      setServiceList(serviceMenu);
    }
    if (serviceMenu?.length === 0) {
      removeCookie("pageLoadServiceID");
      removeCookie("pageLoadServiceName");
    }
  }, [serviceMenu]);

  const publishService = async (item) => {
    try {
      let response = await axiosServiceApi.patch(
        `/services/publishService/${item.id}/`,
        { publish: !item.publish }
      );

      if (response.status === 200) {
        let services = response.data.services;
        toast.success(
          `Service ${
            services.publish ? "published" : "un published"
          } successfully`
        );
        setSelectedServiceProject(response.data.services);
        dispatch(getServiceValues());
      }
    } catch (error) {
      console.log("unable to publish the services");
    }
  };

  const deleteService = (item) => {
    const id = item.id;
    const name = item.services_page_title;
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `services/updateService/${item.id}/`
      );
      if (response.status === 204) {
        const list = serviceList.filter((list) => list.id !== id);
        setServiceList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
  };

  const EditService = (item) => {
    setServiceName(item.services_page_title);
    setEditServiceObject(item);
  };

  const CancelServiceNameChange = () => {
    setServiceName("");
    setEditServiceObject({});
  };

  const createChildMenu = async (serviceResponse, isEdit, oldTilte) => {
    const _data = await getSelectedMenuDetails(
      menuList,
      location,
      serviceResponse,
      isEdit,
      oldTilte
    );

    dispatch(getMenu());
  };

  return (
    <div className="pb-3 border border-0">
      <Title title="Create New Service Page" cssClass="p-3 fs-6 text-dark" />
      <hr className="m-0 mb-5" />
      {/* <h3 className={`text-center ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''} `}>Add New Service </h3> */}

      <div className="container">
        {/* <div className={`container bg-light p-5 border shadow-lg ${selectedServiceProject && selectedServiceProject.publish ? 'border border-success' : ''}`}> */}
        <div className="row">
          {error ? <Error>{error}</Error> : ""}
          <div className="col-md-6 pb-2 pb-md-0 
          d-flex flex-column justify-content-start align-items-center 
          text-center 
          addPageForm">
            <input
              type="text"
              className="form-control py-4 text-center"
              name="services_page_title"
              id=""
              value={serviceName}
              placeholder="Add Service Name"
              onChange={onChangeHandler}
            />

            <div className="d-flex gap-2">
              <Button
                type="submit"
                cssClass="btn btn-secondary mt-3"
                handlerChange={submitHandler}
                label={editServiceObject?.id ? "Change Name" : "Save"}
              />
              {editServiceObject?.id ? (
                <Button
                  cssClass="btn btn-primary mt-3"
                  handlerChange={CancelServiceNameChange}
                  label="Cancel"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-md-6 servicePageLinks">
            {/* <Title title="Pages" cssClass="fs-6 fw-bold text-center border-bottom pb-2 mb-2 " /> */}
            <ul>
              {serviceList &&
                serviceList.map((item) => (
                  <li
                    className={`d-flex justify-content-between align-items-center p-1 px-3
              ${
                item.id === selectedServiceProject?.id
                  ? "border border-1 border-muted shadow-md"
                  : ""
              }`}
                    key={item.id}
                  >
                    <div className="w-50">
                      <Link
                        onClick={(event) => onClickSelectedService(item)}
                        className="text-dark pageTitle"
                      >
                        {item.services_page_title}{" "}
                      </Link>
                    </div>

                    {/* <p>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</p> */}
                    <div className="w-50 text-end">
                      <Link
                        onClick={() => publishService(item)}
                        // className={`p-1 px-2 rounded ${
                        //   item.publish
                        //     ? "bg-success text-white"
                        //     : "bg-secondary text-light"
                        // }`}
                        title={
                          item.publish ? "Page Published" : "Page Not Published"
                        }
                      >
                          {item.publish ? (
                            <span className="text-success fs-5 fw-bold">P</span>
                            // <i
                            //   className="fa fa-thumbs-up fs-5"
                            //   aria-hidden="true"
                            // ></i>
                          ) : (
                            <span className="fs-5 fw-bold notPublished">P</span>
                            // <i
                            //   className="fa fa-thumbs-down"
                            //   aria-hidden="true"
                            // ></i>
                          )}
                      </Link>
                      <Link onClick={() => EditService(item)}>
                        {" "}
                        <i
                          className="fa fa-pencil text-warning fs-5 mx-3"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <Link onClick={() => deleteService(item)}>
                        {" "}
                        <i
                          className="fa fa-trash-o text-danger fs-5"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
