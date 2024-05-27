import styled from "styled-components";

export const ProductStyled = styled.div`

.productCategorySearch {
    width: 35%;
    min-width: 500px;
    right: 55px; top: -131px; border: 1px solid #0084CF; 
    background: rgb(0,132,207);
    // background: linear-gradient(360deg, rgba(0,132,207,1) 50%, rgba(225,242,253,1) 50%);

    @media (max-width: 768px) {
        right: 15%;
        min-width: 350px;
    }

    @media (max-width: 480px) {
        right: 8%;
        min-width: 300px;
    }

    .productCategory {
        background: rgb(225,242,253,1);
        height: 70px;
    }

    .productSearch {
        background: rgb(0,132,207, 1);
        height: 70px;

        .search {
            width: 400px
        }

        @media (max-width: 768px) { 
            .search {
                width: 80%;
                margin: auto;
            }
        }
    }

    
}
.productsList, .productDetails {
    margin-top: 60px;
}
l`;


export const ProductItemStyled = styled.span`

    img {
        border: 2px solid ${({theme}) => theme.white};
        transition: transform 0.7s ease-out, rotate 0.3s ease-in-out;
        &:hover {
            transform: scale(1.1);
            rotate: 5deg;
        }
}
`