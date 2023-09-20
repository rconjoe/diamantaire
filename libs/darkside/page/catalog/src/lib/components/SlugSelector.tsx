import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

import { sortSlugProductType } from '../utils';

const StyledSlugSelector = styled.div`
  .selected {
    background-color: purple;
    color: white;
  }

  .hidden {
    height: 0;
    visibility: hidden;
  }

  button {
    &:hover {
      color: purple;
    }
    &.selected {
      background-color: purple;
      color: white;
    }
  }

  .producttype-list {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }

  .slugs-container {
    &.hidden {
      height: 0;
      visibility: hidden;
    }
    display: flex;
    flex-direction: column;
    height: auto;
    visibility: visible;
  }

  .slug-item {
    text-align: left;
    padding-left: 20px;

    &.selected {
      background-color: teal;
      color: white;
    }
  }
`;

const SlugSelector = ({ collectionSlugs, onSlugSelected, selectedSlug }) => {
  const [selectedProductType, setSelectedProductType] = useState<string>('');

  const handleProductTypeSelection = (productType: string) => {
    if (selectedProductType === productType) {
      setSelectedProductType('');

      return;
    }
    setSelectedProductType(productType);
  };

  return (
    <StyledSlugSelector>
      {collectionSlugs &&
        collectionSlugs.sort(sortSlugProductType).map((slugItem) => {
          const isProductTypeSelected = selectedProductType === slugItem.productType;

          return (
            <div className="producttype-list" key={slugItem._id}>
              <button onClick={() => handleProductTypeSelection(slugItem._id)}>
                <h2 className={clsx({ selected: isProductTypeSelected })}>{slugItem.productType}</h2>
              </button>
              <div className={clsx('slugs-container', { hidden: !isProductTypeSelected })}>
                {slugItem.slugs.sort().map((slug) => (
                  <button
                    className={clsx('slug-item', { selected: selectedSlug === slug })}
                    key={slug}
                    onClick={() => onSlugSelected(slug)}
                  >
                    <h3>{slug}</h3>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
    </StyledSlugSelector>
  );
};

export { SlugSelector };
