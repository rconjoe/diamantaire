import { shopifyNumberToHumanPrice } from '@diamantaire/shared/helpers';
import noUiSlider, { API } from 'nouislider';
import React, { useEffect, useRef } from 'react';

import StyledSlider from './Slider.style';

interface SliderProps {
  countryCode: string;
  currencyCode: string;
  locale: string;
  type: string;
  range: number[];
  step: number;
  value: number[];
  handleChange: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = (props) => {
  const { countryCode, currencyCode, locale, type, range, step, value, handleChange } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderValueStartRef = useRef<HTMLDivElement>(null);
  const sliderValueEndRef = useRef<HTMLDivElement>(null);
  const sliderInstanceRef = useRef<API | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = noUiSlider.create(sliderRef.current, {
        start: value || range,
        range: {
          min: range[0],
          max: range[1],
        },
        step: step,
        connect: true,
        cssPrefix: 'vo-slider-',
      });

      sliderInstanceRef.current = slider;

      slider.on('change', () => {
        const sliderValue = getSliderValue();

        handleChange(sliderValue);
      });

      slider.on('update', (values) => {
        if (type === 'carat') {
          sliderValueStartRef.current.innerHTML = values[0].toString() + 'ct';

          sliderValueEndRef.current.innerHTML = values[1].toString() + 'ct';
        }

        if (type === 'price') {
          sliderValueStartRef.current.innerHTML = shopifyNumberToHumanPrice(
            values[0],
            locale,
            currencyCode,
            countryCode,
            {},
            false,
            false,
            '',
          );

          sliderValueEndRef.current.innerHTML = shopifyNumberToHumanPrice(
            values[1],
            locale,
            currencyCode,
            countryCode,
            {},
            false,
            false,
            '',
          );
        }
      });
    }

    return () => {
      if (sliderInstanceRef.current) {
        sliderInstanceRef.current.destroy();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSliderValue = (): number[] => {
    const sliderValue = sliderInstanceRef.current?.get();

    if (Array.isArray(sliderValue)) {
      return sliderValue.map((v) => Number(v));
    }

    return [];
  };

  return (
    <StyledSlider>
      <div className="vo-slider-values" title={type}>
        <div ref={sliderValueStartRef} className="vo-slider-value-start" />

        <div ref={sliderValueEndRef} className="vo-slider-value-end" />
      </div>

      <div ref={sliderRef} />
    </StyledSlider>
  );
};

export { Slider };

export default Slider;
