import styled from "styled-components";

export const ContactPageStyled = styled.div`
  .contactPage {
    .contactAddress {
      color: ${({ theme }) => theme.textColor};
  
      i {
        color: ${({ theme }) => theme.iconColor};
      }
    }
    
    .quickContact {
      background: ${({ theme }) => theme.white};

      .formTitle {
        color: ${({ theme }) => theme.textColor};
      }
    }
  }
`;
