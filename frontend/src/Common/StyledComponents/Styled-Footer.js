import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  background-color: ${({ theme }) => theme.footerBgColor};
  background-image: url(${BgSymbol});
  background-repeat: no-repeat;
  background-position: 120% -250px;
  background-size: 40%;

  color: ${({ theme }) => theme.footerTextColor};

  a {
    color: ${({ theme }) => theme.footerLinkColor};
    &:hover {
      color: ${({ theme }) => theme.footerLinkHoverColor};
    }
  }

  ul {
    list-style: none;

    li {
      padding: 3px 0;
    }
  }

  h5 {
    // color: ${({ theme }) => theme.footerTitleColor};
    margin: 0 0 20px;
    font-size: 1.6rem;
    text-align: left
  }

  .socialLinks {
    // padding: 15px 0;

    img {
      width: 80%;
    }

    i {
      font-size: 2.5rem;
      margin: 25px 10px 0;
    }
  }

  .footerCopyRights {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1rem !important;

    a {
      color: ${({ theme }) => theme.footerLinkColor};
      &:hover {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }

    .dby,
    .dby a {
      font-size: 0.95rem;
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
