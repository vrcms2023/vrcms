import styled from 'styled-components'

export const HomeCauroselComponentStyles = styled.div`

  .carousel-item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, .15) 0%, rgba(0, 0, 0, .75) 80%);
    z-index: 1;
    pointer-events: none;
  }

  .carousel-item {
    overflow: hidden;
    height: 60vh;
    position: relative;

    @media (max-width: 480px) {
      height: 50vh;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .carousel-caption {
      position: absolute;
      z-index: 999;
      text-align: left !important;
      // bottom: 10%;
      // right: 10%;
      // width: 50%;
      transform: translate(0%, -50%);
      padding: 0 !important;
      bottom: 0 !important;

       @media(min-width: 1024px) {
        width: 50%;
      }

      @media(max-width: 1280px) {
        // width: 60%;
        // bottom: 10%;
      }

      @media(max-width: 1024px) {
        // width: 70%;
        // bottom: 15%;
      }

      @media(max-width: 1024px) {
        transform: translate(0%, -100%);
        padding: 0px !important;
      }

      h1 {
        letter-spacing: 0.1rem;
        font-weight: 600 !important;
        font-size: 3rem !important;
        margin: 0px;
        text-shadow: 0px 4px 0 rgba(0,0,0, .3);
        color:${({ theme }) => theme.carouselSlideTitleColor};
        word-wrap: break-word;
        hyphens: auto;
        line-height: 1.2;

        @media(max-width: 480px) {
          font-size: 2rem !important;
          font-weight: normal  !important;
        }
        }
      }

      p.description {
        color: ${({ theme }) => theme.white};
        color:${({ theme }) => theme.carouselSlideCaptionColor};

        @media(max-width: 768px) {
          font-size: 0.9rem !important;
          letter-spacing: 0.1rem;
          font-weight: normal;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }

      .subtitle {
        color: ${({ theme }) => theme.white};
        letter-spacing: .1rem;
        text-transform: uppercase;
        font-weight: normal !important;
        font-family: "Barlow",sans-serif;
        font-size: 1.2rem;

        @media(min-width: 768px) {
          font-size: .9rem;
        }

        @media(max-width: 768px) {
          display: none;
        }
      }

      .ql-editor {
        padding: 0;
        p, p span {
          color: ${({ theme }) => theme.white};
          text-align: left;
          letter-spacing: .05rem;
        }
      }
    }
  
.noImg {
  min-height: 300px;
}

.homeCarousel::after {
  content: "";
  display: block;
  /* background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0%,
    rgba(22, 93, 61, 0.95) 95%
  ); */
  position: absolute;
  height: 60vh;
  width: 100%;
  top: 0;
}


@media (max-width: 768px) {

  
.banner {
    height: 200px !important;
  }

  .carousel-item img,
  .homeCarousel::after {
    height: 50vh; 
  }
}

`