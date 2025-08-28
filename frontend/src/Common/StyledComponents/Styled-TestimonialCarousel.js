import testmonialBgImg from "../../Images/testimonialBg.jpg";

import styled from "styled-components";

export const TestimonialCarouselPageStyled = styled.div`

.testimonialsContainer {
  background-image: url(${testmonialBgImg});
    background-position: 50% 0;
    background-repeat: no-repeat;
    padding: 150px;

    @media (max-width: 576px) {
      padding: 10px;
    }
}
    
.testimonials {
    // background-color:${({ theme }) => theme.testimonialsBg}; 
    background-color: rgba(13, 117, 186, .9);
    color:${({ theme }) => theme.testimonialsTextColor};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // border: 1px solid ${({ theme }) => theme.gray888};
    // background: rgb(255,255,255);
    // background: linear-gradient(360deg, ${({ theme }) => theme.white} 0%, ${({ theme }) => theme.primaryColor} 100%);
    // border-radius: 30px;
    padding: 48px 0 !important;

    h5 {
      color: ${({ theme }) => theme.white};
      margin-bottom: 1rem;
    }

    .testimonialImg {
        width: 125px;
        height: 125px;
        object-fit: cover;
        box-shadow: 0 5px 5px rgba(0,0,0, .5) !important
      }

      // i.fa {
      //   color:${({ theme }) => theme.testimonialsLinkColor};

      //   &:hover {
      //       color: ${({ theme }) => theme.testimonialsLinkHoverColor};
      //   }
      // }

    .title {color:${({ theme }) => theme.testimonialsTextColor}; text-align: left;}
    p {color:${({ theme }) => theme.testimonialsTextColor}; text-align: left;}

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

.ql-editor {
  cursor: pointer;
}

.slick-prev {
  left: -50px !important;

  @media(max-width: 480px) {
    left: -25px !important;
  }
}

.slick-next {
  right: -50px !important;

  @media(max-width: 480px) {
    right: -25px !important;
  }
}

.slick-list {
  
  @media(max-width: 1500px) {
    width: 600px !important;
  }

  @media(max-width: 1300px) {
    width: 500px !important;
  }

  @media(max-width: 1024px) {
    width: 400px !important;
  }

  @media(max-width: 480px) {
    width: 320px !important;
  }
}


`;
