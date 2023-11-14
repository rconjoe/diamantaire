import { DarksideButton, Heading, MobileDesktopImage } from '@diamantaire/darkside/components/common-ui';
import { useCartData, usePlpGWP } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { getCountry, isCurrentTimeWithinInterval, replacePlaceholders } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const PlpCreativeBlockStyles = styled.div`
  grid-column: 1/3;
  border: 1px solid var(--color-light-grey);

  ${media.medium`grid-column: 1/3; grid-area: 2 / 1 / 4 / 3;`}

  &.creative-block--right {
    ${media.medium`grid-area: 5 / 3 / 7 / 5;`}
  }

  .creative-block__image {
    position: relative;

    .creative-block__content {
      ${media.small`position: absolute;right: 20px;bottom: 20px;`}

      .creative-block__content-inner {
        background-color: #fff;
        padding: calc(var(--gutter) / 2);
        max-width: 420px;

        p {
          margin: calc(var(--gutter) / 4) 0;
        }
      }
    }
  }
`;

const PlpCreativeBlock = ({ block }) => {
  const { desktopImage, mobileImage, desktopCopy, title, className, darksideButtons, enableGwp } = block || {};

  const { locale } = useRouter();

  const { data: gwp } = usePlpGWP(locale);
  const { data: checkout } = useCartData(locale);

  const gwpData = gwp?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    activeCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
    creativeBlockQualifiedCopy,
    creativeBlockNonQualifiedCopy,
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

  const gwpText = hasUserQualified ? creativeBlockQualifiedCopy : creativeBlockNonQualifiedCopy;
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
    <PlpCreativeBlockStyles className={className}>
      <div className="creative-block__image">
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />

        <div className="creative-block__content">
          <div className="creative-block__content-inner">
            {enableGwp && areSettingsValid ? (
              <p>{replacedGwpText}</p>
            ) : (
              <>
                <Heading type="h2" className="primary">
                  {title}
                </Heading>
                <p>{desktopCopy}</p>

                {darksideButtons?.map((button) => {
                  return (
                    <DarksideButton
                      colorTheme={button.ctaButtonColorTheme}
                      mobileColorTheme={button.ctaButtonMobileColorTheme}
                      href={button.ctaLinkUrl}
                      key={button.id}
                      type={button.ctaButtonType}
                    >
                      {button.ctaCopy}
                    </DarksideButton>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </PlpCreativeBlockStyles>
  );
};

export default PlpCreativeBlock;
