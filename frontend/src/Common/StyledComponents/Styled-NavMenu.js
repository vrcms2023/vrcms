import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;

  .navbar {
    background-color:${({ theme }) => theme.navbarBg}; 
    box-shadow: 0px 5px 30px #111111;
    
    .navbar-toggler {
      background-color:${({ theme }) => theme.black} !important; 
      border: 1px solid ${({ theme }) => theme.black}; 
    }
    .nav-Link {
        color:${({ theme }) => theme.navbarLinkColor}; 
        &:before {
          position: absolute;
          content: "";
          width: 0%;
          /* height: 1px; */
          border-bottom: 2px solid #000;
          bottom: -4px;
          transition: width 0.3s;
        }

        &.active {
          color:${({ theme }) => theme.black};
          
          &:before {
            position: absolute;
            content: "";
            width: 35%;
            /* height: 1px; */
            border-bottom: 2px solid #000;
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

    navbar-brand img {
      width: 85%;
    }

    @media screen and (max-width: 480px) {
      .navbar-brand {
        width: 70%;
      }
    
      .navbar-brand img {
        width: 70%;
      }
    }

    .navbar-collapse {
      .navbar-nav {
        position: relative;
        z-index: 3333;
      }
    }

    .nav-item {
      background-color: ${({ theme }) => theme.white};
      
      text-align: center;
      padding: 12px 0px;
  
      @media (max-width: 992px) {
        border-bottom: 1px solid rgba(22, 93, 61, 0.3);
      }
      
      @media (min-width: 992px) {
        background-color: ${({ theme }) => theme.transparent};
      }
  
      .nav-Link {
        margin: 0 15px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: normal;
        position: relative;
        text-transform: uppercase;
      }

      ul.dropdown-menu {
        background-color: ${({ theme }) => theme.black};
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        
    
        // @media (max-width: 991px) {
        //   background-color: ${({ theme }) => theme.black};
        // }
    
        .nav-item {
          background-color: ${({ theme }) => theme.black};
          padding: 5px 0px;
    
          a.active {
            background-color: ${({ theme }) => theme.primaryColor};
          }
        }
  
        a {
          color: ${({ theme }) => theme.navbarChildLinkColor};
      
          &:hover {
            color: ${({ theme }) => theme.navbarChildLinkHoverColor};
            background-color: ${({ theme }) => theme.navbarChildLinkBgColor};
      
            @media (max-width: 991px) {
              background-color: ${({ theme }) => theme.navbarChildLinkBgColor};
            }
          }
        }
      }
    }
}


`;
