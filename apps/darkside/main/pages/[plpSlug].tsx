import { ProductType, ListPageItemWithConfigurationVariants, ListPageItemConfiguration } from '@diamantaire/shared-product';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

type PLPPageProps = {
  plpSlug: string;
  productData: {
    variantsInOrder: string[];
    products: ListPageItemWithConfigurationVariants[];
  };
};

const PLPPage = ({ plpSlug, productData }: PLPPageProps) => {
  const { products } = productData;

  const [filterValue, setFilterValues] = useState<{ metal?: string; diamondType?: string }>({});
  const availableDiamondType = ['', 'oval', 'round-brilliant', 'baguette'];
  const metalOptions = ['', 'sterling-silver', 'yellow-gold', 'white-gold', 'rose-gold'];
  const priceRanges = [];

  const onChange = (event: ChangeEvent<HTMLSelectElement>, selectorkey: string) => {
    const value = event?.target.value;
    const url = new URL(window.location.href);
    let newFilters;

    switch (selectorkey) {
      case 'metal': {
        newFilters = { ...filterValue, metal: value };
        break;
      }
      case 'diamondType': {
        newFilters = { ...filterValue, diamondType: value };
        break;
      }
      // case 'priceMax': {
      // }
    }

    Object.entries(newFilters).forEach(([key, v]) => {
      url.searchParams.set(key, v as string);
    });
    window.location.href = url.toString();
    setFilterValues(newFilters);
  };

  return (
    <div>
      <h1>{plpSlug}</h1>
      <div className="filter">
        <select onChange={(evt: ChangeEvent<HTMLSelectElement>) => onChange(evt, 'diamondType')}>
          {availableDiamondType.map((diamondType) => (
            <option key={diamondType} value={diamondType}>
              {diamondType}
            </option>
          ))}
        </select>
        <select onChange={(evt: ChangeEvent<HTMLSelectElement>) => onChange(evt, 'metal')}>
          {metalOptions.map((metal) => (
            <option key={metal} value={metal}>
              {metal}
            </option>
          ))}
        </select>
        <select onChange={(evt: ChangeEvent<HTMLSelectElement>) => onChange(evt, 'priceMax')}>
          {priceRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
        {products.map((product) => (
          <PlpProductItem key={product.defaultId} product={product} />
        ))}
      </div>
    </div>
  );
};

const PlpProductItem = ({ product }: { product: ListPageItemWithConfigurationVariants }) => {
  const { defaultId, variants, metal } = product;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selectedVariant = variants[selectedId];

  return (
    <div>
      <PlpVariant variant={selectedVariant} />
      {metal?.map((option) => (
        <button
          key={option.id}
          onClick={() => {
            setSelectedId(option.id);
          }}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
};

const PlpVariant = ({ variant }: { variant: ListPageItemConfiguration }) => {
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);
  const { productType, collectionSlug, productSlug, title, primaryImage, hoverImage, configuration, price } = variant || {};

  const handleImageChange = () => {
    setIsPrimaryImage(!isPrimaryImage);
  };

  return (
    <ProductLink productType={productType} collectionSlug={collectionSlug} productSlug={productSlug}>
      <div style={{ width: '350px', height: '380px' }}>
        <button
          onMouseEnter={handleImageChange}
          onFocus={handleImageChange}
          onMouseLeave={handleImageChange}
          onBlur={handleImageChange}
        >
          {isPrimaryImage ? (
            <img src={primaryImage.src} alt={primaryImage.alt} />
          ) : (
            <img src={hoverImage.src} alt={hoverImage.alt} />
          )}
        </button>
        <div>
          {title} | {configuration?.metal} | {price}
        </div>
      </div>
    </ProductLink>
  );
};

type ProductLinkProps = {
  productType: string;
  collectionSlug: string;
  productSlug: string;
  children: React.ReactNode;
};
const ProductLink = ({ productType, collectionSlug, productSlug, children }: ProductLinkProps) => {
  const ProductCategory = {
    [ProductType.EngagementRing]: 'engagement-ring',
    [ProductType.WeddingBand]: 'wedding-band',
    [ProductType.Necklace]: 'necklaces',
    [ProductType.Earrings]: 'earrings',
    [ProductType.Bracelet]: 'bracelets',
    [ProductType.Ring]: 'rings',
  } as const;

  const productCategory = ProductCategory[productType as keyof typeof ProductCategory];
  let productUrl = `/engagement-ring/${collectionSlug}/${productSlug}`;

  if (![ProductType.EngagementRing as string, ProductType.WeddingBand as string].includes(productType)) {
    productUrl = `/jewelry/${productCategory}/${collectionSlug}/${productSlug}`;
  }

  return <Link href={productUrl}>{children}</Link>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: PLPPageProps }> => {
  const { params, query } = context;
  const { metal, diamondType, priceMin = 0, priceMax = 99999 } = query;
  const slug = Array.isArray(params.plpSlug) ? params.plpSlug[0] : params.plpSlug;

  const qParams = new URLSearchParams(
    Object.entries({ id: '123', slug, metal, diamondType, priceMin, priceMax }).reduce((prevValue, [key, value]) => {
      if (value) prevValue[key] = Array.isArray(value) ? value[0] : value;

      return prevValue;
    }, {}),
  );
  let response;

  try {
    response = await fetch(`${process.env.VRAI_SERVER_BASE_URL}/v1/product/plp?${qParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VRAI_SERVER_API_KEY,
      },
    });
  } catch (error) {
    console.log({ error });
  }
  const productData = await response.json();

  return {
    props: { plpSlug: slug, productData },
  };
};

export default PLPPage;
