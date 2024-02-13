import styled from "styled-components";

export const Features = styled.div`
    .fatures {
        padding: 80px 0;
        margin-top: 20px;
        margin-bottom: 50px;
        background-color: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.white};
        display: flex;
        flex-direction: column;
        justify-content-center;
        align-items: center;

        a {
            color: ${({ theme }) => theme.white};
            svg {
                stroke: ${({ theme }) => theme.white};
            }

        }

        .box1, .box2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 1rem;
            padding: 0;
        }

        .title {
            font-size: 3rem;
        }

        .box1 img, .box2 img {
            width: 30%;
        }

        .box1 {
            background-color: ${({ theme }) => theme.teritoryColor};
            
        }
        .box2 {
            background-color: ${({ theme }) => theme.secondaryColor};
        }
        .decImg {
            width: 100%;
            object-fit: cover;
            object-position: center;
        }

        @media (max-width: 991px) {
            .decImg {
                height: 200px;
                
            }
            .box1, .box2 {
                padding: 25px
            }
        }
}
`;
