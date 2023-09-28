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
    padding: 2.4rem 2.4rem;
    background: #fff;
    display: none;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.25);
  }

  .sticky.show {
    display: block;
  }
`;
