import styled from "styled-components";

export const AboutPageStyled = styled.div`
  .subTitle {
    font-size: .9rem !important;
    color: ${({ theme }) => theme.gray666};
    font-weight: 500 !important;
  }

  .aboutPage {
      padding-bottom: 54px;

      .row {
        border-bottom: 2px solid ${({ theme }) => theme.white};
        transition: background-color 0.4s ease;
        margin-bottom: 2.5rem;

        &:last-child {
          // border-bottom: 0 !important;
        }

        img {
          transition: transform 0.4s ease;
        }

        &:hover {background:rgb(248, 248, 248);}

          &:hover img {
              transform: scale(1.1);
          }
      }
      
      .quill {
        background: none;
      }
      .ql-editor {
        padding-left: 0;
        padding-right: 0;

        p, p span {
          text-align: left;
        }
      }

      p {
        line-height: 1.6;
        margin-bottom: 12px
      }
      
    }
    
    .leftColumn {
      background-color: ${({ theme }) => theme.transparent};
    }
    .rightColumn {
      background-color: ${({ theme }) => theme.transparent};

      img {
        position: relative;
        transition: opacity 0.5s ease, transform 0.5s ease, border-radius 0.5s ease;
        // border-radius: 8px;
        max-width: auto;
        width: 100%;
        max-height: 280px;
        
      
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
      
          // transform: scale(1.1) rotate(-0deg);
          // border-radius: 5%; /* Change the border-radius to 50% for a circle */
        }
      }
    }

    ul, ol {
      padding: 0;
      margin: 0px 0 24px;
      list-style: none;

      li {
        // background-color: ${({ theme }) => theme.verylightgray};
        border-bottom: 1px solid ${({ theme }) => theme.lightgray};
        padding: 10px;

        @media(max-width: 768px) {
          padding: 10px 0;
        }
        
      }
    }

    hr:last-child {
      display: none;
    }
      
    .flipCSS {
      flex-direction: row-reverse;
      background: #fbfbfb;
      // padding: 24px 10px;
      // margin-top: 32px;
      // margin-bottom: 32px;

      
    }

    .normalCSS, .flipCSS {
      @media (max-width: 768px) {
        padding: 0;
        margin: 0px;

      }
    }
`;
