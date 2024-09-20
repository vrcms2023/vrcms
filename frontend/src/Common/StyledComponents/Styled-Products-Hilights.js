import styled from "styled-components";

export const ProductHilightsStyled = styled.div`
    // padding: 50px 0;

    .hiligntsContainer {
        bottom: -75px;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, .25);     
    }
    .col-sm-4 {
        &:nth-child(1) {
            background: ${({ theme }) => theme.white};
        }

        &:nth-child(2) {
            background: ${({ theme }) => theme.verylightgray};
        }

        &:nth-child(3) {
            background: ${({ theme }) => theme.white};
        }

        p {
            font-size: .9rem;
            margin: 0px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp:2;
        }
    }
l`;