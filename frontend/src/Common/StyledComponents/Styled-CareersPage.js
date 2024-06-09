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
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(225,242,253,0.3); 
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(232,252,187,0.5); 
    }

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
    background: linear-gradient(90deg, rgba(225,242,253,1) 0%, ${({ theme }) => theme.white} 50%, rgba(225,242,253,1) 100%);
    // background-color: rgba(255,255,255, .3);
    // border: 1px solid ${({ theme }) => theme.secondaryColor};
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
