import styled from "styled-components";

export const ABriefIntroStyled = styled.div`
    background: rgb(225,242,253);
    background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 100%);

    form {
        padding: 30px 50px;
        border-radius: 15px;
        border: 1px solid ${({theme}) =>  theme.primaryColor};
        background: ${({theme}) =>  theme.white};
    }
`