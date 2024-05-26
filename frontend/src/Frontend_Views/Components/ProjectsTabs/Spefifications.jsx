import React from "react";

const Spefifications = ({ specifications }) => {
  return (
    <>
      {specifications.map((spec, i) => (
        <div className="mt-4 px-3" key={i}>
          <h6 className="text-dark fw-bold">{spec.title}</h6>
          <p>{spec.feature}</p>
        </div>
      ))}
    </>
  );
};

export default Spefifications;
