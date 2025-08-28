import styled from "styled-components";

export const EditStyled = styled.div`
.editIcon {
  right: 0px;
  z-index: 999;
  display: block;
  margin-top: 5px;
  cursor: pointer;
  padding: 4px 10px;
  width: auto !important;
  background-color: rgba(255, 255, 255, 1);
  border: 1px dashed rgba(255, 193, 7, 1);
}

.editIcon i {
    color: rgba(255, 193, 7, 1) !important;
  transition: transform 0.3s ease, color 0.3s ease;
}
.editIcon i:hover {
  color:${({ theme }) => theme.black} !important;
  transform: rotate(-180deg);
}

.carousel .editIcon {
  top: 150px !important;
}

.componentType {
  position: absolute;
  display: block;
  background-color: rgba(255, 193, 7, 1);
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  right: 0;
  bottom: -16px;
  padding: 1px 5px;
  font-size: .55rem;
}

`