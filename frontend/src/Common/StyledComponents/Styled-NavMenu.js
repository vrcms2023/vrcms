import styled from "styled-components";

export const StyledMenu = styled.menu`
  margin-left: auto;

  .navbar {
    background-color:${({ theme }) => theme.primaryColor}; 
    box-shadow: 0px 2px 10px ${({ theme }) => theme.secondaryColor};
    
    .navbar-toggler {
      background-color:${({ theme }) => theme.secondaryColor} !important; 
      border: 1px solid ${({ theme }) => theme.white}; 
    }
    .nav-Link {
        color:${({ theme }) => theme.black}; 
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
        // text-transform: uppercase;
      }

      ul.dropdown-menu {
        // background-color: ${({ theme }) => theme.primaryColor};
        // border-radius: 10px;
        // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border: 0px; 
        padding: 0px;
        margin: 0px;
        
    
        // @media (max-width: 991px) {
        //   background-color: ${({ theme }) => theme.black};
        // }
    
        .nav-item {
          background-color: ${({ theme }) => theme.primaryColor};
          padding: 0px !important;

          &:last-child {
            border: 0px;
          }
    
          a.active {
            background-color: ${({ theme }) => theme.primaryColor};
          }
        }
  
        a {
          color: ${({ theme }) => theme.black};
          padding: 10px 0;
          font-size: 0.9rem;
      
          &:hover {
            color: ${({ theme }) => theme.primaryColor};
            background-color: ${({ theme }) => theme.secondaryColor};
      
            // @media (max-width: 991px) {
            //   background-color: ${({ theme }) => theme.secondaryColor};
            // }
          }
        }
      }
    }
}


`;
