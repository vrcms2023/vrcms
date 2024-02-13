import styled from "styled-components";

export const ServicesStyled = styled.div`
    background-color: ${({ theme }) => theme.white};

    .services ul {
        margin: 40px 25px;

        li {
            padding: 15px;
          }
      }
      
      .services ul 
      
      .normalCSS,
      .flipCSS {
      }
      
      .flipCSS {
        flex-direction: row-reverse;
      }
      
      .servicesPage {
        ul {
            margin: 40px 25px;

            li {
                border-bottom: 1px solid color: ${({ theme }) =>
                  theme.lightgray};
                padding: 7px;
              }
        }

        img {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
        }
      }
      
      
      
      .servicePageLinks {
        li {
            cursor: pointer;
          }

        .pageTitle {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            height: 20px;
          }
      }
      
      .addPageForm {
        background-color: ${({ theme }) => theme.teritoryColor};
      }

      .servicePageLinks {
        background-color: ${({ theme }) => theme.white};
      }

      
`;
