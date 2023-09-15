import { UIString } from '@diamantaire/darkside/core';
import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductPriceStyles = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

const ProductPrice = ({ price, hasMoreThanOneVariant, isBuilderProduct }) => {
  const router = useRouter();
  const { countryCode } = parseValidLocale(router.locale);
  const currencyCode = getCurrency(countryCode);

  return (
    <ProductPriceStyles className="price">
      {hasMoreThanOneVariant && isBuilderProduct && <UIString>Starting at</UIString>}{' '}
      {makeCurrency(price, router.locale, currencyCode)}
    </ProductPriceStyles>
  );
};

export { ProductPrice };
