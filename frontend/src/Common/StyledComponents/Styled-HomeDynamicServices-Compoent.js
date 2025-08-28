import styled from "styled-components"

export const HomeDynamicServiceStylesComponent = styled.div`

.homeDynamciServicesIntro {
  // padding: 30px 0 0px;
  background-color:${({ theme }) => theme.lightWhiteF8}; 
  color: ${({ theme }) => theme.textColor};

  .homeDynamciServices {
    padding: 24px 0;

    .briefIntro {
        height: 320px;
        max-height: 100%;
        padding: 24px 32px;
        /* border-bottom: 20px solid rgba(1, 32, 96, .2); */
        background-color: #f8f8f8;
        cursor: pointer;

        h5 {
            font-weight: 500;
        }

        h5,
        .quill,
        a {
          position: relative;
        }
        h5 {
          z-index: 2;
          font-weight: 500;
          font-size: 1.6rem;
          color: ${({ theme }) => theme.clientSecondaryColor};
          hyphens: manual;
          overflow-wrap: break-word; /* optional, for better word breaking */
          word-break: break-word; /* optional, for better word breaking */
        }

        .quill {
          z-index: 3;

          p,
          p span,
          h1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
          }

          p,
          p span,
          h1,
          h1 strong,
          span {
            background: transparent;
            color: ${({ theme }) => theme.gray333};
            font-family: Roboto;
            font-size: 1rem;
            font-family: roboto;
            font-weight: normal;
            line-height: 1.5;
            text-align: left;
          }

          .description {
            p:not(:first-child),ul, ol {
              display: none;
            }
          }

          // .ql-editor {
          //   padding: 0.3rem 0 0px;
          // }
        }
    }

    .row {
        .col-md-4 .briefIntro {
        background-repeat: no-repeat;
        background-position: right 15px bottom;
        border-radius: 4px;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

        *, p, p span {
            color: ${({ theme }) => theme.gray444} !important;
            }

        &:hover {
            background-color: #0d75ba;

            *, p, p span {
            color: ${({ theme }) => theme.white} !important;
            }
        }

        @media (max-width: 768px) {
            background-position: right 32px bottom;
        }
        }

        /* .col-md-4:nth-child(1) .briefIntro {
        background-image: url('../../../Images/studies.png');
        }

        .col-md-4:nth-child(2) .briefIntro {
        background-image: url('../../../Images/engineering.png');
        }

        .col-md-4:nth-child(3) .briefIntro {
        background-image: url('../../../Images/calculator.png');
        }
        .col-md-4:nth-child(3) .briefIntro {
        background-image: url('../../../Images/calculator.png');
        }
        .col-md-4:nth-child(4) .briefIntro {
        background-image: url('../../../Images/management.png');
        }

        .col-md-4:nth-child(5) .briefIntro {
        background-image: url('../../../Images/engineer.png');
        }

        .col-md-4:nth-child(6) .briefIntro{
        background-image: url('../../../Images/engineering-services.png');
        } */
    }
    }
}


`;