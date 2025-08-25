import styled from 'styled-components'

export const WeServedStyled = styled.div`
    .weServe {
        position: relative;
        display: flex;

        img {
            max-height: 100vh;
            max-width: 100%;
        }

        .carousel-info {
            position: absolute;
            z-index: 999;
            width: 30%;
            background: rgba(255, 255, 255, 0.85);
            padding: 24px;
            margin: 24px;
            max-height: 100vh;
            overflow-y: auto;

            h1 {
                margin: 0px;
            }
        }
    }

    // .slider-container {
    //     width: 100%;
    //     min-height: 0;
    //     min-width: 0;
    //     padding: 20px;
    //     overflow: hidden;
    //     }

    //     .slider-container .slick-slide {
    //     // width: 1024px !important; /* Or any fixed width */
    //     }
    //     .slick-list,
    //     .slick-slider,
    //     .slick-track {
    //     display: block;
    //     position: relative;
    //     }
    //     *,
    //     .slick-slider {
    //     box-sizing: border-box;
    //     }
    //     .slick-slider {
    //     -webkit-touch-callout: none;
    //     touch-action: pan-y;
    //     -webkit-user-select: none;
    //     user-select: none;
    //     -khtml-user-select: none;
    //     margin: 30px auto 50px;
    //     }
`