import styled from "styled-components";

export const ContactPageStyled = styled.div`
  .contactPage {
    .contactAddress {
      color: ${({ theme }) => theme.black};
  
      i {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
    
    .quickContact {
      background: ${({ theme }) => theme.primaryColor};

      .formTitle {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
  }
`;
