import styled from "styled-components"

export const AdvertiseComponentStyled = styled.div`
    position: fixed; 
    top: 0; 
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999; 
    background: #000; 
    background: rgba(0, 0,0, .9);

    span {
        position: absolute;
        right: 30px;
        top: 30px;
        cursor: pointer;
    }

    .imgContainer {
        margin: 50px auto;
        height: 700px;
        width: 600px;
    }

    img {
        height: 550px
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