import styled from "styled-components";

export const NewsStyled = styled.div`
  .card {
    min-height: 420px;
    background-color: ${({ theme }) => theme.newsCardBg};
    color: ${({ theme }) => theme.newsCardTextColor};
    margin-bottom: 30px;

    .title {
      color: ${({ theme }) => theme.newsCardTitleColor};
    }

    img {
      height: 200px;
      object-fit: cover;
      object-position: bottom;
    }

    .card-body {
      // a {
      //     color:${({ theme }) => theme.primaryColor} !important;

      //     &:hover {
      //         color:${({ theme }) => theme.secondaryColor} !important;
      //     }
      // }
    }
  }
`;
