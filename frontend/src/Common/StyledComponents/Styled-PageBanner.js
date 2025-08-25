import styled from "styled-components";

export const PageBannerStyled = styled.div`
  
  .pageBanner {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      background: linear-gradient(178deg,rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.6) 100%);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }

    img {
      object-fit: cover;
      height: 300px;
    }

    .titleCaption {
      position: absolute;
      top: 0;
      bottom: 0px;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 10px 100px 48px;
      text-align: center;
      z-index: 9;

      .title {
        color: ${({ theme }) => theme.pageBannerTitleColor};
        font-family: ${({ theme }) => theme.headingFontFamily}; 
        font-weight: 500 !important;
        margin: 0 0 .5rem;
      }
      .subTitle {
        color: ${({ theme }) => theme.pageBannerSubTitleColor};
        font-weight: normal !important;
        font-size: 1.1rem !important;
        font-family: ${({ theme }) => theme.headingFontFamily}; 
      }
      .description {
        color: ${({ theme }) => theme.pageBannerTextColor};
        text-align: center;
        width: 60%;
        display: block;
      }

      .title,
      .description {
        // width: 50%;
      }

      .quill {
        // width: 70%;
        margin: 0 auto;

        .ql-editor {
          p, p span, .introDecTitleCss  {
            color: ${({ theme }) => theme.white};
            text-align: center !important;
          }
        }
      }
    }

    @media (max-width: 991px) {
      img {
        height: 230px;
      }

      .titleCaption {
        padding: 10px 50px 30px;

        .title {
          font-size: 1.5rem !important;
        }

        .description {
          width: 100%;
          font-size: 1rem !important;
          // overflow: hidden;
          // display: -webkit-box !important;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
        }

        // .title {
        //   overflow: hidden;
        //   display: -webkit-box !important;
        //   -webkit-box-orient: vertical;
        //   -webkit-line-clamp: 2;
        // }

        // .subTitle {
        //   display: none;
        // }
      }
    }

     @media (max-width: 480px) {
      
      .description {
        display: none !important;
    }
  }
}
`;
