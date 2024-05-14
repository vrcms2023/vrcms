import styled from "styled-components";

export const TeamStyled = styled.div`
  background-color: ${({ theme }) => theme.teamBg};

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
    color: ${({ theme }) => theme.teamIconColor};
    font-size: 2rem;
    margin: 10px;
  }

  img {
    object-fit: cover;
    object-position: top;
    border-radius: 5px !important;
  }

  .aboutMe {
  }

  .memberCard {
    background-color: ${({ theme }) => theme.verylightgray};
    border-radius: 15px;

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
