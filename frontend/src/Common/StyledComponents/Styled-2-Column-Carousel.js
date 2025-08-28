import styled from 'styled-components';

export const TwoColumnCarouselStyles = styled.div`
.homeMultyPurposeCarousel {
  background-color: rgba(34, 34, 34, .1);
  position: relative;

  .container {
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
    top: 1rem !important;
    align-items: start;
    opacity: 0.7 !important;
    width: auto !important;
    height: 0 !important;
    bottom: auto !important;
  }

  .carousel-control-prev {
    left: 92% !important;

    @media (min-width: 421px) and (max-width: 1024px) {
      left: 85% !important;
    }

    @media (max-width: 480px) {
      left: 74% !important;
    }
  }

  .carousel-control-next {
    right: 48px;

    @media (max-width: 480px) {
       right: 24px;
    }
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    padding: 12px;
    background-color: #222;
    border-radius: 4px;
    display: inline-block;
    background-size: 60%;
  }

  .carouselImg,
  .carouselDescription {
    height: 500px;

    @media (max-width: 480px) {
      height: auto;
    }
  }
  .carouselImg img {
    height: 100%;
    object-fit: cover;
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