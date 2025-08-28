// import bgImage from '../../Images/homeBriefHilghtBg.png';
import bgImage from '../../Images/industriesWeServe.jpg';

import styled from 'styled-components'

export const CounterComponentStyles = styled.div`
    background-image: url(${bgImage});
    background-position: top;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    color: ${({ theme }) => theme.white};;
    position: relative;

    @media(min-width: 992px) {
        padding: 180px 0;
    }

    @media(max-width: 991px) {
        padding: 120px 0;
    }

    @media(max-width: 480px) {
        padding: 90px 0;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            // rgba(1, 33, 96, 0.92),  
            rgba(0, 0, 0, 0.9),
             #ef3f366d
        );
        z-index: 0;
        pointer-events: none; /* let clicks pass through */
    }

     > * {
        position: relative;
        z-index: 1;
    }

    .counterComponentView {
        .counterTitle{
            text-align: center;
            margin: auto;
            color: ${({ theme }) => theme.white} !important;

            @media(max-width: 480px) {
                font-size: 1.5rem !important;
                margin-bottom: 20px;
            }
        }
    }
    
    .counterComponentViewContainer  {
        border: 2px solid rgba(255, 255, 255, .1);
        box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.4);
        padding: 24px;
        margin-top: 1rem;
        gap: 30px;

        @media(max-width: 991px) {
            gap: 24px;
        }

        @media(max-width: 480px) {
            gap: 10px;
        }

        .counterItem {
            gap: 28px;

            @media(max-width: 991px) { 
                gap: 24px;
            }

            @media(max-width: 480px) {
                gap: 12px;
            }
        }

        .counterLabel {
            width: 120px;
            text-align: right;

            @media(min-width: 481px) {
                font-size: 1.2rem;
            }

            @media(max-width: 480px) {
                font-size: 1.2rem;
            }
        }

        .counterValue {
            
            // text-decoration: underline;
            // text-underline-offset: 12px;
            // text-decoration-thickness: 4px;
            // text-decoration-color: ${({ theme }) => theme.black};
            color: ${({ theme }) => theme.white};
            // box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.4);

            font-weight: bold;
            background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImage});
             background-size: cover;
            background-position: center;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent; 
        }

        

        .counterValue, .counterLabel  {
            margin: 0
        }
    }

    .counterValue {
        span {
            font-size: 8rem;

            @media(max-width: 991px) {
                font-size: 5rem;
            }

            @media(max-width: 480px) {
                font-size: 4rem;
            }
        }
    }

    .counterSymbol {
        font-size: 3rem;

         @media(max-width: 480px) {
            font-size: 2rem;
        }
    }
`