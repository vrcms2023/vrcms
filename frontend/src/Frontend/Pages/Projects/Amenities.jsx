import React from "react";
import Title from "../../../Common/Title";

const Amenities = () => {
  return (
    <>
      <Title title="Amenties" cssClass="fw-normal fs-1" />
      <Title
        title="Move into a home that will reflect your lifestyle"
        cssClass="fw-normal fs-5 text-dark"
      />
      <hr />
      <Title
        title="2BHK/3BHK Gated Community HPR Lakefront@ HAFEEZPET"
        cssClass="fw-normal fs-2 my-5 text-white text-center text-dark"
      />
      <hr />
      <div className="d-flex justify-content-between align-items-center pt-4">
        <ul className="list-group list-unstyled mx-5 w-50">
          <li className="mb-3">GHMC Approved Project</li>
          <li className="mb-3">Hight-rise Gated community</li>
          <li className="mb-3">Cellar + Stilt + 8 floors</li>
          <li className="mb-3">146 no. of units</li>
          <li className="mb-3">Available in 2 &amp; 3BHK Configuration</li>
          <li className="mb-3">100% Vastu compliant</li>
          <li className="mb-3">24 hrs Security with CCTV Camers</li>
          <li className="mb-3">Well-Ventilated individual units</li>
          <li className="mb-3">No Common Walls</li>
          <li className="mb-3">
            Upto 1KVA (ACCL) D.G Backup for each flat and 100% D.G backup for
            common areas
          </li>
          <li className="mb-3">Rain Water harvesting pits</li>
          <li className="mb-3">Prime Location</li>
        </ul>
        <ul className="list-group list-unstyled mx-5 w-50">
          <li className="mb-3">Gymnasium</li>
          <li className="mb-3">Meditation / Yoga Room</li>
          <li className="mb-3">Aerobics</li>
          <li className="mb-3">Mini Party hall</li>
          <li className="mb-3">Guest rooms</li>
          <li className="mb-3">Children play area</li>
          <li className="mb-3">Provision for Super Market</li>
          <li className="mb-3">Tennis Cout</li>
          <li className="mb-3">Half Baskeball Court</li>
          <li className="mb-3">Sitting Area</li>
          <li className="mb-3">Walking Track</li>
          <li className="mb-3">
            Indoor Games: Billiards, Carrom Table Tennis etc.,
          </li>
        </ul>
      </div>
    </>
  );
};

export default Amenities;
