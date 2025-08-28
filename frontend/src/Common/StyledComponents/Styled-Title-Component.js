import styled from 'styled-components'

export const TitleSubTitleStyled = styled.div`
    h5 {
        font-weight: 600;
        color: ${({ theme }) => theme.gray444};
        line-height: auto;
       
        @media(max-width: 991px) {}
    }

    span {
        font-size: 1rem !important;
        line-height: .8rem !important;
        font-weight: 500;
        color:${({ theme }) => theme.clientPrimaryColor};
    }
` 