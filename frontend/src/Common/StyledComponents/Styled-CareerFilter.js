import styled from "styled-components";

export const CareerFilterStyled = styled.div`
    background: ${({theme}) => theme.white};
    color: ${({theme}) => theme.gray444}
    
    padding: 4px 0;

    .careersFilter {
        background: ${({theme}) => theme.verylightgray};
        border: 1px solid  ${({theme}) => theme.verylightgray} !important;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    input, select {
        border: 1px solid  ${({theme}) => theme.verylightgray} !important;
        border-radius: 4px !important;
    }

    input[type="checkbox"] {
        border: 1px solid  ${({theme}) => theme.grayddd} !important;
        border-radius: 0px !important;
    }

    label {
        font-size: .9rem  !important;
    }
`