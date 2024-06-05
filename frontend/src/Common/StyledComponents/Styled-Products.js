import styled from "styled-components";

export const ProductStyled = styled.div`

.productCategorySearch {
    width: 35%;
    min-width: 500px;
    right: 25px; 
    top: -170px; 
    z-index: 999;
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


export const ProductItemStyled = styled.div`

.productDetails .imgSelected {
    padding-left: 100px;
    padding-right: 100px;
    img {
        height: 300px;
        object-fit: cover;

        @media (max-width: 480px) {
            height: 200px;
        }
    }  

    @media (max-width: 991px) {
        padding: 15px;
    }
}

    
    .allProducts.rightPositioned {
        right: 100px;
        top: 90px;
        height: 65vh;
        resize: vertical;
        overflow-y: scroll;
        // background: ${({theme}) => theme.primaryColor};
        background: linear-gradient(17deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 100%);
        border: 2px solid ${({theme}) => theme.white};
        padding: 20px 0;
        img {
            border: 2px solid ${({theme}) => theme.white};
            transition: transform 0.7s ease-out, rotate 0.3s ease-in-out;
            width: 80% !important;
            height: 120px;
            &:hover {
                transform: scale(1.1);
                // rotate: 5deg;
            }
            }
        .productName  {
            padding: 10px 0 !important ;
            font-size: .8rem !important;
        }

}

.allProducts.bottomPositioned {
    .product img {
        @media (max-width: 480px) {
            height: 120px;
        }
    }
}
.rightPositioned::-webkit-scrollbar {
    width: 8px;
}

.rightPositioned::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(225,242,253,0.3); 
    border-radius: 3px;
}

.rightPositioned::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,137,207,0.7); 
}

// .rightPositioned::before,  .rightPositioned::after {
//     background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
//     content: "";
//     height: 100%;
//     width: 30%;
//     z-index: 2;
//     position: absolute;
// }
`



