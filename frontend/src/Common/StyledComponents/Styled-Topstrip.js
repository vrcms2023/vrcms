import styled from "styled-components";

export const TopStripStyled = styled.div`

  .topStrip { 
    background-color: ${({ theme }) => theme.gray555};
    color: ${({ theme }) => theme.graybbb};

    a { 
      color: ${({ theme }) => theme.graybbb};
      &:hover { color: ${({ theme }) => theme.black}};
    }
    
    a.logOut {
      color: ${({ theme }) => theme.white};
      &:hover { 
        text-decoration: underline;
        color: ${({ theme }) => theme.navbarLinkHoverColor};

        i {
          color: ${({ theme }) => theme.navbarLinkHoverColor};
        }

      };
    }

    i {
      color: ${({ theme }) => theme.white};
    }
  }
`;
