import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  // background-image: url(${BgSymbol});
  // background-repeat: no-repeat;
  // background-position: 120% -250px;
  // background-size: 40%;
  background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);

  .footerDetails {

    .logo img { width: 150px; }
    a {
      color: ${({ theme }) => theme.black};
      &:hover {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
  
    ul {
      list-style: none;
  
      li {
        padding: 7px 0;

        &::last-child {
          padding-bottom: 0;
        }
  
        a {
          color: ${({ theme }) => theme.black};
          &:hover {
            color: ${({ theme }) => theme.secondaryColor};
          }
        }
      }
    }
  
    .mainTitle {
      color: ${({ theme }) => theme.secondaryColor};
    }
  
    .subtitle { }
  
    // .reachUs p {
    //   word-wrap: break-word;
    // }
  
    // @media (max-width: 991px ) {
    //   .footerLogo {
    //     width: 95%;
    //   }
    // }
  
    // @media (max-width: 768px ) {
    //   .footerLogo {
    //     width: 50%;
    //   }
    // }

    
    i {
      font-size: 2rem;
      margin: 0 8px 0;
      color: ${({ theme }) => theme.secondaryColor};
    }

    .socialMedia {
      text-align: left;

      // .footerLogo {
        //   width: 150px;
        // }

      .socialLinks {
    
        .editIcon  {
          top: -65px;
          right: -13px;
    
          @media(max-width: 768px) {
            top: -100px;
          }
    
          @media(max-width: 768px) {
            top: -67px;
          }
    
          i {
            margin: 0px;
          }
        }

        // @media (max-width: 991px) {
          //   .socialLinks {
          //     img {
          //       width: 50%;
          //     }
          //     i {
          //       margin: 15px 8px 0;
          //     }
          //   }
        
          //   li {
          //     padding: 7px 0;
          //   }
          // }
      }

      

      @media(max-width: 576px) {
        text-align: center;
      }
    }
  }

  .footerCopyRights {
    background-color: ${({ theme }) => theme.primaryColor};
    font-size: 0.85rem !important;

    a {
      color: ${({ theme }) => theme.black};
      font-size: 0.8rem !important;
      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
      }
    }

    .dby,
    .dby a {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.secondaryColor};
    }
  }
`;
