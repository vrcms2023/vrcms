import React from "react";

import Title from "../../Common/Title";
import { showPosteddate } from "../../util/commonUtil";
import ShareButtons from "../../Common/Share";

const JobBriefDetails = ({ jobDetails }) => {
  return (
    <div className="jobBriefDetails position-relative mt-3 mt-md-0">
      <div className="d-flex justify-content-end align-items-end position-absolute" style={{right: "10px"}}><ShareButtons /></div>
      <div className="d-flex justify-content-start align-items-center gap-3">
      <Title
        title={jobDetails.job_title ? jobDetails.job_title : "Default Career"}
        cssClass=""
      />
      <small className="d-block mb-1 text-muted">
        [ {jobDetails.job_location ? jobDetails.job_location : "Default Career"} ]
      </small>
      </div>
      <span className="d-block mb-1">
        <>Experience</> : Minimum{" "}
        {jobDetails.experience_from ? jobDetails.experience_from : 0} to{" "}
        {jobDetails.experience_to ? jobDetails.experience_to : 0} years+
      </span>
      <span className="d-block">
        <>Education</> :{" "}
        {jobDetails.education ? jobDetails.education : "Default Career"}
      </span>

      {/* <hr className="my-2" /> */}

      <div className="d-flex justify-content-between align-items-start align-items-lg-center flex-column flex-lg-row py-2">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
          <div className="d-flex gap-2 justify-content-center align-items-start">
            <strong>Posted </strong>
            <span>{showPosteddate(jobDetails.posted_date)} days ago</span>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-start">
            <strong>Openings</strong>
            {jobDetails.openings ? jobDetails.openings : 0}
          </div>
        </div>

        {/* <a
          className="btn btn-outline mt-3 mt-lg-0"
          href={`mailto:${
            jobDetails.contactEmail
              ? jobDetails.contactEmail
              : "contact@leomtech.com"
          }`}
        >
          Contact US
        </a> */}
      </div>
    </div>
  );
};

export default JobBriefDetails;
