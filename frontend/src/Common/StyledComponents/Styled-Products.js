import styled from "styled-components";

export const ProductStyled = styled.div`

.productCategorySearch {
    width: 35%;
    min-width: 500px;
    right: 25px; 
    top: -170px; 
    background: rgb(0,132,207);

    .productCategory {
        background: rgb(225,242,253,1);
        height: 70px;
    }

    .productSearch {
        background: rgb(0,132,207, 1);
        height: 70px;

        .search, .form-select {
            width: 400px
        }
    }
    
    @media (max-width:991px) {
        right: 2.5%;
        min-width: 95%;
        margin: 0 auto;

        .search, .form-select {
            width: 400px
        }
    }

    @media (min-width: 300px) and (max-width: 480px) {
        .search, .form-select {
            width: 300px !important;
        }
    }
}
.productsList, .productDetails {
    margin-top: 60px;
}
`;


export const ProductItemStyled = styled.span`
    img {
        border: 2px solid ${({theme}) => theme.white};
        transition: transform 0.7s ease-out, rotate 0.3s ease-in-out;
        height: 180px;
        &:hover {
            transform: scale(1.1);
            // rotate: 5deg;
        }
}
`