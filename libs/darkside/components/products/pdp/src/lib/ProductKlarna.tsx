import { DEFAULT_LOCALE, parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const ProductKlarnaStyles = styled.div`
  position: relative;
  left: -1rem;
  min-height: 24px;
`;

declare global {
  interface Window {
    Klarna?: {
      OnsiteMessaging?: {
        refresh: () => void;
      };
    };
  }
}

const ProductKlarna = ({ title, currentPrice }) => {
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  const isWithinKlarnaPriceRange = (price) => {
    const minKlarnaPrice = 200 * 100;
    const maxKlarnaPrice = 10000 * 100;

    if (price < minKlarnaPrice || price > maxKlarnaPrice) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    window && window?.Klarna?.OnsiteMessaging?.refresh();
  }, [currentPrice]);

  if (!isWithinKlarnaPriceRange(currentPrice)) {
    return null;
  }

  // Only available in the US
  if (countryCode !== 'US') {
    return null;
  }

  return (
    <ProductKlarnaStyles>
      {/* @ts-expect-error one-time only for this */}
      <klarna-placement
        title={title}
        data-key="credit-promotion-auto-size"
        data-locale={DEFAULT_LOCALE}
        data-purchase-amount={currentPrice}
        id="klarna-placement"
      />
    </ProductKlarnaStyles>
  );
};

export { ProductKlarna };
