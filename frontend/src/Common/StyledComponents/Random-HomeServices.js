import styled from "styled-components";

export const RandomHomeServicesStyled = styled.div`
    .randomServices img {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        height: 320px;
        object-fit: cover;
        filter: grayscale(100%);
        transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;

        &:hover {
            filter: grayscale(0%);
            transform: scaleX(1.05);
        }
    }
    .randomServices .row:nth-child(2) img {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px
    }

    @media (max-width: 576px) {
        .randomServices .row img {
            border-radius: 0px !important;
            height: 200px;
        }
    }
l`;