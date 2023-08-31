import { TEAL, WHITE } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const sliderCircle = 'https://images.vraiandoro.com/cto-diamonds/assets/slider_circle_upd.png';

const StyledDiamondCfyFilterCarat = styled.div`
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  display: block;
  margin: 0 auto;

  .carat-filter {
    display: block;
    padding: 40px 5px 35px;
  }

  .graph-wrapper {
    position: relative;
    flex-direction: column;
    display: flex;
  }

  .price {
    width: 100px;
  }

  .graph-tooltip-container {
    position: relative;
    width: 100%;
  }

  .graph-tooltip {
    transform: translateX(-50%);
    position: absolute;
    top: 15px;
    left: 50%;
  }

  .graph-tooltip .txt {
    font-size: var(--font-size-xxxsmall);
  }

  .graph-path {
    width: 100%;
    height: 1px;
    bottom: calc(168% + 28px);
    left: 2px;
    position: absolute;
    transform-origin: top left;
    transform: rotate(${(props) => props.rotation}deg);
  }

  .graph-arrow {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 7px 4px;
    border-color: transparent transparent ${TEAL} transparent;
    position: absolute;

    &.x {
      transform: rotate(90deg);
      bottom: -6px;
      right: -5px;
    }

    &.y {
      top: -10px;
      left: -3px;
    }
  }

  .graph-dot {
    position: absolute;
    top: 0;
    left: 101%;
    width: 2px;
    height: 2px;
    border-radius: 50%;

    svg {
      background-color: ${WHITE};
      min-width: 10px;
      max-height: 13px;
    }
  }

  .graph-icon {
    z-index: 1;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -8px;
    transform: rotate(-${(props) => props.rotation}deg) scale(${(props) => props.scale});
  }

  .graph-info {
    display: flex;
    flex-direction: row;
    gap: 4px;
    position: absolute;
    top: -25px;
    left: -2px;

    * {
      font-size: var(--font-size-xxxsmall);
    }

    .graph-price-info,
    .graph-carat-info {
      display: inline-block;
    }
  }

  .graph-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-left: 2px solid ${TEAL};
    border-bottom: 2px solid ${TEAL};

    &:after {
      content: '';
      display: block;
      padding-bottom: 60%;
    }

    &:before {
      content: '';
      width: calc(2 * 100%);
      height: calc(2 * 160%);
      bottom: 22px;
      right: 0;
      position: absolute;
      border-radius: 50%;
      border: 3px dashed #8c8c8c;
      opacity: 0.2;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;

    input {
      z-index: 1;
      -webkit-appearance: none;
      appearance: none;
      width: 97%;
      height: 2px;
      background: transparent;
      outline: none;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;

      &::-webkit-slider-thumb {
        position: relative;
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 650px;
        cursor: pointer;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${sliderCircle});
        background-size: 20px 20px;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        z-index: 1;
      }

      &::-moz-range-thumb {
        position: relative;
        width: 30px;
        height: 500px;
        cursor: pointer;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(${sliderCircle});
        background-size: 20px 20px;
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
