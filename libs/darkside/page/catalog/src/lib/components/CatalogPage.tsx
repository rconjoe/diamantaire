import { useState } from 'react';
import styled from 'styled-components';

import 'react-json-pretty/themes/monikai.css';
import { OptionsList } from './OptionsList';
import { ProductsList } from './ProductsList';
import { SlugSelector } from './SlugSelector';
import { getCollectionOptions, getCollectionSlugsByProductType, getProducts } from '../api';

interface ProductTypeSlugsData {
  _id: string;
  productType: string;
  slugs: string[];
}

interface ProductConfigurationOption {
  _id: string;
  type: string;
  values: string[];
}

interface CollectionsOptionsData {
  collectionSlug?: string;
  options: ProductConfigurationOption[];
}

interface DataType {
  input: Record<string, unknown>;
  collectionSlugs: ProductTypeSlugsData[];
  collectionOptions: CollectionsOptionsData;
}

interface CatelogPageProps {
  title: string;
  data: DataType;
}

const StyledCatalogPage = styled.div`
  margin: 20px;

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

  input {
    border: 1px solid #888;
    width: 100%;
    height: 40px;
    padding: 10px;
  }

  .columns {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  /* SLUG SELECTOR COLUMN */
  .slugs-selector {
    width: 30%;
    min-width: 300px;
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

  /* SELECTED SLUG COLUMN */
  .collection {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #888;
    border-radius: 10px;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #888;
    border-radius: 10px;
    padding: 5px;
  }

  .option-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .option-values {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
    max-width: 300px;
  }

  .option-value {
    border-radius: 10px;
    padding: 5px;
  }

  /* PRODUCTS SECTION */
  .products-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-item {
    border: 1px solid #888;
    border-radius: 10px;
    padding: 5px;
    text-align: left;

    .price {
      font-size: 1.5rem;
    }

    .json {
      font-size: 1.7em;
    }

    &:hover {
      border-color: teal;
      box-shadow: 2px 2px 2px teal;
    }
  }
`;

const CatalogPage = ({ title, data }: CatelogPageProps) => {
  const { collectionSlugs, collectionOptions } = data;
  const { options } = collectionOptions;
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [availableOptions, setAvailableOptions] = useState<ProductConfigurationOption[]>(options);
  const [products, setProducts] = useState([]);

  const handleSlugSelection = async (slug: string) => {
    setSelectedSlug(slug);
    const newOptions = await getCollectionOptions(slug, {});

    setAvailableOptions(newOptions.options);
    setSelectedOptions({});
    setProducts([]);
    console.log(newOptions.options, newOptions);
  };

  const handleOptionSelection = async (type, value) => {
    let newSelectedOptions;

    if (selectedOptions[type] === value) {
      newSelectedOptions = { ...selectedOptions };

      delete newSelectedOptions[type];
      setSelectedOptions(newSelectedOptions);
    } else {
      newSelectedOptions = { ...selectedOptions, [type]: value };

      setSelectedOptions(newSelectedOptions);
    }

    const newOptions = await getCollectionOptions(selectedSlug, newSelectedOptions);
    const newProducts = await getProducts(selectedSlug, newSelectedOptions);

    setAvailableOptions(newOptions.options);
    setProducts(newProducts);
  };

  return (
    <StyledCatalogPage>
      <h1>{title}</h1>
      <div className="columns">
        <div className="slugs-selector">
          <SlugSelector collectionSlugs={collectionSlugs} onSlugSelected={handleSlugSelection} selectedSlug={selectedSlug} />
        </div>
        <div className="collection">
          <h2>Selected Collection: {selectedSlug}</h2>
          <OptionsList
            selectedOptions={selectedOptions}
            onOptionsChange={handleOptionSelection}
            availableOptions={availableOptions}
          />
          <ProductsList products={products} />
        </div>
      </div>
    </StyledCatalogPage>
  );
};

export const getServerSideProps = async () => {
  const data = await getCollectionSlugsByProductType();

  return {
    props: {
      data,
      title: 'Catalog Page',
    },
  };
};

export { CatalogPage };
