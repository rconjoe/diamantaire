import { Heading, Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { PLP_PRICE_RANGES, getFormattedPrice } from '@diamantaire/shared/constants';
import clsx from 'clsx';
import React, { useState } from 'react';
import styled from 'styled-components';

const PlpPriceRangeStyles = styled.div`
  ul.list {
    padding-left: 0 !important;
    list-style-type: none;
  }

  ul.list li {
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    max-width: 170px;
  }

  ul.list li.selected {
    border: 1px solid var(--color-teal);
  }
`;

const PlpPriceRange = ({ price, updateFilter, filterValue, handleSliderURLUpdate, filterTypes, locale }) => {
  const [isCustomPriceRangeOpen, setIsCustomPriceRangeOpen] = useState(false);

  const priceRange: number[] = filterTypes?.price?.map((val) => parseFloat(val)) || [0, 1000000];

  const handleFormat = (value: number | string) => {
    const num = Number(value);

    return getFormattedPrice(num, locale);
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

        <ul className="list">
          {PLP_PRICE_RANGES?.map((v) => {
            const isSelected = filterValue.price?.min === v.min && filterValue.price?.max === v.max;

            const min = (v?.min && v?.min / 100) || 'below';

            const max = (v?.max && v?.max / 100) || 'plus';

            const selectedPriceSlug = `${min}-${max}`;

            const priceArray = [
              ...(v.min ? [getFormattedPrice(v.min, locale).trim()] : []),
              ...(v.max ? [getFormattedPrice(v.max, locale).trim()] : []),
            ];

            return (
              <li key={`filter-${price.title}`} className={isSelected ? 'selected' : ''}>
                <button
                  className="flex align-center"
                  onClick={() => {
                    setIsCustomPriceRangeOpen(false);

                    updateFilter('price', {
                      min: v.min,
                      max: v.max,
                    });
                  }}
                >
                  <span className="price-text">
                    <UIString replacements={priceArray}>{selectedPriceSlug}</UIString>
                  </span>
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
