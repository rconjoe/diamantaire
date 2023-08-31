import { UIString } from '@diamantaire/darkside/core';
import { DIAMOND_CFY_CARAT_DEFAULT, DIAMOND_CFY_CARAT_RANGE_MAP } from '@diamantaire/shared/constants';
import { formatCurrency } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { useEffect, useState } from 'react';

import StyledDiamondCfyFilterCarat from './DiamondCfyFilterCarat.style';

const SLIDER_MIN_VALUE = 0;
const SLIDER_MULTIPLIER = 5;
const SLIDER_MAX_VALUE = 100 * SLIDER_MULTIPLIER;
const SLIDER_RANGE = SLIDER_MAX_VALUE - SLIDER_MIN_VALUE;

const DiamondCfyFilterCarat = (props) => {
  const { selectedDiamondType, selectedCarat = DIAMOND_CFY_CARAT_DEFAULT, handleSelectCarat, locale } = props;

  const [caratMin, caratMax] = getCaratRangeByDiamondType(selectedDiamondType.slug);

  const [sliderRangeValue, setSliderRangeValue] = useState(getSliderValueFromCaratRange(selectedCarat, caratMin, caratMax));

  useEffect(() => {
    if (selectedCarat > caratMax || selectedCarat < caratMin) {
      handleSelectCarat(DIAMOND_CFY_CARAT_DEFAULT);
      setSliderRangeValue(getSliderValueFromCaratRange(DIAMOND_CFY_CARAT_DEFAULT, caratMin, caratMax));
    }
  }, [caratMax, caratMin, handleSelectCarat, selectedCarat]);

  const getSelectedCaratRange = (value) => {
    const sliderMidValue = SLIDER_RANGE / 2;

    if (value < sliderMidValue) {
      return ((value - SLIDER_MIN_VALUE) / sliderMidValue) * (DIAMOND_CFY_CARAT_DEFAULT - caratMin) + caratMin;
    }

    if (value > sliderMidValue) {
      return (
        ((value - sliderMidValue) / sliderMidValue) * (caratMax - DIAMOND_CFY_CARAT_DEFAULT) + DIAMOND_CFY_CARAT_DEFAULT
      );
    } else {
      return DIAMOND_CFY_CARAT_DEFAULT;
    }
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);

    const caratValue = getSelectedCaratRange(value);

    setSliderRangeValue(value);

    handleSelectCarat(truncateCaratValue(caratValue));
  };

  const getSliderDiamondPosition = (value) => {
    let m = 0.525;

    if (value > 30 * SLIDER_MULTIPLIER) {
      m = 0.53;
    }

    if (value > 40 * SLIDER_MULTIPLIER) {
      m = 0.53;
    }

    if (value > 50 * SLIDER_MULTIPLIER) {
      m = 0.535;
    }

    if (value > 60 * SLIDER_MULTIPLIER) {
      m = 0.545;
    }

    if (value > 70 * SLIDER_MULTIPLIER) {
      m = 0.55;
    }

    if (value > 75 * SLIDER_MULTIPLIER) {
      m = 0.56;
    }

    if (value > 80 * SLIDER_MULTIPLIER) {
      m = 0.57;
    }

    if (value > 85 * SLIDER_MULTIPLIER) {
      m = 0.575;
    }

    if (value > 88 * SLIDER_MULTIPLIER) {
      m = 0.585;
    }

    if (value > 90 * SLIDER_MULTIPLIER) {
      m = 0.59;
    }

    if (value > 93 * SLIDER_MULTIPLIER) {
      m = 0.595;
    }

    if (value > 94 * SLIDER_MULTIPLIER) {
      m = 0.6;
    }

    if (value > 96 * SLIDER_MULTIPLIER) {
      m = 0.61;
    }

    if (value > 97 * SLIDER_MULTIPLIER) {
      m = 0.62;
    }

    if (value > 98 * SLIDER_MULTIPLIER) {
      m = 0.63;
    }

    if (value > 99 * SLIDER_MULTIPLIER) {
      m = 0.635;
    }

    return -m * (value / SLIDER_MULTIPLIER) + 87.25;
  };

  const caratPrice = getPriceFromCaratWeight(selectedCarat);

  const shape = diamondIconsMap[selectedDiamondType.slug];

  return (
    <StyledDiamondCfyFilterCarat
      scale={getSliderDiamondScale(sliderRangeValue)}
      rotation={getSliderDiamondPosition(sliderRangeValue)}
    >
      <div className="carat-filter">
        <div className="graph-wrapper">
          <div className="graph-arrow x" />

          <div className="graph-arrow y" />

          <div className="graph-container" />

          <div className="input-container">
            <input
              type="range"
              min={SLIDER_MIN_VALUE}
              max={SLIDER_MAX_VALUE}
              value={sliderRangeValue}
              onChange={handleSliderChange}
            />
            <div className="graph-tooltip-container">
              <div className="graph-tooltip">
                <span className="txt">
                  <UIString>Carat Weight</UIString>
                </span>
              </div>
            </div>
          </div>

          <div className="graph-info">
            <div className="graph-price-info">
              <span className="label">Price: </span>

              <span className="price">{formatCurrency({ locale, amount: caratPrice })}</span>
            </div>

            <div className="graph-ct">
              <span className="txt">
                <UIString>for</UIString> {selectedCarat}ct
              </span>

              {/* <div className={styles.toolTip}>
                {caratSliderTooltip?.map(({ copy, supportedCountries, id }) => (
                  <DiamondChartTooltip
                    key={id}
                    copy={copy}
                    countryCode={countryCode}
                    supportedCountries={supportedCountries}
                    placement={isMobile ? 'bottom' : 'right'}
                  />
                ))}
              </div> */}
            </div>
          </div>

          <div className="graph-path">
            <div className="graph-dot">
              <div className="graph-icon">
                <shape.icon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledDiamondCfyFilterCarat>
  );
};

export default DiamondCfyFilterCarat;

export { DiamondCfyFilterCarat };

function getCaratRangeByDiamondType(diamondType) {
  const range = DIAMOND_CFY_CARAT_RANGE_MAP[diamondType];

  if (range) {
    return range;
  } else {
    // Unexpected shape
    return [1, 10];
  }
}

function getSliderValueFromCaratRange(selectedCarat, minCarat, maxCarat) {
  const sliderMidValue = SLIDER_RANGE / 2;
  let value;

  if (selectedCarat <= DIAMOND_CFY_CARAT_DEFAULT) {
    value = ((selectedCarat - minCarat) / (DIAMOND_CFY_CARAT_DEFAULT - minCarat)) * sliderMidValue + SLIDER_MIN_VALUE;
  } else if (selectedCarat > DIAMOND_CFY_CARAT_DEFAULT) {
    value =
      ((selectedCarat - DIAMOND_CFY_CARAT_DEFAULT) / (maxCarat - DIAMOND_CFY_CARAT_DEFAULT)) * sliderMidValue +
      sliderMidValue;
  }

  return value;
}

function truncateCaratValue(caratValue, numOfdigits = 1) {
  const multiplier = Math.pow(10, numOfdigits);

  return Math.round(caratValue * multiplier) / multiplier;
}

function getPriceFromCaratWeight(carat, isShopifyPriceFormat = true, isPriceRounded = true) {
  const calculatedPrice = 1400 * Math.pow(carat, 1.3);
  const truncatedPrice = Math.round(calculatedPrice * 100) / 100;
  let price;

  if (isShopifyPriceFormat) {
    if (isPriceRounded) {
      price = Math.round(truncatedPrice) * 100;
    } else {
      price = truncatedPrice * 100;
    }
  } else {
    if (isPriceRounded) {
      price = Math.round(truncatedPrice);
    } else {
      price = truncatedPrice;
    }
  }

  return price;
}

function getSliderDiamondScale(value) {
  return (0.02 * (value / SLIDER_MULTIPLIER / 1.5) + 1) * 2.5;
}
