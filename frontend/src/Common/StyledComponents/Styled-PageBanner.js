import styled from "styled-components";

export const PageBannerStyled = styled.div`
  .pageBanner {
    img {
      object-fit: cover;
      object-position: top;
      height: 350px;
    }
    .titleCaption {
      position: absolute;
      top: 0;
      bottom: 0px;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      padding: 10px 100px 40px;

      .title {
        color: ${({ theme }) => theme.pageBannerTitleColor};
      }
      .subTitle {
        color: ${({ theme }) => theme.pageBannerSubTitleColor};
      }
      .description {
        color: ${({ theme }) => theme.pageBannerTextColor};
      }

      .title,
      .description {
        width: 50%;
      }
    }

    @media (max-width: 576px) {
      img {
        height: 230px;
      }

      .titleCaption {
        padding: 10px 50px 40px;

        .title {
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .subTitle {
          display: none;
        }

        .description {
          width: 100%;
          font-size: 1rem !important;
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
`;
