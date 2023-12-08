import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const sliderCircle = 'https://images.vraiandoro.com/cto-diamonds/assets/slider_circle_upd.png';

const StyledDiamondCfyFilterCarat = styled.div`
  display: block;
  text-align: center;

  .title {
    margin: 2rem 2.4rem 0;
    text-align: left;
    font-size: var(--font-size-xxsmall);

    ${desktopAndUp(`
    text-align: center;
    margin: 2rem 0 0;
    font-size: var(--font-size-xsmall);
    `)};
  }

  .graph {
    display: block;
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    padding: 5rem 2.4rem;
    ${desktopAndUp(`
    padding: 5rem 0.5rem;
    `)}
  }

  .graph-wrapper {
    position: relative;
    flex-direction: column;
    display: flex;
  }

  .graph-tooltip-container {
    position: relative;
    width: 100%;
  }

  .graph-tooltip {
    transform: translateX(-50%);
    position: absolute;
    top: 1.5rem;
    left: 50%;
  }

  .graph-tooltip .txt {
    font-size: var(--font-size-xxxsmall);
  }

  .graph-path {
    width: 100%;
    height: 0.1rem;
    bottom: calc(168% + 2.8rem);
    left: 0.2rem;
    position: absolute;
    transform-origin: top left;
    transform: rotate(${(props) => props.rotation}deg);
  }

  .graph-arrow {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0.7rem 0.4rem;
    border-color: transparent transparent var(--color-teal) transparent;
    position: absolute;

    &.x {
      transform: rotate(90deg);
      bottom: -0.6rem;
      right: -0.5rem;
    }

    &.y {
      top: -1rem;
      left: -0.3rem;
    }
  }

  .graph-dot {
    position: absolute;
    top: 0;
    left: 101%;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;

    svg {
      background-color: var(--color-white);
      min-width: 1rem;
      max-height: 1.3rem;
    }
  }

  .graph-icon {
    z-index: 1;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -0.8rem;
    transform: rotate(-${(props) => props.rotation}deg) scale(${(props) => props.scale});
  }

  .graph-info {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    position: absolute;
    top: -2.5rem;
    left: -0.2rem;
    z-index: 1;

    * {
      font-size: var(--font-size-xxxsmall);
    }

    .graph-price-info {
      min-width: 8.5rem;
      text-align: left;
    }

    .graph-price-info,
    .graph-carat-info {
      display: inline-block;
    }

    .graph-info-tooltip {
      transform: translate(0.2rem, 0.5rem);
      text-align: left;

      .tooltip-trigger * {
        font-size: var(--font-size-xxxxxsmall);
      }
    }
  }

  .graph-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-left: 0.2rem solid var(--color-teal);
    border-bottom: 0.2rem solid var(--color-teal);

    &:after {
      content: '';
      display: block;
      padding-bottom: 60%;
    }

    &:before {
      content: '';
      width: calc(2 * 100%);
      height: calc(2 * 160%);
      bottom: 2.2rem;
      right: 0;
      position: absolute;
      border-radius: 50%;
      border: 0.3rem dashed #8c8c8c;
      opacity: 0.2;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: -0.2rem;
    width: 100%;

    input {
      z-index: 1;
      -webkit-appearance: none;
      appearance: none;
      width: 97%;
      height: 0.2rem;
      background: transparent;
      outline: none;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;

      &::-webkit-slider-thumb {
        position: relative;
        -webkit-appearance: none;
        appearance: none;
        width: 3rem;
        height: 65rem;
        cursor: pointer;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${sliderCircle});
        background-size: 2rem 2rem;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        z-index: 1;
      }

      &::-moz-range-thumb {
        position: relative;
        width: 3rem;
        height: 50rem;
        cursor: pointer;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${sliderCircle});
        background-size: 2rem 2rem;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        z-index: 1;
      }
    }
  }
`;

export { StyledDiamondCfyFilterCarat };

export default StyledDiamondCfyFilterCarat;
