import styled from "styled-components";

export const StyledShareComponent = styled.div`
    .share, .share i {
        color: ${({ theme }) => theme.clientPrimaryColor};
    }

    .share-buttons {
        position: absolute;
        // top: 2.3rem;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // gap: 1rem;
        background: ${({ theme }) => theme.white};
        z-index: 9;
        border: 1px solid #ddd;
        

        a {
            display: block;
            padding: .8rem 1rem;
            text-align: center;
            border-bottom: 1px solid ${({ theme }) => theme.grayddd};
            color: ${({ theme }) => theme.clientPrimaryColor};

            &:last-child {
                border: 0;
            }

            &:hover {
                color: ${({ theme }) => theme.gray444};
            }

            i {
                font-size: 1.8rem;
            }
        }
    }
`