import { desktopAndUp, tabletAndUp, XXLDesktopAndUp, setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const chevronWidth = '50px';
// const containerWidth = '1480px';
const carouselWidth = '1280px';

export const ContentBlockContainer = styled.div`
  position: relative;
  display: block;
  margin: 50px 0;
  ${tabletAndUp(`
    margin: 80px 0;
  `)}

  .content-block__layout {
    position: relative;
    padding: 0;

    ${tabletAndUp(`
    padding: 0 ${setSpace(3)}
  `)}

    ${XXLDesktopAndUp(`
    padding: 0;
  `)}
  }

  .content-block__title {
    position: relative;
    text-align: center;
    margin: ${setSpace(3)} 0;
    ${tabletAndUp(`
      margin: ${setSpace(3)} 0 ${setSpace(6)} 0;
    `)}
    &.-no-margin {
      margin: 0;
    }
    &.-no-margin-top {
      margin-top: 0;
    }
    .primary {
      font-weight: 400 !important;
      line-height: 3.6rem;
      font-size: 3.2rem;

      ${XXLDesktopAndUp(`
      font-size: 4.2rem;
      line-height: 4.8rem;
    `)}
    }
  }

  .content-block__subtitle {
    font-size: 16px;
    margin-top: 10px;
  }

  .carousel-nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: block;
    padding: 0;
    height: 100%;
    width: 100%;
    margin: auto;

    ${tabletAndUp(`
    max-width: calc(100vw );
  `)}

    ${XXLDesktopAndUp(`
    max-width: calc(${carouselWidth} + 100px);
    `)}

  &.xl-width {
      ${XXLDesktopAndUp(`
      max-width: 95vw;
    `)}
    }
  }

  .carousel-arrow {
    background: #fff;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: calc(${chevronWidth});
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;

    ${tabletAndUp(`
    display: flex;
    height: calc(((100vw - ${setSpace(15)} * 2) / 3) - 40px);
  `)}

    ${XXLDesktopAndUp(`
    height: calc(((${carouselWidth} - ${chevronWidth}) / 4) - 40px);
  `)}

  &.xl-width {
      ${tabletAndUp(`
    display: flex;
    height: calc(((100vw - ${setSpace(15)} * 2) / 3));
  `)}

      ${XXLDesktopAndUp(`
    height: calc(((90vw - ${chevronWidth}) / 4));
  `)}
    }
    &.-celebrity-bottom-carousel {
      ${tabletAndUp(`
    display: flex;
    height:60%;
  `)}

      ${desktopAndUp(`
    height:90%;
  `)}
    }

    &.-diamond-carousel {
      ${tabletAndUp(`
    display: flex;
    height:50%;
  `)}

      ${desktopAndUp(`
    height:80%;
  `)}
    }
    svg {
      width: auto;
      height: 15px;
    }

    &.arrow-left {
      left: 0;
    }

    &.arrow-right {
      right: 0;
    }
  }

  .carousel-container {
    position: relative;
    display: block;
    margin: 0 auto;
    padding: 0;
    height: 100%;
    max-width: 100%;
    overflow: hidden;

    ${tabletAndUp(`
    width: calc(100vw  - 125px);
  `)}

    ${XXLDesktopAndUp(`
    width: calc(${carouselWidth} - ${chevronWidth} * 2);
    `)}

  &.xl-width {
      ${XXLDesktopAndUp(`
     width: 90vw;
    `)}
    }

    &:before {
      content: '';
      width: 100%;
      height: 20px;
      background: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .centered {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .cta {
      margin-top: ${setSpace(3)};

      ${tabletAndUp(`
        margin-top: ${setSpace(6)};
      `)};
    }
  }
`;
