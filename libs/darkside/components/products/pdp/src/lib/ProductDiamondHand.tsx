<<<<<<< HEAD
import { UIString } from '@diamantaire/darkside/components/common-ui';
=======
>>>>>>> adb9d013 (eod fix)
import { DiamondImage } from '@diamantaire/darkside/components/diamonds';
import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';
import Image from 'next/image';
import { useState } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

const handImageSource = `${IMAGE_BASE_URL}/diamond-images/hand-transparent.png`;
const offset = '2rem';

const ProductDiamondHandStyles = styled.div`
  min-height: 200px;
  background-color: #fff;

  .hand-image-container {
    margin-bottom: ${offset};
    position: relative;

    .image-hand {
      display: block;
      aspect-ratio: 1/1;
      position: relative;
<<<<<<< HEAD
      max-height: 520px;

      margin: 0 auto;

      .shown-on-text {
        font-size: var(--font-size-xxxsmall);
        margin: 20px 0 0;
      }
=======
      max-height: 582px;
      margin: 0 auto;
>>>>>>> adb9d013 (eod fix)
    }

    .image-diamond {
      position: absolute;
<<<<<<< HEAD
      top: 53%;
      left: 20.5%;
=======
      top: 58%;
      left: 22.5%;
>>>>>>> adb9d013 (eod fix)
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%;
      height: 25%;
<<<<<<< HEAD

      @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
        left: 23%;
      }

      @media (min-width: ${({ theme }) => theme.sizes.xxxl}) {
        left: 21%;
      }
=======
>>>>>>> adb9d013 (eod fix)
    }
  }

  .slider-outer-container {
    padding: 20px 0;
    max-width: 70%;
    margin: 0 auto;
    .slider-grid {
      display: flex;

      .min,
      .max {
        span {
          font-size: var(--font-size-xxxsmall);
          color: var(--color-teal);
          font-weight: 500;
        }
      }

      .slider {
        flex: 1;
        padding: 0 10px;

        .horizontal-slider {
          top: 1px;
        }
      }
      .track {
        height: 3px;
        background-color: var(--color-teal);
        top: 8px;
        border-radius: 20px;
      }

      .thumb {
        height: 20px;
        width: 20px;
        background-color: var(--color-teal);
        border-radius: 50%;
        cursor: pointer;
<<<<<<< HEAD
        button {
=======
        span {
>>>>>>> adb9d013 (eod fix)
          position: absolute;
          top: -${offset};
          font-size: var(--font-size-xxxsmall);
          color: var(--color-teal);
          font-weight: 500;
          display: inline-block;
          top: -20px;
          display: inline-block;
          left: -25px;
          width: 100%;
          text-align: center;
          min-width: 70px;
<<<<<<< HEAD
          background-color: transparent;
=======
>>>>>>> adb9d013 (eod fix)
        }
      }
    }

    .slider-count {
      text-align: center;
      p {
        font-size: var(--font-size-xxxsmall);
        margin: 0;
        color: var(--color-teal);
      }
    }
  }
`;

const ProductDiamondHand = ({ range, diamondType, initValue }) => {
  const [sliderValue, setSliderValue] = useState(Number(initValue));

  const pickDiamondWidth = (carat) => {
    const powerFn = powerFnPicker();
    const widthInMillimeter = powerFn(carat);
    const handWidthPx = 333;
    const fingerWidthInPx = handWidthPx * 0.15;
    const ringSize45InMillimeter = 15.3;
    const diamondPercentRelativeToHandWidth =
      widthInMillimeter * (fingerWidthInPx / ringSize45InMillimeter) * (1 / handWidthPx);

    const diamondWidthInPercent = handWidthPx * diamondPercentRelativeToHandWidth;

    return diamondWidthInPercent;
  };

  const powerFnPicker = () => {
    switch (diamondType) {
      case 'round-brilliant':
        return (carat) => {
          return 6.43 * Math.pow(carat, 0.333);
        };
      case 'oval':
        return (carat) => {
          return 6.43 * Math.pow(carat, 0.332);
        };
      case 'emerald':
        return (carat) => {
          return 4.98 * Math.pow(carat, 0.334);
        };
      case 'marquise':
        return (carat) => {
          return 5.38 * Math.pow(carat, 0.334);
        };
      case 'cushion':
        return (carat) => {
          return 5.76 * Math.pow(carat, 0.33);
        };
      case 'pear':
        return (carat) => {
          return 5.74 * Math.pow(carat, 0.336);
        };
      case 'trillion':
        return (carat) => {
          return 7.12 * Math.pow(carat, 0.339);
        };
      case 'princess':
        return (carat) => {
          return 5.53 * Math.pow(carat, 0.329);
        };
      case 'asscher':
        return (carat) => {
          return 5.78 * Math.pow(carat, 0.336);
        };
      case 'radiant':
        return (carat) => {
          return 5.78 * Math.pow(carat, 0.336);
        };
      case 'rand':
        return (carat) => {
          return 4.87 * Math.pow(carat, 0.334);
        };
      case 'felix':
        return (carat) => {
          return 4.95 * Math.pow(carat, 0.334);
        };
      case 'fusion':
        return (carat) => {
          return 4.87 * Math.pow(carat, 0.334);
        };
      case 'brilliant-emerald':
        return (carat) => {
          return 4.98 * Math.pow(carat, 0.334);
        };
      case 'capri':
        return (carat) => {
          return 5.54 * Math.pow(carat, 0.334);
        };
      case 'elongated-cushion':
        return (carat) => {
          return 5.78 * Math.pow(carat, 0.336);
        };
      case 'long-hexagon':
        return (carat) => {
          return 5.7 * Math.pow(carat, 0.336);
        };
      case 'lucky':
        return (carat) => {
          return 5.75 * Math.pow(carat, 0.336);
        };
      case 'cushion-princess':
        return (carat) => {
          return 5.53 * Math.pow(carat, 0.329);
        };
      case 'oval-rose':
        return (carat) => {
          return 6.68 * Math.pow(carat, 0.332);
        };
      case 'hexagon':
        return (carat) => {
          return 6.05 * Math.pow(carat, 0.333);
        };
      case 'octavia':
        return (carat) => {
          return 6.12 * Math.pow(carat, 0.333);
        };
      case 'passion':
        return (carat) => {
          return 6.12 * Math.pow(carat, 0.333);
        };
      case 'harmonia':
        return (carat) => {
          return 6.27 * Math.pow(carat, 0.333);
        };
      case 'kite':
        return (carat) => {
          return 6.27 * Math.pow(carat, 0.333);
        };
      case 'regulus':
        return (carat) => {
          return 6.35 * Math.pow(carat, 0.333);
        };
      case 'shield':
        return (carat) => {
          return 6.64 * Math.pow(carat, 0.339);
        };
      case 'round-rose':
        return (carat) => {
          return 6.66 * Math.pow(carat, 0.333);
        };
      case 'lozenge':
        return (carat) => {
          return 7.2 * Math.pow(carat, 0.339);
        };
      default:
        return (carat) => {
          return 5.78 * Math.pow(carat, 0.336);
        };
    }
  };

  return (
    <ProductDiamondHandStyles>
      <div className="hand-image-container">
        <div className="image-hand">
          <Image className="bg" alt="Hand" src={handImageSource} width={0} height={0} sizes="100vw" />
<<<<<<< HEAD
          <p className="shown-on-text text-center">
            <UIString>Shown on ring size 6</UIString>
          </p>
=======
>>>>>>> adb9d013 (eod fix)
        </div>

        <div className="image-diamond">
          <div style={{ width: pickDiamondWidth(sliderValue) + '%' }}>
            <DiamondImage diamondType={diamondType} />
          </div>
        </div>
      </div>
      <div className="slider-outer-container">
        <div className="slider swiper-no-swiping">
          <div className="slider-container">
            <div className="slider-grid">
              <div className="min">
                <span>{range[0]}ct</span>
              </div>
              <div className="slider">
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  min={range[0]}
                  max={range[1]}
                  value={sliderValue}
                  step={0.1}
                  onChange={(v) => setSliderValue(v)}
                  renderThumb={(props, state) => (
                    <div {...props}>
<<<<<<< HEAD
                      <button>{state.valueNow} carat</button>
=======
                      <span>{state.valueNow} carat</span>
>>>>>>> adb9d013 (eod fix)
                    </div>
                  )}
                />
              </div>
              <div className="max">
                <span>{range[1]}ct</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductDiamondHandStyles>
  );
};

export { ProductDiamondHand };
