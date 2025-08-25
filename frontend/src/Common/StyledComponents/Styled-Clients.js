import styled from "styled-components";

export const ClientStyled = styled.div`
  // .clients hr:last-child {
  //   display: none;
  // }
  .clientAvatar img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
 
  .clientFrontend  {
    // border-radius: 10px;
    
    .details p {
      margin: 0px
    }

    &.overlayContainer {
      //background: ${({theme}) => theme.primaryColor};
      border: 1px solid ${({theme}) => theme.lightgray};
      border-radius: 2px;
      position: relative;
      // width: 50%;
      // max-width: 300px;
      min-height: 200px;
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
      // border-radius: 10px;
      height: 100%;
      max-height: 250px;
      overflow-y: auto;
      visibility: visible !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


      &::before {
        font-size: 3rem;
        position: sticky;
        right: 15px !important;
        top: -10px;
        color: rgba(255, 165, 0, .8);  
        display: block;
        width: 100%;  
      }

      &::-webkit-scrollbar {
        width: 8px;
      }
      
      &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(225,242,253,0.3); 
          border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(232,252,187,0.5); 
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
