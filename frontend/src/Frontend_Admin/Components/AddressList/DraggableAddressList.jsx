import React, { forwardRef } from "react";

const DraggableAddressList = forwardRef(({ children, ...props }, ref) => {
  return (
    <ul ref={ref} className="addresslist p-0" style={{ height: "100%" }}>
      {children}
    </ul>
  );
});

export default DraggableAddressList;
