import styled from "styled-components";

export const TeamStyled = styled.div`
  background-color: ${({ theme }) => theme.transparent};

  .editIcon {
    top: 10px;
  }

  .title {
    color: ${({ theme }) => theme.teamTitleColor};
    font-weight: 500;
    font-size: 1.1rem;
  }

  a {
    color: ${({ theme }) => theme.teamLinkColor};
  }

  // .social {
  // border-top: 1px solid ${({ theme }) => theme.graye6};
  // }

  .social i {
    color: ${({ theme }) => theme.secondaryColor};

    font-size: 1.6rem;
    margin: 7px;
  }

  img {
    object-fit: cover;
    object-position: top;
    max-height: 100%;
    height: 130px;
  }

  .aboutMe {
  }

  .memberCard {
    background-color: ${({ theme }) => theme.white};
    // border:1px solid ${({ theme }) => theme.secondaryColor};
    border-radius: 5px;
    margin: 15px 0;
    overflow: hidden;

    .memberDetails {
      color: ${({ theme }) => theme.teamTextColor};

      small {
        font-size: 0.7rem;
        text-transform: uppercase;
      }

      .strengths {
        // p:before {
        //   content: "⬦  ";
        //   font-size: 16px;
        // }
        // p {
        //   margin-left: 10px;
        //   margin-bottom: 0px;
        // }
      }
    }
  }
`;
