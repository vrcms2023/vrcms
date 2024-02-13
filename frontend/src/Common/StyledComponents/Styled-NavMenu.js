import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;
  .nav-item {
    background-color: ${({ theme }) => theme.navbarLinkBgColor};

    @media (min-width: 992px) {
      background-color: ${({ theme }) => theme.transparent};
    }
  }

  .nav-item.dropdown ul {
    background-color: ${({ theme }) => theme.navbarChildLinkBgColor};

    @media (max-width: 991px) {
      background-color: ${({ theme }) => theme.navbarChildLinkHoverColor};
    }
  }

  .nav-item.dropdown ul li a {
    color: ${({ theme }) => theme.navbarChildLinkColor};

    &:hover {
      color: ${({ theme }) => theme.navbarChildLinkHoverColor};
      background-color: ${({ theme }) => theme.navbarChildLinkBgColor};

      @media (max-width: 991px) {
        background-color: ${({ theme }) => theme.navbarChildLinkBgColor};
      }
    }
  }
`;
