import { UIString } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE, ENGRAVING_PRICE_CENTS, getFormattedPrice } from '@diamantaire/shared/constants';
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
};

const ProductPrice = ({
  shouldDoublePrice = false,
  price,
  isBuilderProduct,
  productType,
  engravingText,
}: ProductPriceProps) => {
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const isInUS = locale === DEFAULT_LOCALE;

  const refinedPrice = getFormattedPrice(
    productType === 'Earrings' && !shouldDoublePrice
      ? price / 2
      : price + (engravingText && productType !== 'Ring' ? ENGRAVING_PRICE_CENTS : 0),
    locale,
  );

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
