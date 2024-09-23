import { createGlobalStyle } from "styled-components";
import careerBgImg from "../../Images/careers-bg.jpg";

export const GlobalStyles = createGlobalStyle`


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
    font-size: 16px;
}

.btn {
  border-radius: 0.375rem !important;
  transition: all .35s;
  padding: .6rem 1.2rem !important;

  // &:hover svg { transform: rotate(-45deg);}
  &:hover {
    letter-spacing: .1rem;
  }
  &:hover svg { 
    transform: translateX(10px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
}
.btn-primary {
  background-color:${({ theme }) => theme.btnPrimary}; 
  color:${({ theme }) => theme.btnPrimaryTextColor};
  // border: 1px solid ${({ theme }) => theme.btnPrimaryBorderColor} !important; 

}
.btn-primary:hover {
  background-color:${({ theme }) => theme.btnPrimaryHover}; 
  color:${({ theme }) => theme.btnPrimaryTextHoverColor};
  // border: 1px solid ${({ theme }) => theme.btnPrimaryBorderHoverColor} !important; 
}

.btn-secondary {
  background-color:${({ theme }) => theme.btnSecondry}; 
  color:${({ theme }) => theme.btnSecondryTextColor};
  border: 1px solid ${({ theme }) => theme.btnSecondryBorderColor} !important;
}

.btn-secondary:hover {
  background-color:${({ theme }) => theme.btnSecondryHover}; 
  color:${({ theme }) => theme.btnSecondryTextColor};
  border: 1px solid ${({ theme }) => theme.btnSecondryBorderHoverColor} !important;
  
}

.btn-outline {
  background-color:${({ theme }) => theme.btnOutline}; 
  color:${({ theme }) => theme.btnOutlineTextColor};
  border: 1px solid ${({ theme }) => theme.btnOutlineBorderColor} !important; 
  font-weight: 600;
}

.btn-outline:hover { 
  background-color:${({ theme }) => theme.btnOutlineHover}; 
  color:${({ theme }) => theme.btnOutlineTextHoverColor};
  border: 1px solid ${({ theme }) => theme.btnOutlineBorderHoverColor} !important; 
}

.moreLink {
  color:${({ theme }) => theme.primaryColor};
}

.moreLink:hover {
  color:${({ theme }) => theme.secondaryColor} !important;
}

.carousel-caption {
    h1 { color:${({ theme }) => theme.carouselSlideTitleColor};     }
    p { color:${({ theme }) => theme.carouselSlideCaptionColor}; }
}

.ABrief {
    background-color:${({ theme }) => theme.verylightgray}; 
    color:${({ theme }) => theme.ABriefTextColor};
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) =>
  theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) =>
    theme.ABriefTitleBorderColor}; }

  // .ABriefAbout {
//     background: rgb(225,242,253);
//     background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 100%);
//     background-color:${({ theme }) => theme.ABriefAboutBg}; 
//     color:${({ theme }) => theme.ABriefAboutTextColor};
// }

// .ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) => theme.ABriefAboutTitleBorderColor}; }

// .ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({ theme}) => theme.ABriefAboutTitleBorderColor}; }


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
        background-color:${({ theme }) => theme.primaryColor};
    }

    a.btn:hover {
        background-color:${({ theme }) => theme.secondaryColor};
    }
}

.moreLink:hover {
  color:${({ theme }) => theme.btnLinkTextHoverColor};
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
        height: 90%;
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .newsModalWrapper .newsDetails {
        max-height: 95%;
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
      color: ${({ theme }) => theme.secondaryColor} !important;
    }

    .active>.page-link, .page-link.active {
      background-color: ${({ theme }) => theme.secondaryColor} !important; 
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

    .mt-6 {
      margin-top: 6rem;
    }

    .mt-7 {
      margin-top: 7rem;
    }

    .mt-8 {
      margin-top: 8rem;
    }

    .mt-9 {
      margin-top: 9rem;
    }

    .mt-10 {
      margin-top: 10rem;
    }

    .mt-11 {
      margin-top: 11rem;
    }

    .mt-12 {
      margin-top: 12rem;
    }

    input,
    textarea, select {
      background-color: ${({theme}) => theme.inputBg};
      border: 1px solid ${({theme}) => theme.inputBorder} !important;
      padding: 12px 10px;
    }
    input[type="checkbox"], input[type="radio"] {
      padding: 0;
      margin: 0;
    }

    .scrollTop {
      background-color: ${({theme}) => theme.secondaryColor};
    }

   
    
`;
