import styled from "styled-components";

export const BriefIntroStyled = styled.div`
    background-color: ${({ theme }) => theme.transparent};
    padding: 40px 0;

    @media(max-width: 768px) {
      padding-bottom: 0;
    }

  p {
    color: ${({ theme }) => theme.textColor};
  }

  .briefIntro {
    // margin: 40px 0 0px;

    @media(max-width: 768px) {
      margin: 0px;
    }
  }

  .briefIntro h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.briefIntroTitleColor};
  }
`;
