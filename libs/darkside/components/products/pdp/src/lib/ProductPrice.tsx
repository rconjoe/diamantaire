import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondLowestPriceDataProps, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DEFAULT_LOCALE,
  ENGRAVEABLE_JEWELRY_SLUGS,
  ENGRAVING_PRICE_CENTS,
  getFormattedPrice,
  combinePricesOfMultipleProducts,
  simpleFormatPrice,
} from '@diamantaire/shared/constants';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductPriceStyles = styled.div`
  margin-bottom: calc(var(--gutter) / 4);
  .price-text {
    font-size: 1.7rem;
    font-weight: 500;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      font-size: 2rem;
    }
  }

  .small {
    font-size: 1.2rem;
  }
`;

type ProductPriceProps = {
  price: number;
  shouldDoublePrice?: boolean;
  isBuilderProduct: boolean;
  engravingText: string;
  productType?: string;
  lowestPricedDiamond?: DiamondLowestPriceDataProps;
  quantity: number;
  pricesArray?: number[];
};

const ProductPrice = ({
  shouldDoublePrice = false,
  price,
  isBuilderProduct,
  productType,
  engravingText,
  lowestPricedDiamond,
  quantity,
  // We use this when we have multiple products that need to be priced together
  pricesArray,
}: ProductPriceProps) => {
  const { locale, query } = useRouter();

  const { _t } = useTranslations(locale);

  const isInUS = locale === DEFAULT_LOCALE;

  const doesProductQualifyForFreeEngraving =
    ENGRAVEABLE_JEWELRY_SLUGS.filter((slug) => slug === query.collectionSlug).length > 0;

  // lowestPricedDiamond if FJ and caratWeight is `other`
  const basePrice = lowestPricedDiamond ? lowestPricedDiamond.price + price : price;
  const shouldAddEngravingCost = engravingText && productType !== 'Ring' && !doesProductQualifyForFreeEngraving;

  const finalPrice = calculateFinalPrice(basePrice / quantity, productType, shouldDoublePrice, shouldAddEngravingCost);

  const refinedPrice = getFormattedPrice(basePrice, locale, true, false, false, quantity);

  const translatedText = _t('Starting at %%price%%');

  // This is only for custom products (multiple products bundled together)
  const tempFinalPrice =
    pricesArray &&
    combinePricesOfMultipleProducts([...pricesArray, shouldAddEngravingCost && ENGRAVING_PRICE_CENTS], locale);

  return (
    <ProductPriceStyles className="price">
      {pricesArray ? (
        <p className="price-text">{simpleFormatPrice(tempFinalPrice, locale)}</p>
      ) : (
        <p className="price-text">
          {isBuilderProduct ? <>{replacePlaceholders(translatedText, ['%%price%%'], [refinedPrice])}</> : refinedPrice}
        </p>
      )}

      {!isInUS && (
        <p className="small">
          <UIString>incl. VAT</UIString>
        </p>
      )}
    </ProductPriceStyles>
  );
};

export { ProductPrice };

export const calculateFinalPrice = (basePrice, productType, shouldDoublePrice, shouldAddEngravingCost) => {
  console.log('basePrice', basePrice);
  if (productType === 'Earrings' && shouldDoublePrice) {
    return basePrice * 2;
  }

  if (shouldAddEngravingCost) {
    return basePrice + ENGRAVING_PRICE_CENTS;
  }

  return basePrice;
};
