import styled from "styled-components";

export const CareersFormStyled = styled.div`
    background: ${({theme}) => theme.verylightgray};

    
    .careers-or-text {
        padding: 20px 0 15px;
        position: relative;
        text-align: center;
    } 
    .careers-or-text:before, .careers-or-text:after {
        content: '';
        position: absolute;
        background-color: #6d6e7224;
        height: 1px;
        width: 40%;
        top: 32px;
    }

    .careers-or-text:before {
        right: 0;
    }

    .careers-or-text:after {
        left: 0;
    }   

    .careers-or-text label {
        margin-bottom: 0;
        padding: 0 5px;
        display: inline-block;
    }

    
`