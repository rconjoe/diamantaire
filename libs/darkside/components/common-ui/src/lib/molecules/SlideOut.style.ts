import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

const defaultWidth = '30%';

const gap = '2rem';

export const SlideOutFreezeBody = createGlobalStyle`
  html {
    overflow: hidden;
    top: ${(props) => `-${props.scrollPosition}px`};
  }
`;

export const SlideOutWrapper = styled(motion.aside)`
  width: ${(props) => props.width || defaultWidth};
  height: 100vh;
  overflow-y: auto;
  z-index: 6000;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;

  .wrapper {
    flex: 1;
    position: relative;
    padding: 2rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .title {
    font-size: var(--font-size-medium);
  }

  .body {
    font-size: var(--font-size-xxsmall);

    h2 {
      font-size: var(--font-size-medium);
      margin-top: ${gap};
    }

    p {
      margin-top: 1.5rem;
    }

    h2 + p {
      margin-top: 0;
    }
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 30px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SlideOutOverlay = styled(motion.div)`
  position: fixed;
  background-color: #000;
  width: 100%;
  z-index: 6000;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.6;
`;
