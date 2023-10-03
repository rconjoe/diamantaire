import { UIString } from '@diamantaire/darkside/components/common-ui';
import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductPriceStyles = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

type ProductPriceProps = {
  price: number;
  shouldDoublePrice?: boolean;
  hasMoreThanOneVariant: boolean;
  isBuilderProduct: boolean;
};

const ProductPrice = ({ shouldDoublePrice = false, price, hasMoreThanOneVariant, isBuilderProduct }: ProductPriceProps) => {
  const router = useRouter();
  const { countryCode } = parseValidLocale(router.locale);
  const currencyCode = getCurrency(countryCode);

  return (
    <ProductPriceStyles className="price">
      {hasMoreThanOneVariant && isBuilderProduct && <UIString>Starting at</UIString>}{' '}
      {makeCurrency(shouldDoublePrice ? price * 2 : price, router.locale, currencyCode)}
    </ProductPriceStyles>
  );
};

export { ProductPrice };
