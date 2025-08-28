import styled from "styled-components";

export const ConfirmationDialogStyled = styled.div`
    .popup-overlay {
        background: #fff;
        width: 500px;
        padding: 35px 25px;
        border: 1px solid #ddd;
        border-radius: 10px;
        /* box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.5); */
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
        text-align: center;

        h1 {
            font-size: 1.8rem;
        }

        .mesg span {
            color: red;
            font-weight: 300;
            font-style: italic; 
        }

        hr {
            border-color: #ccc;
        }
        }

        @media (max-width: 576px) {
        .popup-overlay {
            width: 90%;
            padding: 35px 15px;
            margin: 0 auto;
        }
    }

`;
