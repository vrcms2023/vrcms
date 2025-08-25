import styled from "styled-components"

export const HomeServiceStylesComponent = styled.div`
.homeServices .row.service:nth-child(odd) {
  flex-direction: row-reverse;
}


.homeServices {
    position: relative;


    img {
        object-fit: cover;
    }

    h3 {
        font-size: 2rem;
        font-weight: bold;
    }
    .briefIntro h5 {
        font-size: 2.5rem;
        padding-left: 15px;
        border: 0px;
        border-left-width: 15px;
        border-style: solid;
        text-align: left;
    }

    .serviceTitle {
        color: #141414;
        font-size: 40px;

        @media (max-width: 576px) {
            font-size: 2rem;
        }
    }

    .homeServiceImg {
        height: 270px;
        -o-object-fit: contain;
        -o-object-position: center;
    }

    .breiftopMargin .container > div {
        padding: 10px 0 !important;
    }

    
    .row.service {
        background-color: #fff;
        /* box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075); */
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: hidden;

        h5 {
            font-size: 1.3rem !important;
            color: ${({ theme }) => theme.gray444};
            text-transform: uppercase;
            font-weight: 500 !important;
            margin-bottom: 1rem;
        }

        // .ql-editor {
        //     padding: 0 !important;
        // }

        .homeServiceImg {
            padding: 0 !important;
        }

        .homeServiceDetails {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;

            // .ql-editor .description > *:not(p:first-of-type) {
            //     display: none;
            // }

        }
    }
    .row.service:last-child {
        margin-bottom: 0px !important;
    }

    homeServiceDetails {
        .description {
            p:first-child {
                display: block;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}
`;