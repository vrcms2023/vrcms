import styled from "styled-components";

export const AboutPageStyled = styled.div`
  .title {
    color: ${({ theme }) => theme.aboutPageTitleColor};
  }
  .aboutPage {
    ul {
      padding: 0;
      margin: 25px 0;
      list-style: none;

      li {
        border-bottom: 1px solid ${({ theme }) => theme.lightgray};
        padding: 10px;
        // background-color: ${({ theme }) => theme.verylightgray};
      }

      li:first-child {
        // border-top-left-radius: 5px;
        // border-top-right-radius: 5px;
      }

      li:last-child {
        border: 0;
        // border-bottom-left-radius: 5px;
        // border-bottom-right-radius: 5px;
      }
    }

    hr:last-child {
      display: none;
    }
  }
`;
