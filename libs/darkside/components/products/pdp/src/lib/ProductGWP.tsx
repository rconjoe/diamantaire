import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { usePDPGwp } from '@diamantaire/darkside/data/hooks';
import { formatPrice, getCurrency } from '@diamantaire/shared/constants';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductGWPStyles = styled.div`
  margin-top: 2rem;

  .inner {
    display: flex;

    .image-container {
      flex: 0 0 6.5rem;
      margin-right: 0.5rem;
      box-shadow: 0px 0.4rem 0.4rem 0px rgba(0, 0, 0, 0.25);
      display: flex;

      /* Dato image img */
      > * {
        display: flex;
        flex: 1;
        > * {
          flex: 1;
        }
      }
    }

    .content-container {
      flex: 1;
      background-color: ${({ bgColor }) => bgColor};
      display: flex;
      align-items: center;
      box-shadow: 0px 0.4rem 0.4rem 0px rgba(0, 0, 0, 0.25);

      p {
        font-size: var(--font-size-xxsmall);
        padding: 1rem 1.5rem;
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
    gwpSupportedCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  // Confirm data exists
  if (!gwpData) return null;

  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const minSpendValue = formatPrice(minSpendByCurrencyCode?.[currencyCode], locale);

  let refinedCopy = replacePlaceholders(pdpBannerBody, ['%%GWP_minimum_spend%%'], [minSpendValue?.toString()]).toString();

  refinedCopy = replacePlaceholders(refinedCopy, ['%%GWP_remaining_spend%%'], [minSpendValue?.toString()]).toString();

  if (!isCountrySupported(gwpSupportedCountries, countryCode) || !isWithinTimeframe) return null;

  return (
    <ProductGWPStyles bgColor={pdpBannerColor?.hex}>
      <div className="inner">
        <div className="image-container">
          <DatoImage image={giftProduct?.plpImage} />
        </div>
        <div className="content-container">
          <p>{refinedCopy}</p>
        </div>
      </div>
    </ProductGWPStyles>
  );
};

export { ProductGWP };
