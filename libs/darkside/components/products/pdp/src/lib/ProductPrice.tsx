import { UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondLowestPriceDataProps, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DEFAULT_LOCALE,
  ENGRAVEABLE_JEWELRY_SLUGS,
  ENGRAVING_PRICE_CENTS,
  getFormattedPrice,
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
};

const ProductPrice = ({
  shouldDoublePrice = false,
  price,
  isBuilderProduct,
  productType,
  engravingText,
  lowestPricedDiamond,
}: ProductPriceProps) => {
  const { locale, query } = useRouter();
  // const { countryCode } = parseValidLocale(locale);

  console.log('init price', price);

  const { _t } = useTranslations(locale);

  const isInUS = locale === DEFAULT_LOCALE;

  const doesProductQualifyForFreeEngraving =
    ENGRAVEABLE_JEWELRY_SLUGS.filter((slug) => slug === query.collectionSlug).length > 0;

  // lowestPricedDiamond if FJ and caratWeight is `other`
  const basePrice = lowestPricedDiamond ? lowestPricedDiamond.price + price : price;
  const shouldAddEngravingCost = engravingText && productType !== 'Ring' && !doesProductQualifyForFreeEngraving;

  // console.log('basePrice', basePrice);
  // console.log('shouldDoublePrice', basePrice + 1);

  const finalPrice = calculateFinalPrice(basePrice, productType, shouldDoublePrice, shouldAddEngravingCost);

  console.log('finalPrice', finalPrice);

  const refinedPrice = getFormattedPrice(finalPrice, locale, true, false, false);

  const translatedText = _t('Starting at %%price%%');

  return (
    <ProductPriceStyles className="price">
      <p className="price-text">
        {isBuilderProduct ? <>{replacePlaceholders(translatedText, ['%%price%%'], [refinedPrice])}</> : refinedPrice}
      </p>

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
  console.log('productType', productType);
  console.log('shouldDoublePrice', shouldDoublePrice);

  if (productType === 'Earrings' && shouldDoublePrice) {
    return basePrice * 2;
  }

  if (shouldAddEngravingCost) {
    return basePrice + ENGRAVING_PRICE_CENTS;
  }

  return basePrice;
};
