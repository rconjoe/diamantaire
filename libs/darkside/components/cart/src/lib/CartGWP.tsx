import { useCartGwp } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { isCurrentTimeWithinInterval } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const CartGWPStyles = styled.div``;

const CartGWP = () => {
  const { locale } = useRouter();

  const { data } = useCartGwp(locale);

  const gwpData = data?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    pdpBannerBody,
    pdpBannerColor,
    giftProduct,
    activeCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  // Confirm data exists
  if (!gwpData) return null;

  const isCountrySupported = activeCountries?.split(',')?.includes(countryCode) || activeCountries === '';

  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const minSpendValue = getFormattedPrice(minSpendByCurrencyCode?.[currencyCode], locale);

  if (!isCountrySupported || !isWithinTimeframe) return null;

  return <CartGWPStyles></CartGWPStyles>;
};

export default CartGWP;
