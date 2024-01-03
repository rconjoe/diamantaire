import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondImage } from '@diamantaire/darkside/components/diamonds';
import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';
import { formatNumber } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

const handImageSource = `${IMAGE_BASE_URL}/diamond-images/hand-transparent.png`;
const offset = '2rem';

const ProductDiamondHandStyles = styled.div`
  min-height: 20rem;
  background-color: #fff;
  display: block;

  .hand-image-container {
    margin-bottom: ${offset};
    position: relative;
    margin-bottom: 1rem;

    @media (min-width: ${({ theme }) => theme.sizes.small}) {
      margin-bottom: ${offset};
    }

    .image-hand {
      display: block;
      aspect-ratio: 1/1;
      position: relative;
      margin: 0 auto;

      .shown-on-text {
        font-size: var(--font-size-xxxsmall);
        margin: 2rem 0 0;
      }
    }

    .image-diamond {
      position: absolute;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%;
      height: 25%;
      top: 50%; /* Adjust based on design */
      left: 50%; /* Centered by default */
      transform: translate(-118%, 20%);
    }
  }

  .slider-outer-container {
    padding: 2rem 0;
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
        padding: 0 1rem;

        .horizontal-slider {
          top: 0.1rem;
        }
      }
      .track {
        height: 0.3rem;
        background-color: var(--color-teal);
        top: 0.8rem;
        border-radius: 2rem;
      }

      .thumb {
        height: 2rem;
        width: 2rem;
        background-color: var(--color-teal);
        border-radius: 50%;
        cursor: pointer;
        button {
          position: absolute;
          top: -${offset};
          font-size: var(--font-size-xxxsmall);
          color: var(--color-teal);
          font-weight: 500;
          display: inline-block;
          top: -2rem;
          display: inline-block;
          left: -2.5rem;
          width: 100%;
          text-align: center;
          min-width: 7rem;
          background-color: transparent;
          white-space: nowrap;
          text-transform: lowercase;
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

type ProductDiamondHandProps = {
  range: number[];
  diamondType: string;
  initValue: number;
  disableControls?: boolean;
  prefix?: string;
};

const ProductDiamondHand = ({ range, diamondType, initValue, disableControls = false, prefix }: ProductDiamondHandProps) => {
  const [sliderValue, setSliderValue] = useState(Number(initValue));
  const { locale } = useRouter();
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
          <p className="shown-on-text text-center">
            {prefix && disableControls ? (
              <>
                <UIString>{prefix}</UIString>
                {' | '}
              </>
            ) : null}
            <UIString>Shown on ring size 6</UIString>
          </p>
        </div>

        <div className="image-diamond">
          <div style={{ width: pickDiamondWidth(sliderValue) + '%' }}>
            <DiamondImage diamondType={diamondType} />
          </div>
        </div>
      </div>
      {!disableControls && (
        <div className="slider-outer-container">
          <div className="slider no-swiping">
            <div className="slider-container">
              <div className="slider-grid">
                <div className="min">
                  <span>
                    {range?.[0]
                      ? formatNumber(Number(range?.[0]), locale, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                      : null}
                    ct
                  </span>
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
                        <button>
                          {state.valueNow} <UIString>carat</UIString>
                        </button>
                      </div>
                    )}
                  />
                </div>
                <div className="max">
                  <span>
                    {range?.[1]
                      ? formatNumber(Number(range?.[1]), locale, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                      : null}
                    ct
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProductDiamondHandStyles>
  );
};

export { ProductDiamondHand };
