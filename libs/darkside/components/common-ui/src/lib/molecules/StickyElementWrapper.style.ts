import styled from 'styled-components';

export const StyledStickyElementWrapper = styled.div`
  position: relative;

  .sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    padding: 0.5rem;
    background: #fff;
    display: none;
  }

  .sticky.show {
    display: block;
  }
`;
