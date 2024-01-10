import { Heading, Tooltip, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import {
  DIAMOND_CFY_CARAT_DEFAULT,
  DIAMOND_CFY_CARAT_RANGE_MAP,
  getFormattedCarat,
  getFormattedPrice,
} from '@diamantaire/shared/constants';
import { getCountry, isCountrySupported } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { useCallback, useContext, useEffect, useState } from 'react';

import StyledDiamondCfyFilterCarat from './DiamondCfyFilterCarat.style';

const SLIDER_MIN_VALUE = 0;
const SLIDER_MULTIPLIER = 5;
const SLIDER_MAX_VALUE = 100 * SLIDER_MULTIPLIER;
const SLIDER_RANGE = SLIDER_MAX_VALUE - SLIDER_MIN_VALUE;

const DiamondCfyFilterCarat = (props) => {
  const { isMobile } = useContext(GlobalContext);

  const { title, selectedDiamondType, selectedCarat, handleSelectCarat, locale, caratSliderTooltip } = props;

  const countryCode = getCountry(locale);

  const [caratMin, caratMax] = getCaratRangeByDiamondType(selectedDiamondType.slug);

  const initialSliderRangeValue = getSliderValueFromCaratRange(selectedCarat, caratMin, caratMax);

  const [sliderRangeValue, setSliderRangeValue] = useState(initialSliderRangeValue);

  const [price, setPrice] = useState(getPriceFromCaratWeight(selectedCarat));

  const [carat, setCarat] = useState(`${selectedCarat.toFixed(1)}ct`);

  const updateParentState = useCallback(() => {
    const caratValue = getSelectedCaratRange(sliderRangeValue, caratMin, caratMax);
    const roundedCaratValue = roundToNearestTenth(caratValue);

    if (sliderRangeValue !== roundedCaratValue) {
      handleSelectCarat(roundedCaratValue);

      const updateCaratAndPrice = () => {
        setCarat(`${roundedCaratValue.toFixed(1)}ct`);
        setPrice(getPriceFromCaratWeight(roundedCaratValue));
      };

      requestAnimationFrame(updateCaratAndPrice);
    }
  }, [sliderRangeValue, caratMin, caratMax, handleSelectCarat]);

  const handleSliderChange = useCallback(
    (event) => {
      const value = parseFloat(event.target.value);
      const caratValue = getSelectedCaratRange(value, caratMin, caratMax);
      const roundedCaratValue = roundToNearestTenth(caratValue);

      const updateState = () => {
        setSliderRangeValue(value);
        setCarat(`${roundedCaratValue.toFixed(1)}ct`);
        setPrice(getPriceFromCaratWeight(roundedCaratValue));
      };

      requestAnimationFrame(updateState);
    },
    [caratMin, caratMax],
  );

  useEffect(() => {
    setPrice(getPriceFromCaratWeight(selectedCarat));

    setCarat(`${selectedCarat.toFixed(1)}ct`);
  }, [selectedCarat]);

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(updateParentState, delay);

    return () => clearTimeout(timeoutId);
  }, [updateParentState]);

  const shape = diamondIconsMap[selectedDiamondType.slug];

  return (
    <StyledDiamondCfyFilterCarat
      scale={getSliderDiamondScale(sliderRangeValue)}
      rotation={getSliderDiamondPosition(sliderRangeValue)}
    >
      <Heading type="h2" className="title">
        {title}
      </Heading>

      <div className="graph">
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
              <span className="label">
                <UIString>Price</UIString>:{' '}
              </span>
              <span className="value">{getFormattedPrice(price, locale, true)}</span>
            </div>

            <div className="graph-carat-info">
              <span className="txt">
                <span className="label">
                  <UIString>for</UIString>{' '}
                </span>

                <span className="value">{getFormattedCarat(parseFloat(carat), locale, 1)}ct</span>
              </span>
            </div>

            <div className="graph-info-tooltip">
              {caratSliderTooltip?.map(({ copy, supportedCountries, id }) => {
                if (!isCountrySupported(supportedCountries, countryCode)) {
                  return null;
                }

                return (
                  <Tooltip key={id} id={`tooltip-${id}`} place={isMobile ? 'bottom' : 'bottom-end'}>
                    {copy}
                  </Tooltip>
                );
              })}
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

function getPriceFromCaratWeight(carat) {
  const calculatedPrice = 1400 * Math.pow(carat, 1.3);

  const truncatedPrice = Math.round(calculatedPrice * 100) / 100;

  const price = Math.round(truncatedPrice) * 100;

  return price;
}

function getSliderDiamondScale(value) {
  return (0.02 * (value / SLIDER_MULTIPLIER / 1.5) + 1) * 2.5;
}

function getSliderDiamondPosition(value) {
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
}

function getSelectedCaratRange(value, caratMin, caratMax) {
  const sliderMidValue = SLIDER_RANGE / 2;

  if (value < sliderMidValue) {
    return ((value - SLIDER_MIN_VALUE) / sliderMidValue) * (DIAMOND_CFY_CARAT_DEFAULT - caratMin) + caratMin;
  }

  if (value > sliderMidValue) {
    return ((value - sliderMidValue) / sliderMidValue) * (caratMax - DIAMOND_CFY_CARAT_DEFAULT) + DIAMOND_CFY_CARAT_DEFAULT;
  } else {
    return DIAMOND_CFY_CARAT_DEFAULT;
  }
}

function roundToNearestTenth(value) {
  return Math.round(value * 10) / 10;
}
