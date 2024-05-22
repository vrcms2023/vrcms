import styled from "styled-components";

export const BriefIntroStyled = styled.div`
  // background-color: ${({ theme }) => theme.verylightgray};
    background: rgb(255,255,255);
    background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);
    padding: 100px 0;

    @media (max-width: 576px) {
      padding: 50px 0;
    }
  p {
    color: ${({ theme }) => theme.textColor};
  }

  .briefIntro h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.briefIntroTitleColor};
  }
`;
