import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;

  .navbar-brand {
    img {
      width: 85%;
    }
    @media screen and (max-width: 480px) {
      width: 70%;

      img {
        width: 70%;
      }
    }
  }




  .navbar {
    background-color:${({ theme }) => theme.primaryColor}; 
    box-shadow: 0px 2px 10px ${({ theme }) => theme.secondaryColor};
    
    .nav-item {
        .nav-Link {
          color:${({ theme }) => theme.black}; 
          margin: 0 12px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: normal;
          position: relative;
          
          &:before {
            position: absolute;
            content: "";
            width: 0%;
            /* height: 1px; */
            border-bottom: 2px solid ${({ theme }) => theme.secondaryColor}; 
            bottom: -4px;
            transition: width 0.3s;
          }

          &.active {
            color:${({ theme }) => theme.secondaryColor};
            
            &:before {
              position: absolute;
              content: "";
              width: 35%;
              /* height: 1px; */
              border-bottom: 2px solid ${({ theme }) => theme.secondaryColor}; 
              bottom: -4px;
            }
          }
          &:hover {
              color:${({ theme }) => theme.secondaryColor};

              &:before {
                width: 35%;
              }
          }
        }

        @media (max-width: 992px) {
          background: ${({theme}) => theme.white};
          border-bottom: 1px solid ${({theme}) => theme.verylightgray};
          text-align:center;
          padding: 8px;
        }
        
        @media (min-width: 992px) {
          background-color: ${({ theme }) => theme.transparent};
        }
    }

    .navbar-toggler {
      background-color:${({ theme }) => theme.secondaryColor} !important; 
      border: 1px solid ${({ theme }) => theme.white}; 
    }
    .navbar-collapse {
      .navbar-nav {
        position: relative;
        z-index: 3333;
      }
    }


// ++++++++++++++ DROPDOWN ++++++++++++++++

      ul.dropdown-menu {
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border: 0px; 
        padding: 0px;
        margin: 0px;
        // animation: growDown 300ms ease-in-out forwards;
        // transform-origin: top center;

        // animation: rotateMenu 400ms ease-in-out forwards;
        // transform-origin: top center;

        // animation: downOut 300ms ease-in-out forwards;
        // transform-origin: center center;

        animation: growOut 300ms ease-in-out forwards;
        transform-origin: top center;

        // animation: rotateY 300ms ease-in-out forwards;
        // transform-origin: top center;
    
        .nav-item {
          background-color: ${({ theme }) => theme.primaryColor};
          border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};

          &:last-child {
            border: 0px;
          }
    
          a.active {
            background-color: ${({ theme }) => theme.white};
          }
        }
  
        .dropdown-item {
          color: ${({ theme }) => theme.black};
          padding: 10px 20px;
          font-weight: 600;
          transition: transform 250ms, opacity 400ms;
          // transition: transform 250ms cubic-bezier(0.1, 0.2, 0.3, 0.4);
      
          &:hover {
            color: ${({ theme }) => theme.white};
            background-color: ${({ theme }) => theme.secondaryColor};
            transform: scale(1.1)
          }
        }
      }

      @keyframes growDown {
        0% {
            transform: scaleY(0)
        }
        80% {
            transform: scaleY(1.1)
        }
        100% {
            transform: scaleY(1)
        }
      }

      @keyframes rotateMenu {
        0% {
            transform: rotateX(-90deg)
        }
        70% {
            transform: rotateX(20deg) 
        }
        100% {
            transform: rotateX(0deg) 
        }
      }

      @keyframes downOut {
        0% {
           transform: translateZ(200px) transLateY(40px)
       }
       80% {
           transform: translateZ(-10px) transLateY(0px)
       }
       100% {
           transform: translateZ(0px) transLateY(0px)
       }
      }

      @keyframes growOut {
          0% {
              transform: scale(0)
          }
          80% {
              transform: scale(1.1)
          }
          100% {
              transform: scale(1)
          }
      }

      @keyframes rotateY {
          0% {
              transform: rotateY(90deg)
          }
          80% {
              transform: rotateY(-10deg)
          }
          100% {
              transform: rotateY(0)
          }
      }
}
`;
// https://codepen.io/codypearce/pen/PdBXpj    Reference