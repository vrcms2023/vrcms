import styled from "styled-components";

export const CareersPageStyled = styled.div`
  .jobTitle {
    color: ${({ theme }) => theme.primaryColor};
  }

  .title {
    color: ${({ theme }) => theme.pageTitleColor};
  }

  .jobPost {
    border: 1px solid ${({ theme }) => theme.lightgray};
    background-color: ${({ theme }) => theme.white};
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
    border: 1px solid ${({ theme }) => theme.lightgray};

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
    background-color: ${({ theme }) => theme.verylightgray};
  }

  .jobDescription {
    background-color: ${({ theme }) => theme.white};

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
