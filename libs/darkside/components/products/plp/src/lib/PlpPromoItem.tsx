import { MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { useCartData, usePlpGWP } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { getCountry, getRelativeUrl, isCurrentTimeWithinInterval, replacePlaceholders } from '@diamantaire/shared/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const PlpPromoItemStyles = styled.div`
  .promo__image {
    position: relative;
    .promo__content {
      position: absolute;
      bottom: 0;
      left: 0;

      p {
        padding-left: calc(var(--gutter) / 3);
        padding-bottom: calc(var(--gutter) / 3);
        color: var(--color-white);

        .arrow-right {
          width: 0;
          height: 0;
          border-top: 7px solid transparent !important;
          border-bottom: 7px solid transparent !important;
          border-left: 7px solid var(--color-white);
          display: inline-block;
          position: relative;
          top: 2px;
          margin-left: 5px;
        }
      }
    }
  }
`;

const PlpPromoItem = ({ block }) => {
  const { image, imageMobile, title, link, textColor, enableGwp } = block || {};
  const { locale } = useRouter();

  const { data: gwp } = usePlpGWP(locale);
  const { data: checkout } = useCartData(locale);

  const gwpData = gwp?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    activeCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
    promoCardQualifiedCopy,
    promoCardNonQualifiedCopy,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  const isWithinTimeframe =
    promotionDateRangeEnd &&
    promotionDateRangeStart &&
    isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const isCountrySupported = activeCountries?.split(',')?.includes(countryCode) || activeCountries === '';
  const minSpendValue = minSpendByCurrencyCode?.[currencyCode].toString();

  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  const gwpText = hasUserQualified ? promoCardQualifiedCopy : promoCardNonQualifiedCopy;

  const areSettingsValid = isWithinTimeframe && isCountrySupported && minSpendValue;

  let replacedGwpText = replacePlaceholders(
    gwpText,
    ['%%GWP_minimum_spend%%'],
    [getFormattedPrice(parseFloat(minSpendValue), locale)],
  ).toString();

  replacedGwpText = replacePlaceholders(
    replacedGwpText,
    ['%%GWP_remaining_spend%%'],
    [getFormattedPrice(parseFloat(minSpendValue) - parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale)],
  ).toString();

  return (
    <PlpPromoItemStyles>
      <Link href={link && getRelativeUrl(link)}>
        <div className="promo__image">
          <MobileDesktopImage alt={title} desktopImage={image} mobileImage={imageMobile} quality={100} />
          <div className="promo__content">
            <p
              style={{
                color: textColor?.hex,
              }}
            >
              {enableGwp && areSettingsValid ? replacedGwpText : title}
              <span
                className="arrow-right"
                style={{
                  borderColor: textColor?.hex,
                }}
              ></span>
            </p>
          </div>
        </div>
      </Link>
    </PlpPromoItemStyles>
  );
};

export default PlpPromoItem;
