import styled from "styled-components";

export const TopStripStyled = styled.div`

  .topStrip { 
    background-color: ${({ theme }) => theme.teritoryColor};
    color: ${({ theme }) => theme.gray222};
    font-weight: 400;
    position: relative;
    z-index: 9999;

    a { 
      color: ${({ theme }) => theme.gray222};
      &:hover { color: ${({ theme }) => theme.gray111}};
    }
    
    a.logOut {
      color: ${({ theme }) => theme.gray222};
      &:hover { 
        text-decoration: underline;
        color: ${({ theme }) => theme.navbarLinkHoverColor};

        i {
          color: ${({ theme }) => theme.navbarLinkHoverColor};
        }

      };
    }

    i {
      color: ${({ theme }) => theme.gray222};
    }
  }
`;
