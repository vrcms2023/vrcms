import styled from "styled-components";

export const ProjectsPageStyled = styled.div`
   
    .projectsList {
         padding: 48px 0;

        h5 {
            text-transform: capitalize;
        }

        .infoStrip {
            h5 {
                font-size: 1rem !important;
            }
        }

        h5:first-letter {
            color: ${({ theme }) => theme.clientSecondaryColor};
            
        }

        .box {
            border-radius: 5px;
            overflow: hidden;
        }

        .infoStrip {
            position: absolute;
            z-index: 999;
            background-color: rgba(0, 152, 218, 0.75);
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 7px 0;
            transition: padding 300ms ease;

            &:hover {
                // background-color: rgba(41, 90, 147, 0.95);
                background-color: rgba(239, 64, 54, .65);
                padding: 15px 0;

                a {
                    color: #a8c849;
                    letter-spacing: 0.15rem;
                }
            }

            a {
                text-decoration: none;
                font-weight: 500;
                transition: letter-spacing 300ms ease;
            }

            h5, h5:first-letter {
                color: ${({ theme }) => theme.white} !important;
                color: #EF4036
            }
        }

        .infoStrip + img {
            width: 100%;
            height: 148px;
            object-fit: cover;
        }

        
    }
    .projectTabs {
        select#projectStatus {
            border: 1px solid ${({ theme }) => theme.grayeee} !important;
            border-radius: 4px !important;
            max-width: 190px;galleryThumbs
        }

        .breadCrumb {
            text-transform: capitalize;

            span {
                color: ${({ theme }) => theme.primaryColor}
            }
        }

        .nav-link {
            border: 0px !important;
            border-radius: 0px !important;
            margin-right: 2px;

            &:hover {
                color: ${({ theme }) => theme.primaryColor} !important;
            }
        }

        .nav-link.active {
            background-color: ${({ theme }) => theme.primaryColor} !important;
            color: #fff !important;
        }

        .tab-content {
            padding: 48px 0;

            h5.title {
                color: ${({ theme }) => theme.gray444};
                font-size: 1.5rem !important;
            }
            h5.subTitle {
                color: ${({ theme }) => theme.gray666};
                font-size: .8rem !important;
            }
        }

        .pdfDownloadsAsSelectBox {
            position: relative;
            float: right;
            border: 1px solid ${({ theme }) => theme.grayddd};
            padding: 10px 16px;
            cursor: pointer;
            border-radius: 4px;
            font-size: .9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover .documents {
                display: block;
            }

            .documents {
                display: none;
                position: absolute;
                background: ${({ theme }) => theme.white};
                border: 1px solid ${({ theme }) => theme.verylightgray};
                box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
                padding: 16px 24px;
                width: 500px;
                right: 0;
                max-height: 320px;
                overflow: auto;

                span {
                    border-bottom: 1px solid ${({ theme }) => theme.verylightgray};
                    padding: 6px;
                    margin-bottom: 8px;
                    font-size: .8rem;
                    font-weight: 400;

                    &:hover {
                        background-color: ${({ theme }) => theme.verylightgray};
                    }

                    span {
                        border: 0;
                    }
                }
            }
        }

        .projectHomeImage {
            img {
                max-width: 500px;
            }
        }
    }


    .nav-tabs {
        border-top: 1px solid ${({ theme }) => theme.verylightgray};
        border-bottom: 0px !important;
    }

    .zoomImg {
        /* display: inline-block; */
        /* overflow: scroll; */
        border: 1px solid rgb(237, 237, 237);
        // padding: 15px 0;

         img {
            -webkit-transition: all 0.2s ease;
            -moz-transition: all 0.2s ease;
            -ms-transition: all 0.2s ease;
            -o-transition: all 0.2s ease;
            transition: all 0.2s ease;

            /* vertical-align: middle; */

            &:hover {
                -webkit-transform: scale(2.5);
                -moz-transform: scale(2.5);
                -o-transform: scale(2.5);
                -ms-transform: scale(2.5);
                transform: scale(2.5);
                /* transform: scale3d(1.1, 1.1, 1); */
            } 
        }
    }

    .galleryThumbs {
        h4 {
            font-size: 12px;
            color: ${({ theme }) => theme.gray444};

            span {
                color: ${({ theme }) => theme.clientSecondaryColor}
            }
        }

        img {
            margin: 10px 10px 10px 0 !important;
            height: 120px !important;
            width: 140px !important;
        }
    }

    .planThumbs {
        > div {
            width: 140px;
            height: 140px;
            border-radius: 4px;

            img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 4px;
            }
        }
    }

`;
