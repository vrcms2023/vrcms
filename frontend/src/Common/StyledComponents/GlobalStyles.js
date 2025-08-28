import { createGlobalStyle } from "styled-components";
import careerBgImg from "../../Images/careers-bg.jpg";
import commonBgImg from "../../Images/background-styling-image.png";
import homeProjectsBgImg from "../../Images/home-ongoing-bg.jpg";
import homeFutureBgImg from "../../Images/home-future-bg.jpg";
import homeCompletedBgImg from "../../Images/home-completed-bg.jpg";
import homeServicesBgImg from "../../Images/homeServicesBg.jpg";
import homeMultiServicesBgImg from "../../Images/homeMultiServicesBg.jpg";

export const GlobalStyles = createGlobalStyle`

* {
    margin:0;
    padding: 0;
}

ul, li {
    list-style: none;
}

a {
  font-size: .9rem;
  color: ${({ theme }) => theme.gray444};
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: rgba(0, 0, 0, .3) !important;
  &:hover {
    color: ${({ theme }) => theme.footerLinkHoverColor};
    text-decoration-color: rgba(0, 0, 0, .8) !important;
  }
}

h1, h2, h3, h4, h5, h6, th {
    // font-family: Poppins;
    font-family: ${({ theme }) => theme.headingFontFamily};
}

th {
  font-weight: normal;
}
td {
  font-size: 15px;
}

body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    font-size: 16px;
    line-height: 1.6;
}

body, p {
  color: ${({ theme }) => theme.textColor};
}

.btn {
  font-family: ${({ theme }) => theme.headingFontFamily};
  font-weight: 400 !important;
  padding: 8px 16px !important;
  border: 0px !important;
  border-radius: 0 !important;
  // transition: all .35s;
  // padding: .6rem 1.2rem !important;
  // font-family: Amarante;
  // border-radius: 4px !important;

  // &:hover svg { transform: rotate(-45deg);}
  &:hover {
    // letter-spacing: .1rem;
  }
  &:hover svg { 
    transform: translateX(10px);
  }

  // @media (max-width: 480px) {
  //   width: 100%;
  // }
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
  background-color:${({ theme }) => theme.transparent}; 
  color:${({ theme }) => theme.btnOutlineTextColor};
  border: 1px solid ${({ theme }) => theme.btnOutlineBorderColor} !important; 
  font-weight: 500 !important;
}

.btn-outline:hover { 
  
  color:${({ theme }) => theme.btnOutlineTextHoverColor};
  border: 1px solid ${({ theme }) => theme.btnOutlineBorderHoverColor} !important; 
}

.moreLink {
  // color:${({ theme }) => theme.primaryColor};
}

.moreLink:hover {
  // color:${({ theme }) => theme.secondaryColor} !important;
}


.ABrief {
    background-color:${({ theme }) => theme.verylightgray}; 
    color:${({ theme }) => theme.ABriefTextColor};
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) => theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) => theme.ABriefTitleBorderColor}; }

  // .ABriefAbout {
//     background: rgb(225,242,253);
//     background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 100%);
//     background-color:${({ theme }) => theme.ABriefAboutBg}; 
//     color:${({ theme }) => theme.ABriefAboutTextColor};
// }

// .ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) => theme.ABriefAboutTitleBorderColor}; }

// .ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({ theme }) => theme.ABriefAboutTitleBorderColor}; }

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


.testimonialList img{
    width: 120px;
    height: 120px;
    box-shadow: 0 5px 5px ${({ theme }) => theme.teritoryColor};
}
.testimonialList:last-child {
    border: none !important
}



// .pageTitle {
//   color: ${({ theme }) => theme.pageTitleColor};
// }


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
        width: 60%;
        height: 80%;
        margin: auto;
        border-radius: 10px;
        overflow: auto;
      }
      
      // .newsModalWrapper .newsDetails {
      //   max-height: 95%;
      //   overflow-y: auto;
      // }

      .newsModalWrapper .newsDetails .quill {
        ol li, ul li {
          padding: 8px;
          border-bottom: 1px solid #eee;
          width: 60%;
          margin: auto;
        }
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
      margin: 0.5rem 0;
      font-size: .8rem;
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
      top: 72px;
      right: 0px;
      z-index: 999;
      cursor: pointer;
      margin-top: 5px;
      width: auto !important;
      border: 2px dashed rgb(255, 193, 7);
      background-color: ${({ theme }) => theme.white};
      padding: 5px 12px;
    }

    input,
    textarea, select {
      background-color: ${({ theme }) => theme.inputBg};
      border: 1px solid ${({ theme }) => theme.inputBorder} !important;
      padding: 10px !important;
      border-radius: 0px !important;
      color: ${({ theme }) => theme.gray444} !important;
      font-size: 14px !important;
    }
    input[type="checkbox"], input[type="radio"] {
      padding: 0;
      margin: 0;
      border-radius:3px !important;
      background-color: ${({ theme }) => theme.white};
    }

    input:checked[type=checkbox] {
      background-color: ${({ theme }) => theme.primaryColor};
    }

    .scrollTop {
      background-color: ${({ theme }) => theme.clientPrimaryColor} !important;
    }

    // .projectsList
    .commonBg, .homeDynamciServicesIntro, .homeServicesContainer, .homeServicesBrief,  {
      background-image:url(${commonBgImg});
      background-attachment: fixed;
      background-size: 100%;
      background-position: center;
    }

    .homeDynamciServices {
      background-image:url(${homeServicesBgImg});
      background-attachment: fixed;
      // background-color: ${({ theme }) => theme.clientPrimaryColor};
    }

    .homeProjectsContainer {
      padding: 0;
      
      .cardItem:nth-child(1):after, .cardItem:nth-child(2):after, .cardItem:nth-child(3):after {
        content: "";
        width: auto;
        position: relative;
        top: -60px;
        height: 60px;
        display: block;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      .cardItem:nth-child(1):after {
        background: ${({ theme }) => theme.green};
      }

      .cardItem:nth-child(2):after {
        background: ${({ theme }) => theme.orange};
      }

      .cardItem:nth-child(3):after {
        background: ${({ theme }) => theme.violet};
      }

      .cardItem {
        .card {
          background-repeat: no-repeat;
          background-size: cover;
        }
      }

      .cardItem:nth-child(1) {
        .card {
          background-image:url(${homeProjectsBgImg});
          }
      }

      .cardItem:nth-child(2) {
        .card {
          background-image:url(${homeFutureBgImg});
        }
      }

      .cardItem:nth-child(3) {
        .card {
          background-image:url(${homeCompletedBgImg});
        }
      }

      .card-body {
        background-color: ${({ theme }) => theme.white};
        border-radius: 4px;
        padding: 48px 32px !important;
        z-index: 9;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);

        p {
          color: ${({ theme }) => theme.gray444};
        }
        h5 {
          letter-spacing: 0;
          text-transform: capitalize;
          font-weight: normal !important;
          color: ${({ theme }) => theme.gray444};
        }
        h5::first-letter {
          font-weight: 500;
          color: ${({ theme }) => theme.clientSecondaryColor};
        }
      }
    }

    .modal {
      z-index: 99999 !important;
      .modal-header {
        padding: .7rem 1rem !important;
      }
      .modal-header .modal-title {
        color: ${({ theme }) => theme.gray444} !important;
        font-weight: 600 !important;
        font-size: 1.4rem !important;
      }

      .modal-body {
        padding: 1.5rem 2rem !important;
      }
    }

    .quill {
      background: none !important;

      p, p span, .introDecTitleCss {
        background-color: transparent !important;
        font-size: 1rem;
        line-height: 1.6;
      }
      
      .ql-editor {
        padding: 0px;
        color: ${({ theme }) => theme.gray444} !important;
      }
    }

// ADMIN STYLES

.adminMenuTree {
  th {
    background: ${({ theme }) => theme.lightgray};
    font-weight: 500
  }
}

// .requiredField:after {
//   content: " *";
//   color: ${({ theme }) => theme.error};
// }


// UTIL BOOTSTRAP V 5+ CLASSESS
// --------

.lineClamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.lc1 {-webkit-line-clamp: 1; line-clamp: 1;}
.lc2 {-webkit-line-clamp: 2; line-clamp: 2;}
.lc3 {-webkit-line-clamp: 3; line-clamp: 3;}
.lc4 {-webkit-line-clamp: 4; line-clamp: 4;}
.lc5 {-webkit-line-clamp: 5; line-clamp: 5;}
.lc6 {-webkit-line-clamp: 6; line-clamp: 6;}
.lc7 {-webkit-line-clamp: 7; line-clamp: 7;}
.lc8 {-webkit-line-clamp: 8; line-clamp: 8;}
.lc9 {-webkit-line-clamp: 9; line-clamp: 9;}

.cursorPointer {
  cursor: pointer
}

.cursor-pointer { cursor: pointer !important; }
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
.mt100 {
  margin-top: 100px;
}

// COMPONENTS ON / OFF COLORS

.componentOn {
  background-color: #B5E48C
}

.componentOnBorder {
  border:1px solid #B5E48C
}

.componentOff {
  background-color: #A0AEC0;
}

.componentext {
  color: #2F2F2F;
  font-size: .9rem;
}

.videoGallery .imgInfo {
        background: ${({ theme }) => theme.gray444};
        color: ${({ theme }) => theme.white};
        padding: 16px 24px;
        width: 100%;
        text-align: center;
      }
`;

// .homeServices {
//     color:${({ theme }) => theme.secondaryColor};
//     h2 {
//         color:${({ theme }) => theme.secondaryColor};
//         border-color: ${({ theme }) => theme.primaryColor};
//     }

//     h3 {
//         color:${({ theme }) => theme.secondaryColor};
//     }

//     a.btn {
//         background-color:${({ theme }) => theme.primaryColor};
//     }

//     a.btn:hover {
//         background-color:${({ theme }) => theme.secondaryColor};
//     }
// }

// .btn.moreLink {
//     float: left !important;
//     font-size: .8rem;
//     margin-top: 12px;
//     letter-spacing: .1rem;

//     text-decoration: underline;
//     text-underline-offset: 4px;
//     text-decoration-style: dashed;
//     text-decoration-color: rgba(109, 47, 155, .3) !important;
//     transition:
//         color 0.3s ease,
//         text-decoration-color 0.3s ease,
//         margin-top 0.3s ease;

//     &:hover {
//         color: ${({ theme }) => theme.footerLinkHoverColor};
//         text-decoration-color: rgba(109, 47, 155, 1) !important;
//         margin-top: 1.2rem;
//     }
// }
