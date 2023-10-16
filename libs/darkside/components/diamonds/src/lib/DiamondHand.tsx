import { Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { IMAGE_BASE_URL } from '@diamantaire/shared/constants';
import Image from 'next/image';
import { useState } from 'react';

import StyledDiamondHand from './DiamondHand.style';
import DiamondImage from './DiamondImage';

const DiamondHand = ({
  className,
  lotId,
  diamondType,
  withSlider = false,
  isCto = false,
  isThumb = false,
  product,
  // Init value overrides
  initRange,
  initValue,
}: {
  className?: string;
  lotId?: string;
  diamondType?: string;
  withSlider?: boolean;
  product?: { [key: string]: any };
  isCto?: boolean;
  isThumb?: boolean;

  initRange?: number[];
  initValue?: number;
}) => {
  const handImageSource = `${IMAGE_BASE_URL}/diamond-images/hand-transparent.png`;

  let { data: { diamond } = {} } = useDiamondsData({ lotId });

  if (product) diamond = product;

  const { data: { ranges } = {} } = useDiamondsData({ diamondType });

  const [sliderValue, setSliderValue] = useState(Number(initValue || diamond?.carat || 0));

  if ((!ranges && !initRange) || !diamond) return;

  const range = initRange || [ranges?.carat?.[0], ranges?.carat?.[1]];

  const extraClass = className ? ` ${className}` : '';

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

  const handleChange = (value: number[]) => {
    const newValue = value.pop();

    setSliderValue(newValue);
  };

  const handleFormat = (value: number) => {
    return Number(value).toFixed(1) + 'ct';
  };

  return (
    <StyledDiamondHand className={`diamond-hand ${extraClass}`}>
      <div className="media">
        <div className="image-hand">
          <Image className="bg" alt="Hand" src={handImageSource} width={0} height={0} sizes="100vw" />
        </div>

        <div className="image-diamond">
          <div style={{ width: pickDiamondWidth(sliderValue) + '%' }}>
            <DiamondImage diamondType={diamondType} />
          </div>
        </div>
        {!isThumb && (
          <div className="image-caption">
            {isCto ? (
              <p>
                <UIString>Example of how it will look cut and polished</UIString>
              </p>
            ) : (
              <p>
                {sliderValue}ct | <UIString>Shown on ring size 6</UIString>
              </p>
            )}
          </div>
        )}
      </div>

      {withSlider && (
        <div className="slider swiper-no-swiping">
          <Slider
            step={0.01}
            type="slider-hand"
            range={{
              min: range[0],
              max: range[1],
            }}
            value={sliderValue}
            className="slider-hand"
            handleChange={(v) => handleChange(v)}
            handleFormat={(v) => handleFormat(v)}
            tooltips={{ to: (v) => handleFormat(v) }}
          />
        </div>
      )}
    </StyledDiamondHand>
  );
};

export default DiamondHand;

export { DiamondHand };
