import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  // background-image: url(${BgSymbol});
  // background-repeat: no-repeat;
  // background-position: 120% -250px;
  // background-size: 40%;
  // background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);
    background: ${({ theme }) => theme.gray444};
    color: ${({ theme }) => theme.footerLinkColor};

  .footerDetails {

    .logo img { width: 150px; }
    a {
      color: ${({ theme }) => theme.footerTextColor};
      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
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
          color: ${({ theme }) => theme.footerTextColor};
          &:hover {
            color: ${({ theme }) => theme.footerLinkHoverColor};
          }
        }
      }
    }
  
    .mainTitle {
      color: ${({ theme }) => theme.footerLinkHoverColor};
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
      color: ${({ theme }) => theme.gray888};

      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
      }
    }

    .socialMedia {
      text-align: left;

      // .footerLogo {
        //   width: 150px;
        // }

      .socialLinks {
    
        .editIcon  {
          top: 65px;
          right: 0px;
    
          @media(max-width: 768px) {
            top: 0px;
          }
    
          @media(max-width: 768px) {
            top: 0px;
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

      .copyRight {
        color: ${({ theme }) => theme.gray888};
        
      }
      

      @media(max-width: 576px) {
        text-align: center;
      }
    }
  }

  .footerCopyRights {
    background-color: ${({ theme }) => theme.gray555};
    font-size: 0.85rem !important;
    color: ${({ theme }) => theme.footerLinkColor};

    a {
      color: ${({ theme }) => theme.footerLinkColor};
      font-size: 0.8rem !important;
      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
      }
    }

    .dby,
    .dby a {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.footerLinkHoverColor};
    }
  }
`;
