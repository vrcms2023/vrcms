import styled from "styled-components";

export const ContactPageStyled = styled.div`
  .formTitle {
    color: ${({ theme }) => theme.primaryColor};
  }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .contactAddress {
    background-color: ${({ theme }) => theme.primaryColor};
  }

  .contactForm {
    width: 60%;

    input,
    textarea {
      background-color: #eeeeee;
      border: 1px solid #cacaca;
      padding: 12px 10px;
    }
  }

  @media (max-width: 768px) {
    .contactForm {
      width: 90% !important;
    }
  }
`;
