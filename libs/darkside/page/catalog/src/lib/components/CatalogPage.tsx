import { useState } from 'react';
import styled from 'styled-components';

import 'react-json-pretty/themes/monikai.css';
import { CollectionTree } from './CollectionTree';
import { OptionsList } from './OptionsList';
import { ProductsList } from './ProductsList';
import { SlugSelector } from './SlugSelector';
import { getCollectionOptions, getCollectionSlugsByProductType, getProducts } from '../api';

interface ProductTypeSlugsData {
  _id: string;
  productType: string;
  slugs: string[];
}

type CollectionsOptionsData = Record<string, string[]>;
interface DataType {
  input: Record<string, string>;
  collectionSlugs: ProductTypeSlugsData[];
  collectionOptions: CollectionsOptionsData;
}

interface CatalogPageProps {
  title: string;
  data: DataType;
}

const StyledCatalogPage = styled.div`
  margin: 2rem;

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
    border: 0.1rem solid #888;
    width: 100%;
    height: 4rem;
    padding: 1rem;
  }

  .columns {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  /* SLUG SELECTOR COLUMN */
  .slugs-selector {
    width: 30%;
    min-width: 30rem;
  }

  .producttype-list {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
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
    padding-left: 2rem;

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
    padding: 1rem;
    border: 0.1rem solid #888;
    border-radius: 1rem;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    max-height: 30rem;
    overflow-y: scroll;
    border: 0.1rem solid #888;
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .option-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .option-values {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.3rem;
    max-width: 30rem;
  }

  .option-value {
    border-radius: 1rem;
    padding: 0.5rem;
  }

  /* PRODUCTS SECTION */
  .products-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-item {
    border: 0.1rem solid #888;
    border-radius: 1rem;
    padding: 0.5rem;
    text-align: left;

    .price {
      font-size: 1.5rem;
    }

    .json {
      font-size: 1.7em;
    }

    &:hover {
      border-color: teal;
      box-shadow: 0.2rem 0.2rem 0.2rem teal;
    }
  }
`;

const CatalogPage = ({ title, data }: CatalogPageProps) => {
  const { collectionSlugs, collectionOptions: options } = data;
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [availableOptions, setAvailableOptions] = useState<CollectionsOptionsData>(options);
  const [isTreeVisible, setIsTreeVisible] = useState<boolean>(false);
  const [products, setProducts] = useState([]);

  const handleSlugSelection = async (slug: string) => {
    setSelectedSlug(slug);
    const newOptions = await getCollectionOptions(slug, {});

    setAvailableOptions(newOptions);
    setSelectedOptions({});
    setProducts([]);
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

    setAvailableOptions(newOptions);
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
          <div>
            <button onClick={() => setIsTreeVisible(!isTreeVisible)}>
              {isTreeVisible ? 'View Product List' : 'View Collection Tree'}
            </button>
          </div>
          {isTreeVisible ? <CollectionTree collectionSlug={selectedSlug} /> : <ProductsList products={products} />}
        </div>
      </div>
    </StyledCatalogPage>
  );
};

export const getServerSideProps = async () => {
  const data = await getCollectionSlugsByProductType();

  // Catalog internal tool should not be available on production
  if (process.env.NODE_ENV === 'production'){
    return {
      notFound: true
    }
  }

  return {
    props: {
      data,
      title: 'Catalog Page',
    },
  };
};

export { CatalogPage };
