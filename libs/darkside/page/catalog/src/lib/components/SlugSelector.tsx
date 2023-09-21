import clsx from 'clsx';
import { useState } from 'react';
import styled from 'styled-components';

import { sortSlugProductType } from '../utils';

interface ProductTypeSlugsData {
  _id: string;
  productType: string;
  slugs: string[];
}

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
  const [slugs, setSlugs] = useState<ProductTypeSlugsData[]>(collectionSlugs);

  const handleProductTypeSelection = (productType: string) => {
    if (selectedProductType === productType) {
      setSelectedProductType('');

      return;
    }
    setSelectedProductType(productType);
  };

  const handleSearchChange = (evt) => {
    const { value } = evt.target;
    const searchProductType = 'Search Results';

    if (value.length > 0) {
      const filteredSlugs = [
        {
          _id: 'search-results',
          productType: searchProductType,
          slugs: collectionSlugs.flatMap((section) => section.slugs.filter((slug) => slug.includes(value))),
        },
      ];

      setSelectedProductType(searchProductType);

      return setSlugs(filteredSlugs);
    }

    setSelectedProductType('');

    return setSlugs(collectionSlugs);
  };

  return (
    <StyledSlugSelector>
      <div>
        <input type="text" placeholder="Search slugs" onChange={handleSearchChange} />
      </div>
      {slugs &&
        slugs.sort(sortSlugProductType).map((slugItem) => {
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
