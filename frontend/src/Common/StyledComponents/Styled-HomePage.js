import styled from "styled-components";

export const HomePageStyles = styled.div`

.ourCulture {
  background: #017db9;
  /* background-image: url("../../../Images/ourculture.png"); */
  background-size: cover;
  min-height: 530px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 75px !important;
}

.ourCulture .title {
  font-size: 2.6rem;
  font-weight: 500 !important;
}

.ourCulture .subTitle {
  font-size: 1.5rem;
  font-weight: 600 !important;
}

.professional {
  /* background-image: url("../../../Images/professional.png"); */
  background-size: cover;
  min-height: 265px;
}

.quality {
  /* background-image: url("../../../Images/quality.png"); */
  background-size: cover;
  min-height: 265px;
}

.transparency {
  /* background-image: url("../../../Images/transparency.png"); */
  background-size: cover;
  min-height: 265px;
}

.borderBottom {
  border-bottom: 1px solid ${({ theme }) => theme.grayddd};
}

.homePage .pageBanner img {
  height: calc(60vh - 100px);
}

.homeProjectsInfo .breiftopMargin {
  margin-top: 0px !important;
}

.homeProjectsInfo .breiftopMargin > .container > div {
  padding-top: 0px !important;
}

.homeBriefheilights {
  /* background-color: #FF9D00; */
  background-image: url("../../../Images/homeBriefHilghtBg.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 24px 0;

  // h5, .btn, p  {
  //   color: ${({ theme }) => theme.white};
  // }

  

  .adminEditTestmonial  {
    color: ${({ theme }) => theme.gray444};

    h5 {
      color: ${({ theme }) => theme.gray444};
    }

    .ql-editor {
      p, p span {
        color: ${({ theme }) => theme.gray444} !important;
      }
    }
  }
}

/* Home Page Projects Carousel CSS */
.slick-list {
  width: 800px;
}

`