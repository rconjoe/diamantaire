import clsx from 'clsx';
import noUiSlider, { API } from 'nouislider';
import { useEffect, useRef } from 'react';

import StyledSlider from './Slider.style';

interface SliderProps {
  handleFormat?: (v: number) => string;
  range: {
    min: number;
    max: number;
    [key: string]: number | undefined;
  };
  type: string;
  step?: number;
  tooltips?: { to: (v: number) => string };
  className?: string;
  disabled?: boolean;
  edge?: boolean;
  pips?: any;
  value: number | number[];
  handleChange?: (value: number[]) => void;
  boldPip?: boolean;
}

const Slider = (props: SliderProps) => {
  const {
    boldPip,
    edge = true,
    disabled,
    pips,
    className,
    tooltips,
    type,
    range,
    step,
    value,
    handleChange,
    handleFormat,
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderValueStartRef = useRef<HTMLDivElement>(null);
  const sliderValueEndRef = useRef<HTMLDivElement>(null);
  const sliderInstanceRef = useRef<API | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = noUiSlider.create(sliderRef.current, {
        cssPrefix: 'vo-slider-',
        connect: true,
        behaviour: 'drag',
        start: value,
        tooltips,
        range,
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
  }, [range]);

  const getSliderValue = (): number[] => {
    const sliderValue = sliderInstanceRef.current?.get();

    if (Array.isArray(sliderValue)) {
      return sliderValue.map((v) => Number(v));
    }

    return [Number(sliderValue)];
  };

  const updateSliderInfo = (values) => {
    // handles
    if (Array.isArray(values)) {
      if (values.length > 1) {
        sliderValueStartRef.current.innerHTML = handleFormat(values[0]);
        sliderValueEndRef.current.innerHTML = handleFormat(values[1]);
      }
    }
    // ranges
    if (typeof values === 'object' && values !== null) {
      if (Object.prototype.hasOwnProperty.call(values, 'min') && Object.prototype.hasOwnProperty.call(values, 'max')) {
        sliderValueStartRef.current.innerHTML = handleFormat(values.min);
        sliderValueEndRef.current.innerHTML = handleFormat(values.max);
      }
    }
  };

  useEffect(() => {
    sliderInstanceRef.current?.set(value);

    const idx = getSliderValue().pop();

    if (boldPip) {
      const target = sliderRef.current.querySelector(`.vo-slider-value[data-value="${idx}"]`) as HTMLElement;

      target.style.fontWeight = 'bold';
    }
  }, [value]);

  return (
    <StyledSlider className={clsx(['slider', pips ? 'with-pips' : '', className])}>
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
