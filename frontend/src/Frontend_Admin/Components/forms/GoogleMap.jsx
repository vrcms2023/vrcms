import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Components
import Button from "../../../Common/Button";
import { getCookie } from "../../../util/cookieUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { axiosServiceApi } from "../../../util/axiosUtil";

const GoogleMap = ({ editHandler, componentType, mapValues, popupTitle }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  const [userName, setUserName] = useState("");
  const defalutMap =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202";

  const [google_map_url, setGoogle_map_url] = useState(
    mapValues?.google_map_url ? mapValues?.google_map_url : defalutMap
  );

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const onChangeHandler = (event) => {
    setGoogle_map_url(event.target.value);
  };

  const saveGoogleMapUrl = async () => {
    let response = "";
    try {
      let data = {
        google_map_url: google_map_url,
      };

      if (mapValues?.id) {
        data["updated_by"] = userName;
        data["id"] = mapValues.id;
        response = await axiosServiceApi.put(
          `/footer/updateGoogleMapURL/${mapValues.id}/`,
          data
        );
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(
          `/footer/createGoogleMapURL/`,
          data
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(`Footer Values are updated successfully `);
        closeHandler();
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={popupTitle} />
      <hr className="m-0" />
      <div className="container my-3">
        <div className="row">
          <label
            htmlFor="googlemap"
            className="col-sm-12 col-form-label text-capitalize"
          >
            Google {componentType}
          </label>
          <div className="col-sm-12">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="8"
              name="google_map_url"
              value={google_map_url}
              onChange={onChangeHandler}
            ></textarea>
            <small className="mt-3 mb-2 fw-bold d-inline-block">
              Example : Copy the google "Embed a map" script like below
            </small>
            <code className="d-block">
              &lt;iframe className="googlemap"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"
              height="450" width="100%" &gt; &;t;/iframe&gt;
            </code>
          </div>

          <div className="row mt-3">
            <div className="d-flex justify-content-center flex-wrap flex-column flex-sm-row align-items-center gap-2">
              <button onClick={saveGoogleMapUrl} className="btn btn-primary">
                Save
              </button>
              <Button
                type="submit"
                cssClass="btn btn-more"
                label={"Close"}
                handlerChange={closeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
