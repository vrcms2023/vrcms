import styled from "styled-components";

export const AboutPageStyled = styled.div`
  .title {
    color: ${({ theme }) => theme.aboutPageTitleColor};
  }
  .aboutPage {
    .leftColumn {
      background-color: ${({ theme }) => theme.transparent};
    }
    .rightColumn {
      background-color: ${({ theme }) => theme.transparent};

      img {
        position: relative;
        transition: opacity 0.5s ease, transform 0.5s ease, border-radius 0.5s ease;
        
      
        &:hover {
          &::before {
            content: 'Leon Phrama';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: inset 0 0 30px 10px rgba(255, 255, 255, 0.5); /* Adjust the shadow color and size as needed */
            border-radius: inherit;
          }
      
          transform: scale(1.1) rotate(-3deg);
          border-radius: 5%; /* Change the border-radius to 50% for a circle */
        }
      
        
      }
      
      
      
    }

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
