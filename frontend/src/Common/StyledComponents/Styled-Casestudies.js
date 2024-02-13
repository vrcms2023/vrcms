import styled from "styled-components";

export const CaseStudiesPageStyled = styled.div`
  .caseStudie {
    .row {
      border-bottom: 1px solid ${({ theme }) => theme.lightgray};
    }

    .caseStudieImg {
      max-width: 150px;
      max-height: 150px;
      width: 100%;
    }
  }

  .caseStudieDetails img {
    max-width: 150px;
    max-height: 150px;
    width: 100%;
  }

  .caseStudieDetails ul {
    margin: 25px;
    padding: 0;
  }
`;
