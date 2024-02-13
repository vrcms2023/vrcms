import styled from "styled-components";

export const TopStripStyled = styled.div`
  background-color: ${({ theme }) => theme.topStripBgColor};
  color: ${({ theme }) => theme.topStripTextColor};

  a {
    color: ${({ theme }) => theme.topStripLinkColor};
  }

  a:hover {
    color: ${({ theme }) => theme.topStripLinkHoverColor};
  }

  h3 {
    font-size: 0.9rem;
    margin: 0px;
  }
  .topStrip {
    padding: 5px 10px;
  }
`;
