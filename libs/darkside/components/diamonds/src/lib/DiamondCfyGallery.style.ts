import { XLDesktopAndUp, desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyGallery = styled.div`
  display: flex;
  width: 100%;
  background: #ccc;
  margin: 3rem 0 0;

  ${desktopAndUp(`
    margin: 4rem 0 2rem;
  `)}

  .circularImage {
    border-radius: 100%;
    display: flex;
    height: auto;
    justify-content: center;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 8rem;
    margin-bottom: 2rem;

    &.-overflow-visible {
      overflow: visible;
    }

    &.-bg-color {
      background: #d0d8e3;
    }
  }

  .howItWorksWrapper {
    width: 100%;
    max-width: 150rem;
    background: #f3efeb;
    margin: auto;

    .section-title {
      font-size: 1.8rem;
      text-align: center;
      padding: 4rem 0 0;

      ${tabletAndUp(`
      padding: 2rem 0;
    `)}
    }
  }

  .howItWorksBlocksWrapper {
    display: grid;
    grid-template-columns: 1fr;
    padding: 4rem;
    gap: 2rem;

    ${tabletAndUp(`
      grid-template-columns: repeat(5, 1fr);
      padding: 0 4rem 4rem;
    `)}
  }

  .howItWorksCard {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    ${tabletAndUp(`
    gap: 0;
  `)}
  }

  .inner {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 2rem;

    ${tabletAndUp(`
      align-items: center;
      flex-direction: column;
      gap: 0;
    `)}
  }

  .arrow {
    display: none;

    ${tabletAndUp(`
      display: flex;
      margin-top: 15%;
    `)}

    ${XLDesktopAndUp(`
      margin-top: 10%;
    `)}
  }

  .mobile-arrow {
    margin-top: 2.5rem;

    ${tabletAndUp(`
      display: none;
    `)}

    svg {
      transform: rotate(90deg);
    }
  }

  .diamondTypeIcon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
      max-height: 50%;
    }
  }

  .diamondImage {
    width: 8rem;
    * {
      width: 8rem;
    }
    img {
      width: 100%;
    }
  }

  .howItWorksHeader {
    font-size: 1.8rem;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  .howItWorksCopy {
    font-size: 1.8rem;
  }
`;

export { StyledDiamondCfyGallery };

export default StyledDiamondCfyGallery;
