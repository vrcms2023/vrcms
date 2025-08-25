import styled from "styled-components";

export const HomeProjectCauroselComponentStyles = styled.div`
    
.homeMultyPurposeCarousel {
  position: relative;

  .container-fluid {
    background-color: rgba(34, 34, 34, 0.1);
  }

  .carousel-indicators {
    display: none;
    button {
      width: 16px;
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    top: 24px !important;
    right: 24px;
    align-items: start;
    opacity: 0.7 !important;
    width: auto !important;

    @media (max-width: 480px) {
      top: -16px !important;
    }
  }

  .carousel-control-prev {

    @media (min-width: 992px) {
      left: 85% !important;
    }

    @media (max-width: 991px) {
      left: 80% !important;
    }

    @media (max-width: 480px) {
      left: 60% !important;
    }

    
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    padding: 12px;
    background-color: #222;
    // display: none;
    border-radius: 4px;
    // display: inline-block;
    background-size: 60%;
  }

  .carouselImg,
  .carouselDescription {
    height: 100vh;

    > div {
      height: 100%;
    }

    @media (max-width: 480px) {
      height: auto;
    }
  }
  .carouselImg {
    // padding: 8px !important;
    img {
        height: 100%;
        object-fit: cover;
        box-shadow: 10px 0 20px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .carouselDescription {
    padding: 0 80px;

    @media (max-width: 820px) {
      padding: 32px;
    }

    h1 {
      font-size: 32px;
      color: #222;
    }
    span {
      color: #6d2f9b;
    }
  }
}
`