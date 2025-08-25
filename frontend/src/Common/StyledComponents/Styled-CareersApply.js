import styled from "styled-components";

export const CareersFormStyled = styled.div`
    // border: 1px solid ${({theme}) => theme.verylightgray};
    // padding: 1rem .3rem;

      .applyJob {
        padding: 1rem;
    background-color: ${({ theme }) => theme.lightWhiteF8};
    h5 {
      font-size: 1.4rem !important;
    }
  }

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

    input, select, textarea {
        border: 1px solid  ${({theme}) => theme.verylightgray} !important;
        border-radius: 4px !important;
        font-size: .8rem !important;
    }

    input[type="checkbox"] {
        border: 1px solid  ${({theme}) => theme.grayddd} !important;
        border-radius: 0px !important;
    }

    label {
        font-size: .9rem  !important;
    }
    
`