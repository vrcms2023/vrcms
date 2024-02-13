import { createGlobalStyle } from "styled-components";
import careerBgImg from "../../Images/careers-bg.jpg";

export const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;500&family=Poppins:wght@100;200;300;400;600&family=Roboto:wght@300;500&display=swap');

* {
    margin:0;
    padding: 0;
}

ul, li {
    margin: 0;
    padding:0;
    // list-style: none;
}

a {text-decoration: none}

h1, h2, h3, h4, h5, h6 {
    font-family: Poppins;
}

body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
}


.navbar {
    background-color:${({ theme }) => theme.navbarBg}; 
    box-shadow: 0px 5px 30px #111111;
    height: 80px;

    .nav-Link {
        color:${({ theme }) => theme.navbarLinkColor}; 

        &:hover {
            color:${({ theme }) => theme.navbarLinkHoverColor};
        }
    }
}

.carousel-caption {
    h1 { color:${({ theme }) => theme.carouselSlideTitleColor};     }
    p { color:${({ theme }) => theme.carouselSlideCaptionColor}; }
}


.ABrief {
    background-color:${({ theme }) => theme.ABriefBg}; 
    color:${({ theme }) => theme.ABriefTextColor};
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) =>
  theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) =>
    theme.ABriefTitleBorderColor}; }

.ABriefAbout {
    background-color:${({ theme }) => theme.ABriefAboutBg}; 
    color:${({ theme }) => theme.ABriefAboutTextColor};
}

.ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) =>
  theme.ABriefAboutTitleBorderColor}; }

.ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({
  theme,
}) => theme.ABriefAboutTitleBorderColor}; }


.homeServices {
    color:${({ theme }) => theme.secondaryColor}; 
    h2 {
        color:${({ theme }) => theme.secondaryColor}; 
        border-color: ${({ theme }) => theme.primaryColor}; 
    }

    h3 {
        color:${({ theme }) => theme.secondaryColor}; 
    }

    a.btn {
        background-color:${({ theme }) => theme.primaryHoverColor};
    }

    a.btn:hover {
        background-color:${({ theme }) => theme.primaryColor};
    }
}

.btn {
    border-radius: 50px !important;
    transition: all .35s;

    // &:hover svg { transform: rotate(-45deg);}
    &:hover {
      letter-spacing: .1rem;
    }
    &:hover svg { 
      transform: translateX(10px);
    }
}
.btn-primary {
    background-color:${({ theme }) => theme.primaryColor}; 
    color:${({ theme }) => theme.white};
}
.btn-primary:hover {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.primaryColor};
}

.btn-secondary {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.white};
}

.btn-secondary:hover {
    background-color:${({ theme }) => theme.primaryColor}; 
    color:${({ theme }) => theme.secondaryColor};
}

.btn-outline {
    border: 3px solid ${({ theme }) => theme.secondaryColor} !important; 
    color:${({ theme }) => theme.primaryColor};
}

.btn-outline:hover { }

.btn-more {
  border: 1px solid ${({ theme }) => theme.lightgray} !important; 
  color:${({ theme }) => theme.primaryColor};
}

.homeCareers {
    background-color:${({ theme }) => theme.teritoryColor};
    background-image:url(${careerBgImg});
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div, p {
        text-align: center !important;
    }

    .briefIntro {
        padding-left: 0 !important;
        padding-bottom: 0 !important;
        
    }

    @media (max-width: 991px) {
    
        .briefIntro {
            padding-left: 1rem !important;
            padding-bottom: 1rem !important;
        }
    }
}

// Testimonial Component Styles

.testimonials {
    background-color:${({ theme }) => theme.testimonialsBg}; 
    color:${({ theme }) => theme.testimonialsTextColor};
    min-height: 530px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

    .title {color:${({ theme }) => theme.testimonialsHeadingColor};}
    p {color:${({ theme }) => theme.testimonialsTextColor};}

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

// End of Testimonial Component Styles //

.testimonialList img{
    width: 120px;
    height: 120px;
    box-shadow: 0 5px 5px ${({ theme }) => theme.teritoryColor};
}
.testimonialList:last-child {
    border: none !important
}

.lineClamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.lc1 {-webkit-line-clamp: 1;}
.lc2 {-webkit-line-clamp: 2;}
.lc3 {-webkit-line-clamp: 3;}
.lc4 {-webkit-line-clamp: 4;}
.lc5 {-webkit-line-clamp: 5;}

.cursorPointer {
  cursor: pointer
}

.pageTitle {
  color: ${({ theme }) => theme.pageTitleColor};
}



.newsModel {
        position: fixed;
        z-index: 999999;
        top: 0px;
        bottom: 0px;
        left: 0px;
        // width: 500px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .newsModel img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 0%;
      }
      
      .newsModalWrapper {
        width: 70%;
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .newsModalWrapper .newsDetails {
        max-height: 400px;
        overflow-y: auto;
      }
      
      @media (max-width: 768px) {
        .newsModalWrapper {
          width: 100%;
        }
      
        .newsModalWrapper .newsDetails {
          max-height: 300px;
        }
    }
    .error {
      color: ${({ theme }) => theme.error};
      text-align: center;
      margin: 0.5rem 0
    }


    .page-link {
      color: ${({ theme }) => theme.primaryColor} !important;
    }

    .active>.page-link, .page-link.active {
      background-color: ${({ theme }) => theme.primaryColor} !important; 
      color: ${({ theme }) => theme.white} !important;
      border-color: ${({ theme }) => theme.primaryColor} !important;
    }

    .deleteSection {
      position: absolute;
      top: 55px;
      right: 0px;
      z-index: 999;
      cursor: pointer;
      margin-top: 5px;
      width: auto !important;
      border: 2px dashed rgb(255, 193, 7);
      background-color: ${({ theme }) => theme.white};
      padding: 5px 12px;
    }

    .editIcon {
      right: 0px;
      padding: 0 !important;
    }
`;
