import { generateProductUrl } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import styled from 'styled-components';
import 'react-json-pretty/themes/monikai.css';

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
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [availableOptions, setAvailableOptions] = useState<ProductConfigurationOption[]>(options);
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState<string>('');

  const handleProductTypeSelection = (productType: string) => {
    if (selectedProductType === productType) {
      setSelectedProductType('');

      return;
    }
    setSelectedProductType(productType);
  };

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

  const handleExpandProduct = (productId: string) => {
    if (expandedProductId === productId) {
      setExpandedProductId('');

      return;
    }
    setExpandedProductId(productId);
  };

  return (
    <StyledCatalogPage>
      <h1>{title}</h1>
      <div className="columns">
        <div className="slugs-selector">
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
                        onClick={() => handleSlugSelection(slug)}
                      >
                        <h3>{slug}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="collection">
          <h2>Selected Collection: {selectedSlug}</h2>
          <div className="options-selector">
            <h3>Options:</h3>
            <div className="options-list">
              {availableOptions.sort(sortOptionTypes).map((option) => {
                return (
                  <div className="option-item" key={option._id}>
                    <h3>{option.type}</h3>
                    <div className="option-values">
                      {option.values.sort().map((value) => {
                        const isOptionSelected = selectedOptions[option.type] === value;

                        return (
                          <button
                            className={clsx('option-value', { selected: isOptionSelected })}
                            key={value}
                            onClick={() => handleOptionSelection(option.type, value)}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="products-container">
            <h3>Products: {products.length}</h3>
            <div className="products-list">
              {products.map((product) => {
                const { productType, collectionSlug, productSlug } = product;
                const productUrl = generateProductUrl(productType, collectionSlug, productSlug);
                const isExpanded = expandedProductId === product._id;

                return (
                  <div className="product-item" key={product._id}>
                    <h2>
                      {product.collectionTitle} | {product.productTitle}
                    </h2>
                    <p>
                      <strong className="price">Price:</strong>${product.price / 100}
                    </p>
                    <p className="product-options">
                      <strong>Configuration: </strong>
                      {Object.entries(product.configuration)
                        .sort(sortOptionKV)
                        .map(([, v]) => {
                          return v;
                        })
                        .join(' | ')}
                    </p>
                    <p className="styles">
                      <strong>Styles: </strong>
                      {product?.styles?.join(' | ') || 'N/A'}
                    </p>
                    <p className="sku">
                      <strong>Sku: </strong>
                      {product?.sku}
                    </p>
                    <p>
                      <strong>Links:</strong>
                      <a href={productUrl} target="_blank">
                        Dev Product Link
                      </a>
                    </p>
                    <button onClick={() => handleExpandProduct(product._id)}>Show JSON</button>
                    <div className={clsx('json', { hidden: !isExpanded })}>
                      <JSONPretty data={product} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </StyledCatalogPage>
  );
};

const sortSlugProductType = (slugA, slugB) => {
  return slugA.productType > slugB.productType ? 1 : -1;
};

const sortOptionTypes = (typeA, typeB) => {
  return typeA.type > typeB.type ? 1 : -1;
};

const sortOptionKV = (a, b) => {
  return a[0] > b[0] ? 1 : -1;
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

const API_BASE_URL = 'http://localhost:4200';

const getCollectionSlugsByProductType = async () => {
  const response = await fetch(`${API_BASE_URL}/api/collections/slugs`);

  return response.json();
};

const getCollectionOptions = async (selectedSlug, selectedOptions) => {
  const qParams = new URLSearchParams({ slug: selectedSlug, ...selectedOptions });
  const reqUrl = `${API_BASE_URL}/api/collections/options?${qParams.toString()}`;

  const response = await fetch(reqUrl);

  return await response.json();
};

const getProducts = async (selectedSlug, selectedOptions) => {
  const qParams = new URLSearchParams({ slug: selectedSlug, ...selectedOptions });
  const reqUrl = `${API_BASE_URL}/api/collections?${qParams.toString()}`;

  const response = await fetch(reqUrl);

  return await response.json();
};

export default CatalogPage;
