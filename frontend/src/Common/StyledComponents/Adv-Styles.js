import styled from "styled-components"

export const AdvertiseComponentStyled = styled.div`
    position: fixed; 
    top: 0%; 
    right: 0;
    bottom: 0%;
    left: 0;
    z-index: 999999; 
    background: #000; 
    background: rgba(0, 0,0, .8);
    transform: translate(0%, 0%);
    height: 100%; 

    span.close {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        text-align: center;
        background: rgba(0,0,0, .4);
        border-bottom-left-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        font-size: 24px;
        z-index: 999999;
    }

    .imgContainer {
        position: relative;
    }

    .advertismentInfo {
        position: absolute;
        background: rgba(0,0,0, .4);
        color: #fff;
        bottom: 0;
        padding: 16px;
        width: 100%;
        text-align: right;
    }

    .title {
        width: 100%;
        bottom: 120px;
    }

    .small {
        width: 640px;
        height: auto;
        margin: 1% auto;
    }

    .medium {
        width: 1000px;
        height: auto;
        margin: 6% auto;
    }

    .large {
        width: 1200px;
        height: auto;
        margin: 2% auto;
    }

    img {
        width: 100%;
        height:100%;
        object-fit: contain;
    }

    .slide-top {
        -webkit-animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @keyframes slide-top {
    0% {
        -webkit-transform: translateY(-300px);
                transform: translateY(-300px);
    }
    100% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
    }
}

   
`