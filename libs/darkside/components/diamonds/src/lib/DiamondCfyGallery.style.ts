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
    max-width: 80px;
    margin-bottom: 20px;

    &.-overflow-visible {
      overflow: visible;
    }

    &.-bg-color {
      background: #d0d8e3;
    }
  }

  .howItWorksWrapper {
    width: 100%;
    max-width: 1500px;
    background: #f3efeb;
    margin: auto;

    .section-title {
      font-size: 18px;
      text-align: center;
      padding: 40px 0 0;

      ${tabletAndUp(`
      padding: 20px 0;
    `)}
    }
  }

  .howItWorksBlocksWrapper {
    display: grid;
    grid-template-columns: 1fr;
    padding: 40px;
    gap: 20px;

    ${tabletAndUp(`
      grid-template-columns: repeat(5, 1fr);
      padding: 0 40px 40px;
    `)}
  }

  .howItWorksCard {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;

    ${tabletAndUp(`
    gap: 0;
  `)}
  }

  .inner {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    gap: 20px;

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
    margin-top: 25px;

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
    width: 80px;
    * {
      width: 80px;
    }
    img {
      width: 100%;
    }
  }

  .howItWorksHeader {
    font-size: 18px;
    line-height: 1.2;
    margin-bottom: 5px;
  }

  .howItWorksCopy {
    font-size: 18px;
  }
`;

export { StyledDiamondCfyGallery };

export default StyledDiamondCfyGallery;
