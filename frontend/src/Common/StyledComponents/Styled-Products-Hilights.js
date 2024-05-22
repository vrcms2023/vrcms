import styled from "styled-components";

export const ProductHilightsStyled = styled.div`

    .hiligntsContainer {
        bottom: -75px        
    }
    .col-sm-4 {
        &:nth-child(1) {
            background: #44B2E5;
        }

        &:nth-child(2) {
            background: #0084CF;
        }

        &:nth-child(3) {
            background: #3154A5;
        }

        p {
            font-size: .9rem;
            margin: 0px
        }
    }
l`;