import { Heading, Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { formatCurrency } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';

const PlpPriceRangeStyles = styled.div``;

const priceRanges = [
  {
    title: 'Below $500',
    min: undefined, //priceRange[0],
    max: 50000,
    slug: 'below-50000',
  },
  {
    title: '$500-$1,500',
    min: 50000,
    max: 150000,
    slug: '50000-150000',
  },
  {
    title: '$1,500-$3000',
    min: 150000,
    max: 300000,
    slug: '150000-300000',
  },
  {
    title: '$3000+',
    min: 300000,
    max: undefined, // priceRange[1],
    slug: '300000-plus',
  },
];

const PlpPriceRange = ({ price, updateFilter, filterValue, handleSliderURLUpdate, filterTypes }) => {
  const [isCustomPriceRangeOpen, setIsCustomPriceRangeOpen] = useState(false);
  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];

  const handleFormat = (value: number | string) => {
    return formatCurrency({
      amount: parseFloat(value.toString()) / 100,
    });
  };

  const handleChange = (value: number[]) => {
    const sliderValue = Array.isArray(value) ? value : [value];

    updateFilter('price', { min: sliderValue[0], max: sliderValue[1] });

    handleSliderURLUpdate(sliderValue[0], sliderValue[1]);
  };

  return (
    <PlpPriceRangeStyles>
      <div className="filter-option-set priceRange stacked">
        <Heading type="h3" className="h1 secondary">
          <UIString>Price</UIString>
        </Heading>
        <ul className="list-unstyled flex ">
          {priceRanges?.map((price) => {
            return (
              <li key={`filter-${price.title}`}>
                <button
                  className="flex align-center"
                  onClick={() => {
                    setIsCustomPriceRangeOpen(false);
                    updateFilter('price', {
                      min: price.min,
                      max: price.max,
                    });
                  }}
                >
                  <span className="price-text">{price.title}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              className={clsx('flex align-center', {
                active: isCustomPriceRangeOpen,
              })}
              onClick={() => setIsCustomPriceRangeOpen(!isCustomPriceRangeOpen)}
            >
              <span className="price-text">Custom</span>
            </button>
          </li>
        </ul>
        {isCustomPriceRangeOpen && (
          <div className="filter-slider">
            <Slider
              step={100}
              type={'price'}
              range={{
                min: price.min,
                max: price.max,
              }}
              value={[filterValue?.price?.min || priceRange[0], filterValue?.price?.max || priceRange[0]]}
              handleChange={handleChange}
              handleFormat={handleFormat}
            />
          </div>
        )}
      </div>
    </PlpPriceRangeStyles>
  );
};

export default PlpPriceRange;
