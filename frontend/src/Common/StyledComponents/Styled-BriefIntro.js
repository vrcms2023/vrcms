import styled from "styled-components";

export const BriefIntroStyled = styled.div`
    background-color: ${({ theme }) => theme.transparent};
    padding: 24px 0;

  .briefIntro { 
    @media(max-width: 768px) {
      padding: 0 2rem
    }

    h3 {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.briefIntroTitleColor};
    }
  }

  .ql-editor {
    margin: 1.2rem 0;
    p, p span, .introDecTitleCss {
      text-align: center;
    }
  }
`;
