import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  // background-image: url(${BgSymbol});
  // background-repeat: no-repeat;
  // background-position: 120% -250px;
  // background-size: 40%;
  background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);
  color:${({ theme }) => theme.textColor};

  a {
    color: ${({ theme }) => theme.black};
    &:hover {
      color: ${({ theme }) => theme.secondaryColor};
    }
  }

  ul {
    list-style: none;

    li {
      padding: 3px 0;

      a {
        color: ${({ theme }) => theme.black};
        &:hover {
          color: ${({ theme }) => theme.secondaryColor};
        }
      }
    }
  }

  h5 {
    color: ${({ theme }) => theme.secondaryColor};
    margin: 0 0 20px;
    font-size: 1.3rem;
    text-align: left
  }

  .reachUs p {
    word-wrap: break-word;
  }

  @media (max-width: 991px ) {
    .footerLogo {
      width: 95%;
    }
  }

  @media (max-width: 768px ) {
    .footerLogo {
      width: 50%;
    }
  }
  

  .socialLinks {
    // padding: 15px 0;

    img {
      width: 70%;
    }

    i {
      font-size: 2.5rem;
      margin: 25px 10px 0;
      color: ${({ theme }) => theme.secondaryColor};
    }

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
  }

  .footerDetails {
    color: ${({ theme }) => theme.black};

    a {
      color: ${({ theme }) => theme.black};
    }
  }

  .footerCopyRights {
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.black};
    border-top: 1px solid rgba(255, 255, 255, 0.1);
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

  @media (max-width: 991px) {
    .socialLinks {
      img {
        width: 50%;
      }
      i {
        font-size: 2rem;
        margin: 15px 9px 0;
      }
    }

    li {
      padding: 7px 0;
    }
  }
`;
