import noUiSlider, { API } from 'nouislider';
import React, { useEffect, useRef } from 'react';

import StyledSlider from './Slider.style';

interface SliderProps {
  handleChange?: (value: number[]) => void;
  handleFormat?: (v: number) => string;
  range: number[];
  type: string;
  step?: number;
  value: number[];
  tooltips?: { to: (v: number) => string };
  className?: string;
  disabled?: boolean;
  edge?: boolean;
  pips?: any;
}

const Slider: React.FC<SliderProps> = (props) => {
  const { edge = true, disabled, pips, className, tooltips, type, range, step, value, handleChange, handleFormat } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderValueStartRef = useRef<HTMLDivElement>(null);
  const sliderValueEndRef = useRef<HTMLDivElement>(null);
  const sliderInstanceRef = useRef<API | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = noUiSlider.create(sliderRef.current, {
        cssPrefix: 'vo-slider-',
        connect: true,
        range: {
          min: range[0],
          max: range[1],
        },
        start: value || range,
        tooltips,
        step,
        pips,
      });

      if (disabled) slider.disable();

      sliderInstanceRef.current = slider;

      slider.on('change', () => {
        if (handleChange) handleChange(getSliderValue());
      });

      slider.on('update', (values: (string | number)[]) => {
        if (edge && updateSliderInfo) updateSliderInfo(values);
      });

      if (edge) updateSliderInfo(range);
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

    return [Number(sliderValue)];
  };

  const updateSliderInfo = (values) => {
    if (values.length > 1) {
      sliderValueStartRef.current.innerHTML = handleFormat(values[0]);

      sliderValueEndRef.current.innerHTML = handleFormat(values[1]);
    }
  };

  return (
    <StyledSlider className={['slider', pips ? 'with-pips' : '', className]}>
      {edge && (
        <div className="vo-slider-values" title={type}>
          <div ref={sliderValueStartRef} className="vo-slider-value-start" />

          <div ref={sliderValueEndRef} className="vo-slider-value-end" />
        </div>
      )}

      <div ref={sliderRef} />
    </StyledSlider>
  );
};

export { Slider };

export default Slider;
