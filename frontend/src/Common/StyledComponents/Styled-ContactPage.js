import styled from "styled-components";

export const ContactPageStyled = styled.div`
  .formTitle {
    color: ${({ theme }) => theme.primaryColor};
  }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .contactAddress {
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.black};
  }

  .contactForm {
    width: 60%;
    margin: 0 auto;

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
