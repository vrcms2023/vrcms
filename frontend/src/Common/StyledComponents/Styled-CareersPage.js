import styled from "styled-components";

export const CareersPageStyled = styled.div`
  
  .jobBriefDetails h5 {
    font-size: 1.6rem !important;
  }
  .jobTitle {
    font-size: 1.6rem !important
  }

  // .subTitle {
  //   font-size: 1.2em !important;
  //   fonw-weight: 500;
  // }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .jobPost {
    border: 1px solid ${({ theme }) => theme.grayddd};
    // background-color: ${({ theme }) => theme.primaryColor};
    border-bottom: 4px solid ${({ theme }) => theme.clientSecondaryColor};

    &:hover {
      border-bottom: 4px solid ${({ theme }) => theme.teritoryColor};
    }

    .fa-map-marker {
      color: ${({ theme }) => theme.clientSecondaryColor};
    }

    .fa-expand {
      font-size: 1.2rem;
    }

    .subTitle {
      font-size: 1rem !important;
      font-weight: 600;
    }

    // .quill {
    //   .ql-editor {
    //     padding-top: .5rem !important;
        
    //     p, p span {
    //       text-align: left;

    //       @media(max-width: 480px) {
    //         padding: 1rem !important;
    //       }
    //     }
    //   }
    // }
  }

  .currentOpenings {
    // max-height: 300px;
    // overflow-y: auto;

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

    .title {
      color: ${({ theme }) => theme.textColor};
      border-bottom: 1px solid ${({ theme }) => theme.grayddd};
      padding-bottom: 2px;
      font-size: 1.2rem !important;
    }

    // background: ${({ theme }) => theme.secondaryColor};
    // border: 1px solid ${({ theme }) => theme.primaryColor};

    ul {
      list-style: none;
      padding: 0;

      li a {
        color: ${({ theme }) => theme.primaryColor};
        font-size: 1rem;
        text-decoration: underline;
        display: inline-block;
        padding: 5px 0;

        &:hover {
          color: ${({ theme }) => theme.secondaryColor};
        }
      }
    }
  }

  .adminEditTestmonial select.form-control {
    width: 150px !important;
  }

  .jobBriefDetails {
    // background: linear-gradient(-15deg, rgba(225,242,253,0) 0%, ${({ theme }) => theme.white} 50%, rgba(225,242,253,.8) 100%);
    // background-color: rgba(255,255,255, .3);
    border: 1px solid ${({ theme }) => theme.graye6};
  // box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
    padding: 1rem;
    border-radius: .6rem;
    margin-bottom: 1.5rem;
  }

  .jobDescription {
    border: 1px solid ${({ theme }) => theme.graye6};
    border-radius: .6rem;

    p {
      font-size: .9rem
    }

    // .quill {
    //   .ql-editor {
    //     p, p span {
    //       text-align: left;
    //       @media(max-width: 480px) {
    //         padding: 0 1rem !important;
    //       }
    //     }
    //   }
    // }
    

    ul {
      margin-left: 25px;

      li {
        padding: 5px 0;
        list-style: none !important;

        &::before {
          content: "*";
          color: ${({ theme }) => theme.secondaryColor};
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }
  }

  .contactForm {
    background-color: ${({ theme }) => theme.lightWhiteF8};
    padding: 24px;
    border-radius: .8rem;
  }

`;
