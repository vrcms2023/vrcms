import styled from "styled-components";

export const BriefIntroStyled = styled.div`
    background-color: ${({ theme }) => theme.briefIntroBg};
    padding: 50px 0;

  p {
    color: ${({ theme }) => theme.textColor};
  }

  .briefIntro h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.briefIntroTitleColor};
  }
`;
