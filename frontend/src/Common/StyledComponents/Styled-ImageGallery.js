import styled from "styled-components";

export const ImageGalleryStyled = styled.div`
  padding: 0 0 80px;

   @media(max-width: 480px) {
    padding: 0 0 30px;
   }
  .gallery {
    img {
      cursor: pointer;
      border: 3px solid ${({ theme }) => theme.grayddd};
      border-radius: 4px;
      height: 200px;
      box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
      filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
    transition: filter 0.3s ease-in-out;
    object-fit: cover;

      &:hover {
          -webkit-filter: grayscale(0);
          filter: none;
          border: 6px solid ${({ theme }) => theme.grayddd};
      }
    }
  }

  .homeGalleryCarousel {
    background: ${({ theme }) => theme.verylightgray};
    // box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175);
    border-radius: 30px;
    height: 350px;

    .homeCarousel {
        margin-top: 0px;

        @media(max-width: 480px) {
          img {
            height: 290px !important;
          }
        }
    }

    .carousel-item, carousel-inner {
        border-radius: 30px;
        overflow:hidden;
    }

    .carousel-item::before {
      position: absolute;
      content: " ";
      background: linear-gradient(178deg,rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9;
      
    }

    .carousel-caption {
      z-index: 11;

      @media(max-width: 480px) { 
        bottom: 0;
        padding-bottom: 0
      }
    }
    .carousel-item img {
        height: 400px;
        border-radius: 30px;
        object-fit: cover;
    }

    .carousel-control-prev, .carousel-control-next {
        // right: -14%;
        top: -40%;
        opacity: 1;
        z-index: 99;

        @media(max-width: 480px) { 
           right: -10%;
        }

        @media(max-width: 1024px) { 
           right: 0%;
        }
    }

    .carousel-control-prev {
        // left: -14%;

        @media(max-width: 480px) { 
           left: -10%;
        }

        @media(max-width: 1024px) { 
           left: 0%;
        }
    }

    .carousel-control-prev span, .carousel-control-next span {
        border: 2px solid #fff;
        border-radius: 50px;
        background-size: 20px;
    }
  }

  .carousel-inner {
      position: relative;
      .imgInfo {
        position: absolute;
        background: ${({ theme }) => theme.gray444};
        color: ${({ theme }) => theme.white};
        bottom: 0;
        padding: 16px 24px;
        width: 100%;
        text-align: center;
      }
    }

  .viewAllBtn {
    margin-top: 170px
  }

    
`;
