import styled from "styled-components";

export const LoginStyled = styled.div`
    // background-color: ${({ theme }) => theme.lightgray};
    color: ${({ theme }) => theme.black};

    form {
        background-color: ${({ theme }) => theme.white};
        // width: 35%;
        margin: 20px 0;
        padding: 50px;
        border: 1px solid color: ${({ theme }) => theme.gray};

        input {
            // background-color: ${({ theme }) => theme.lightgray} !important;
            // border-radius: 50px !important;
        }
    }

    .loginLinks a {color: ${({ theme }) => theme.teritoryColor} !important;}

      @media (max-width: 768px) {
        .login form {
          width: 80%;
          margin: 30px 0;
          padding: 25px 30px;
        }
      }
      
      .authForm form {
        width: 75%;
      }
      
      .authForm .login .bg-light {
        background: #fff !important;
      }
      
      @media (max-width: 991px) {
        .authForm form {
          width: 80%;
          margin: 0;
        }
      
        .authForm .register .login {
          margin: 10px !important;
        }
      }

      .clientsContactList a {
        color: rgba(23, 66, 124, 1);
        text-decoration: underline;
    }
      
`;
