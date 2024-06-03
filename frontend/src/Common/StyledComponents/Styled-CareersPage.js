import styled from "styled-components";

export const CareersPageStyled = styled.div`
  .jobTitle {
    color: ${({ theme }) => theme.secondaryColor};
  }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .jobPost {
    border: 2px solid ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primaryColor};
    border-bottom: 4px solid ${({ theme }) => theme.secondaryColor};

    &:hover {
      border-bottom: 4px solid ${({ theme }) => theme.teritoryColor};
    }

    .fa-map-marker {
      color: ${({ theme }) => theme.secondaryColor};
    }

    .fa-expand {
      font-size: 1.2rem;
    }
  }

  .currentOpenings {
    .title {
      color: ${({ theme }) => theme.primaryColor};
      border-bottom: 1px solid ${({ theme }) => theme.white};
      text-align: center;
    }

    background: ${({ theme }) => theme.secondaryColor};
    border: 1px solid ${({ theme }) => theme.white};

    ul {
      list-style: none;

      li a {
        color: ${({ theme }) => theme.primaryColor};
        font-size: 1rem;
        text-decoration: underline;
        display: inline-block;
        padding: 5px 0;

        &:hover {
          color: ${({ theme }) => theme.secondaryColor};
        }
      }
    }
  }

  .adminEditTestmonial select.form-control {
    width: 150px !important;
  }

  .jobBriefDetails {
    background-color: rgba(255,255,255, .3);
    // border: 1px solid ${({ theme }) => theme.white};
  }

  .jobDescription {
    background-color: ${({ theme }) => theme.primaryColor};
    // border: 1px solid ${({ theme }) => theme.white};

    ul {
      margin-left: 25px;

      li {
        padding: 5px 0;
        list-style: none !important;

        &::before {
          content: "*";
          color: ${({ theme }) => theme.secondaryColor};
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
      }
    }
  }
`;
