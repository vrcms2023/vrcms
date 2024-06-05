import styled from "styled-components";

export const ABriefIntroStyled = styled.div`
    .productForm {
        background: rgb(225,242,253);
        background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 50%, rgba(225,242,253,1) 100%);
    }

    .randomServices {
        margin-top: 130px;
        margin-bottom: 130px;

        @media(max-width: 768px) {
            margin-top: 80px;
            margin-bottom: 50px;
        }

        img {
            height: 350px;
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
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;

            @media(max-width: 768px) {
                border-radius: 10px
            }
        }

        .imgStylingRight {
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;

            @media(max-width: 768px) {
                border-radius: 10px
            }
        }
    }

    
    

    form {
        padding: 30px 50px;
        border-radius: 15px;
        border: 1px solid ${({theme}) =>  theme.lightgray};
        // background: ${({theme}) =>  theme.white};

        @media(max-width: 576px) {
            padding: 30px;   
        }
    }
`