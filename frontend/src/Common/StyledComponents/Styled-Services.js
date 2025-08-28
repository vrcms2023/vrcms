import styled from "styled-components";

export const ServicesStyled = styled.div`
  background-color: ${({ theme }) => theme.white};

  .services {
    ul,
    ol {
      margin: 40px 25px;

      li {
        padding: 15px;
      }
    }
  }

  .normalCSS img,
  .flipCSS img {
    width: 100%;
    // height: 100%;
    max-height: 280px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .normalCSS,
  .flipCSS {
    // padding: 24px 10px;
    margin-top: 48px !important;
    border: 1px solid ${({ theme }) => theme.verylightgray} !important;
  }

  .flipCSS {
    flex-direction: row-reverse;
    background: #fbfbfb;
    // margin-bottom: 48px;

    @media (max-width: 768px) {
      padding: 0;
      margin: 0px;
    }
  }

  .servicesPage {
    ul,
    ol {
      margin: 15px 10px;

      li {
        border-bottom: 1px solid ${({ theme }) => theme.lightgray};
        padding: 12px 7px;
      }
    }

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      // height: 100%;
    }

    p,
    p span,
    ol span,
    ul span {
      color: ${({ theme }) => theme.gray444} !important;
    }

    // .quill {
    //   background: none !important;
    // }
    // .ql-editor {
    //   padding: 1rem 0 0 !important;
    // }
  }
  .viewAllServices {
    padding: 8px !important;
    font-weight: 600 !important;
    font-size: 0.8rem;
  }

  // ul {
  //   overflow-y: auto;
  //   border: 1px solid ${({ theme }) => theme.lightgray};
  // }
  li {
    padding: 5px 10px;
    cursor: pointer;
    span.notPublished {
      color: #ccc !important;
    }

    .publishState a {
      text-decoration: none !important;
    }

    &:hover {
      background: ${({ theme }) => theme.verylightgray};

      a {
        text-decoration: none !important;
      }
    }
  }

  .servicePageLinks {
    background-color: ${({ theme }) => theme.white};
    // width: 600px;
    // margin: 0 auto;
    // height: 120px;
    // overflow-y: scroll;
  }

  li {
    cursor: pointer;

    span.notPublished {
      color: #ccc !important;
    }
  }

  .pageTitle {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    // height: 20px;
  }

  .addPageForm {
    // background-color: ${({ theme }) => theme.teritoryColor};
    // width: 600px;
    // margin: 0 auto;
  }
`;
