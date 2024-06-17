import styled from "styled-components";

export const StyledMenu = styled.menu`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 99999;
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
    background-color:${({ theme }) => theme.navbarBg}; 
    // box-shadow: 0px 2px 10px ${({ theme }) => theme.navbarLinkActiveColor};
    
    
    .nav-item {
        .nav-Link {
          color:${({ theme }) => theme.navbarTextColor}; 
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
            border-bottom: 2px solid ${({ theme }) => theme.navbarLinkActiveColor}; 
            bottom: -4px;
            transition: width 0.3s;
          }

          &.active {
            color:${({ theme }) => theme.navbarLinkActiveColor};
            
            &:before {
              position: absolute;
              content: "";
              width: 35%;
              /* height: 1px; */
              // border-bottom: 2px solid ${({ theme }) => theme.navbarLinkActiveColor}; 
              bottom: -4px;
            }
          }
          &:hover {
              color:${({ theme }) => theme.navbarLinkHoverColor};

              &:before {
                width: 35%;
              }
          }
        }

        @media (max-width: 992px) {
          background: ${({theme}) => theme.white};
          // background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 50%, rgba(225,242,253,1) 100%);
          border-bottom: 1px solid ${({theme}) => theme.grayccc};
          text-align:center;
          padding: 8px;
        }
        
        @media (min-width: 992px) {
          background-color: ${({ theme }) => theme.transparent};
        }
    }

    .navbar-toggler {
      background-color:${({ theme }) => theme.navbarLinkActiveColor} !important; 
      border: 1px solid ${({ theme }) => theme.navbarLinkActiveColor}; 
    }
    .navbar-collapse {
      .navbar-nav {
        position: relative;
        z-index: 3333;
      }
    }


// ++++++++++++++ DROPDOWN ++++++++++++++++

      ul.dropdown-menu {
        // border-radius: 10px;
        // overflow: hidden;
        // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
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
          background-color: ${({ theme }) => theme.navbarBg};
          // border-bottom: 1px solid ${({ theme }) => theme.black};

          &:last-child {
            border: 0px ;
          }
    
          a.active {
            background-color: ${({ theme }) => theme.navbarLinkActiveColor};
          }
        }
  
        .dropdown-item {
          color: ${({ theme }) => theme.navbarTextColor};
          padding: 10px 20px;
          transition: transform 250ms, opacity 400ms;
          // transition: transform 250ms cubic-bezier(0.1, 0.2, 0.3, 0.4);
      
          &:hover {
            color: ${({ theme }) => theme.white};
            background-color: ${({ theme }) => theme.navbarLinkHoverColor};
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