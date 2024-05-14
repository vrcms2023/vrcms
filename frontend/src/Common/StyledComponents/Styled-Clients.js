import styled from "styled-components";

export const ClientStyled = styled.div`
  // .clients hr:last-child {
  //   display: none;
  // }
  .clientAvatar img {
    width: 100px;
  }
 
  .clientFrontend  {
    border-radius: 50px;

    .details p {
      margin: 0px
    }

    &.overlayContainer {
      position: relative;
      // width: 50%;
      // max-width: 300px;
    }
    
    /* Make the image to responsive */
    .image {
      display: block;
      // width: 100%;
      // height: auto;
    }
  
    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgb(0, 0, 0);
      background: rgba(0, 0, 0, .8); /* Black see-through */
      color: #f1f1f1;
      width: 100%;
      transition: .5s ease;
      opacity:0;
      color: white;
      font-size: 20px;
      padding: 20px;
      border-radius: 20px;
      height: 100%;
      max-height: 250px;
      overflow-y: auto;
      visibility: visible !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


      &::before {
        font-size: 3.5rem;
        position: absolute;
        right: 15px;
        top: 15px;
        color: orange;  
      }
    }

    p {
      font-size: .9rem;
      margin: 5px 0 !important;
      font-family: poppins
    }
  
    &.overlayContainer:hover .overlay {
      opacity: 1;
    }
  }

  .clientAdmin .details {
    display: flex;
    flex-direction: row;
    gap: 15px;
    flex-wrap: wrap;
  }
  
`;
