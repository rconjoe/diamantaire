import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const defaultWidth = '30%';

const gap = '2rem';

const StyledSlideOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 70%);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 9999;

  .wrapper {
    width: ${(props) => props.width || defaultWidth};
    background-color: #fff;
    position: relative;
    flex: 1;
    padding: 2rem;
    

    ${desktopAndUp(`
      max-width: 1080px;
    `)}
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

  .overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
`;

export default StyledSlideOut;
