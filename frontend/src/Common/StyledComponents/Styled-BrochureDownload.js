import styled from "styled-components";

export const BrochureDownloadStyling = styled.div`
  .homeBrochure {
    .floatingButton {
      position: fixed;
      top: 600px;
      right: 0;
      z-index: 99999;
      transition: top 0.4s ease;

      @media (max-width: 1023px) {
        top: 600px;
      }

      @media (max-width: 480px) {
        top: 400px;
      }

      img {
        width: 68px;
      }

      button:not(.modal button) {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }

      button.btn.btn-primary {
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      }

      button {
        padding: 12px 16px !important;
        i {
          font-size: 24px;
          margin-right: 4px;
        }

        @media (max-width: 768px) {
          padding: 10px !important;

          i {
            margin-right: 0;
          }
          span {
            display: none;
          }
        }
      }

      ul.dropdown-menu {
        max-width: 300px;
        width: 300px;
        border-top-right-radius: 0;
        top: -8px !important;

        li {
          padding: 12px 24px;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border: 0;
          }
        }
      }

      .modal {
        z-index: 99999;
      }
    }

    .floatingButton.scrolled {
      top: 100px; /* On scroll position */

      span {
        display: none;
      }

      button:not(.modal button) {
        margin-top: 10px !important;
        
      }
    }
  }
`;
