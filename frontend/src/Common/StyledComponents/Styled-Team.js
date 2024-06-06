import styled from "styled-components";

export const TeamStyled = styled.div`
  background-color: ${({ theme }) => theme.transparent};

  .editIcon {
    top: 10px;
  }

  .title {
    color: ${({ theme }) => theme.teamTitleColor};
  }

  a {
    color: ${({ theme }) => theme.teamLinkColor};
  }

  .social i {
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 2rem;
    margin: 10px;
  }

  img {
    object-fit: cover;
    object-position: top;
    height: 100%;
    max-height: 180px;
  }

  .aboutMe {
  }

  .memberCard {
    background-color: ${({ theme }) => theme.primaryColor};
    // border:1px solid ${({ theme }) => theme.secondaryColor};
    border-radius: 15px;
    margin: 15px 0;
    overflow:hidden;

    .memberDetails {
      color: ${({ theme }) => theme.teamTextColor};

      .strengths {
        p:before {
          content: "»  ";
          font-size: 25px;
        }
        p{
          margin-left: 10px;
          margin-bottom: 0px;
      }
      }
    }
  }
`;
