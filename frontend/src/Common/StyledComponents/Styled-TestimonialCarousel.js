import styled from "styled-components";

export const TestimonialCarouselPageStyled = styled.div`

.testimonials {
    // background-color:${({ theme }) => theme.testimonialsBg}; 
    background: rgb(255,255,255);
    background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);
    padding: 100px 0;
    color:${({ theme }) => theme.textColor};
    min-height: 530px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // border-radius: 30px;
    // padding: 70px 75px !important;

    .testimonialImg {
        width: 125px;
        height: 125px;
        object-fit: cover;
        box-shadow: 0 5px 5px rgba(0,0,0, .5) !important
      }

      i.fa {
        color:${({ theme }) => theme.testimonialsLinkColor};

        &:hover {
            color:${({ theme }) => theme.testimonialsLinkHoverColor};
        }
      }

    .title {color:${({ theme }) => theme.black};}
    p {color:${({ theme }) => theme.textColor};}

    .article {
        /* top: 0;
          left: 0; */
        /* width: 100%;
          height: 100%; */
        opacity: 0;
        transition: all 0.3s linear;
      }
      
      .article.activeSlide {
        opacity: 1;
        transform: translateX(0);
      }
      
      .fa-user {
        font-size: 100px;
      }
      .article.lastSlide {
        // transform: translateX(-100%); 
      }
      
      .article.nextSlide {
        //  transform: translateX(100%); 
      }
}
`;
