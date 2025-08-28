import React from "react";
import { EditStyled } from "./StyledComponents/Styled-Edit-Component";

const EditIcon = ({ editHandler, icon = "fa-pencil", iconCss = "cursor-pointer fs-5", cssClasses = "position-absolute ", editlabel }) => {
  return (
    <EditStyled>
      <span className={`${cssClasses} editIcon`}>
        {editlabel && <span className="componentType">{editlabel}</span>}
        <i role="button" tabIndex={0} className={`fa ${icon} ${iconCss}`} aria-label={`Edit ${editlabel || "component"}`} onClick={editHandler}></i>
      </span>
    </EditStyled>
  );
};

export default EditIcon;
