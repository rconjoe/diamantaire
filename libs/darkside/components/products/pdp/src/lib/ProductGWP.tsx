import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { usePDPGwp } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { getCountry, isCurrentTimeWithinInterval, replacePlaceholders } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductGWPStyles = styled.div`
  margin-top: 2rem;

  .inner {
    display: flex;

    .image {
      flex: 0 0 65px;
      margin-right: 5px;
    }

    .content {
      flex: 1;
      background-color: ${({ bgColor }) => bgColor};
      display: flex;
      align-items: center;

      p {
        font-size: var(--font-size-xxxsmall);
        padding: 0 20px;
      }
    }
  }
`;

const ProductGWP = () => {
  const { locale } = useRouter();

  const { data } = usePDPGwp(locale);

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

  const refinedCopy = replacePlaceholders(pdpBannerBody, ['%%GWP_minimum_spend%%'], [minSpendValue?.toString()]).toString();

  console.log('GWP', gwpData);
  console.log('currencyCode', currencyCode);

  if (!isCountrySupported || !isWithinTimeframe) return null;

  return (
    <ProductGWPStyles bgColor={pdpBannerColor?.hex}>
      <div className="inner">
        <div className="image">
          <DatoImage image={giftProduct?.plpImage} />
        </div>
        <div className="content">
          <p>{refinedCopy}</p>
        </div>
      </div>
    </ProductGWPStyles>
  );
};

export { ProductGWP };
