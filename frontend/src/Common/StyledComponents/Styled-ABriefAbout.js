import styled from "styled-components";

export const ABriefIntroStyled = styled.div`
    .productForm {
        background: rgb(225,242,253);
        background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 50%, rgba(225,242,253,1) 100%);
    }

    .randomServices {
        margin-top: 96px;
        margin-bottom: 96px;

        @media(max-width: 768px) {
            margin-top: 48px;
            margin-bottom: 48px;
        }

        img {
            height: 300px;
            // filter: grayscale(100%);
            transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
            
            @media(max-width: 768px) {
                height: 200px;
            }

            &:hover {
                // filter: grayscale(0%);
                transform: scaleX(1.05);
            }
        }

        .imgStylingLeft {
            border-radius: 12px;
            // border-top-right-radius: 30px;
            // border-bottom-right-radius: 30px;

            // @media(max-width: 768px) {
            //     border-radius: 10px
            // }
        }

        .imgStylingRight {
            border-radius: 12px;
            // border-top-left-radius: 30px;
            // border-bottom-left-radius: 30px;

            // @media(max-width: 768px) {
            //     border-radius: 10px
            // }
        }
    }

    
    

    form.contactForm {
        padding: 30px 60px;
        border-radius: 8px;
        // border: 1px solid ${({theme}) =>  theme.lightgray};
        background: ${({theme}) =>  theme.white};
        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);

        @media(max-width: 576px) {
            padding: 30px;   
        }

        input, textarea {
            border-color: ${({theme}) =>  theme.lightgray} !important;
        }
    }
`