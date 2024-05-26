import React from "react";

import Title from "../../Common/Title";
import { showPosteddate } from "../../util/commonUtil";

const JobBriefDetails = ({ jobDetails }) => {
  return (
    <div className="jobBriefDetails p-4">
      <Title
        title={jobDetails.job_title ? jobDetails.job_title : "Default Career"}
        cssClass="fw-bold"
      />
      <small className="d-block mb-3 text-muted">
        {jobDetails.job_location ? jobDetails.job_location : "Default Career"}
      </small>
      <span className="d-block mb-1">
        <strong>Experience</strong> : Minimum{" "}
        {jobDetails.experience_from ? jobDetails.experience_from : 0} to{" "}
        {jobDetails.experience_to ? jobDetails.experience_to : 0} years+
      </span>
      <span className="d-block">
        <strong>Education</strong> :{" "}
        {jobDetails.education ? jobDetails.education : "Default Career"}
      </span>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-start align-items-lg-center flex-column flex-lg-row">
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
        <a
          className="btn btn-primary mt-3 mt-lg-0"
          href={`mailto:${
            jobDetails.contactEmail
              ? jobDetails.contactEmail
              : "contact@leomtech.com"
          }`}
        >
          Contact US
        </a>
      </div>
    </div>
  );
};

export default JobBriefDetails;
