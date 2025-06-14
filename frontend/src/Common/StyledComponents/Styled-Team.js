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


  // a {
  //   color: ${({ theme }) => theme.teamLinkColor};
  // }

  // .social {
  // border-top: 1px solid ${({ theme }) => theme.graye6};
  // }

  .social i {
    color: ${({ theme }) => theme.secondaryColor};

    font-size: 1.6rem;
    margin: 7px;
  }

  img {
    object-fit: contain;
    object-position: top;
    height: auto;
    max-height: 300px;
    width: 100%;
  }

  .aboutMe {
  }
  
  .ql-editor {
    padding: 0
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
        color: ${({ theme }) => theme.clientColor};
      }

      .strengths {
        display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;

  @media(max-width: 480px) {
    -webkit-line-clamp: none;
  }
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
