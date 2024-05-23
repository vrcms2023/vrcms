import styled from "styled-components";

export const ContactPageStyled = styled.div`
  .formTitle {
    color: ${({ theme }) => theme.primaryColor};
  }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .contactAddress {
    // background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.black};
  }

  .contact {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  .contactForm {
    width: 60%;
    margin: 0 auto;

  }

  @media (max-width: 768px) {
    .contactForm {
      width: 90% !important;
    }
  }
`;
