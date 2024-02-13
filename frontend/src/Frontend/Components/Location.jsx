import React from "react";
import Title from "../../Common/Title";

const Location = () => {
  return (
    <>
      {/* <Title title="Location" cssClass="fw-normal fs-1 pt-5"/> */}
      <iframe
        className="googlemap"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"
        height="850px"
        width="100%"
      ></iframe>
    </>
  );
};

export default Location;
