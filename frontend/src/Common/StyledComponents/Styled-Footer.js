import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  // background-image: url(${BgSymbol});
  // background-repeat: no-repeat;
  // background-position: 120% -250px;
  // background-size: 40%;
  // background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.black} 100%);
    background: ${({ theme }) => theme.footerBgColor};
    color: ${({ theme }) => theme.black};
    border-top: 1px solid ${({ theme }) => theme.grayccc};
    font-size: .8rem;

    hr {
      border-color: ${({ theme }) => theme.white};
    }

    h5 {
      font-weight: 500;
      font-style: normal;
    }

    a {
      font-size: .8rem
    }

  .footerDetails {
    .logo img { width: 150px; }
    // a {
    //   color: ${({ theme }) => theme.footerLinkColor};
    //   &:hover {
    //     color: ${({ theme }) => theme.footerLinkHoverColor};
    //   }
    // }
  
    ul {
      list-style: none;
  
      li {
        padding: 5px 0;

        &::last-child {
          padding-bottom: 0;
        }
  
        // a {
        //   color: ${({ theme }) => theme.footerLinkColor};
        //   &:hover {
        //     color: ${({ theme }) => theme.footerLinkHoverColor};
        //   }
        // }
      }
    }

    p {
      color: ${({ theme }) => theme.footerTextColor};
    }

    p.description {
      color: ${({ theme }) => theme.gray444};
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
      font-size: 1.5rem;
      margin: 0 8px 0;
      // color: ${({ theme }) => theme.footerLinkColor};
      color: ${({ theme }) => theme.footerLinkHoverColor};

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
          top: -48px;
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
    border-top: 1px solid ${({ theme }) => theme.grayccc};
    background-color: ${({ theme }) => theme.grayddd};
    font-size: 0.8rem !important;
    color: ${({ theme }) => theme.footerTitleColor};

    a {
      color: ${({ theme }) => theme.footerTitleColor};
      font-size: 0.8rem !important;
      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
      }
    }

    .dby,
    .dby a {
      font-size: 0.8rem;
      // color: ${({ theme }) => theme.footerLinkColor};

      // &:hover {
      //   color: ${({ theme }) => theme.footerLinkHoverColor};
      // }
    }
  }
`;
