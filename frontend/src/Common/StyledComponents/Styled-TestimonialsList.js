import styled from "styled-components";

export const TestimonialsListPageStyled = styled.div`

  .testimonialsPage {
    hr:last-child {
      display: none;
    }

    .testimonialAvatar  img {
      width: 150px;
      height: 150px;
    }

    .normalCSS, .flipCSS {
      // padding: 24px 10px;
      margin-top: 24px !important;
      border: 1px solid ${({ theme }) => theme.verylightgray} !important;
    }
      
    .flipCSS {
      flex-direction: row-reverse;
      background: #fbfbfb;
      // margin-bottom: 48px;

      @media (max-width: 768px) {
        padding: 0;
        margin: 0px;
      }
    }
  }
  
  .deleteIcon {
    top: 48px;
    i {padding: 10px 12px !important;}
  }
`;
