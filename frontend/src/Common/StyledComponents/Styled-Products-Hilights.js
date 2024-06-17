import styled from "styled-components";

export const ProductHilightsStyled = styled.div`
    // padding: 50px 0;

    .hiligntsContainer {
        bottom: -75px        
    }
    .col-sm-4 {
        &:nth-child(1) {
            background: ${({ theme }) => theme.gray999};
        }

        &:nth-child(2) {
            background: ${({ theme }) => theme.gray666};
        }

        &:nth-child(3) {
            background: ${({ theme }) => theme.gray333};
        }

        p {
            font-size: .9rem;
            margin: 0px
        }
    }
l`;