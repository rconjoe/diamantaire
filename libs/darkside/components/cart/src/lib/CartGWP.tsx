import { DarksideButton, DatoImage } from '@diamantaire/darkside/components/common-ui';
import { useCartData, useCartGwp } from '@diamantaire/darkside/data/hooks';
import { formatPrice, getCurrency } from '@diamantaire/shared/constants';
<<<<<<< HEAD
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
=======
import { getCountry, isCurrentTimeWithinInterval, replacePlaceholders } from '@diamantaire/shared/helpers';
>>>>>>> adb9d013 (eod fix)
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const CartGWPStyles = styled.div`
  margin: 0;
  padding: 0 2.5rem 5rem;
  ${media.medium`margin: 0 3rem 0 5rem;`}
  .inner {
    display: flex;

    .image {
<<<<<<< HEAD
      flex: 0 0 14rem;
=======
      flex: 0 0 140px;
>>>>>>> adb9d013 (eod fix)
      display: flex;

      > * {
        flex: 1;
        display: flex;

        > * {
          flex: 1;
        }
      }
    }

    .content {
      display: flex;
      align-items: center;
      background-color: ${({ bgColor }) => bgColor};
      .content__inner {
        padding: 2rem;

        p {
          font-size: var(--font-size-xxsmall);

          &.title {
            font-size: var(--font-size-small);
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          &.non-qualified-copy {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }
`;

const CartGWP = () => {
  const { locale } = useRouter();

  const { data } = useCartGwp(locale);

  const { data: checkout } = useCartData(locale);

  const gwpData = data?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    cartQualifiedTitle,
    cartQualifiedBody,
    cartQualifiedBackgroundColor,
    cartNonQualifiedTitle,
    cartNonQualifiedBody,
    cartNonQualifiedBackgroundColor,
    giftProduct,
    gwpSupportedCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
    cartNonQualifiedCta,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  console.log('cartNonQualifiedCta', gwpData);

  if (!gwpData) return null;

  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const minSpendValue = minSpendByCurrencyCode?.[currencyCode].toString();

  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  if (!isCountrySupported(gwpSupportedCountries, countryCode) || !isWithinTimeframe) return null;

  return (
    <CartGWPStyles bgColor={hasUserQualified ? cartQualifiedBackgroundColor?.hex : cartNonQualifiedBackgroundColor?.hex}>
      <div className="inner">
        <div className="image">
          <DatoImage image={giftProduct?.plpImage} />
        </div>
        <div className="content">
          <div className="content__inner">
            {hasUserQualified ? (
              <>
                {cartQualifiedTitle && <p className="title">{cartQualifiedTitle}</p>}
                <p>{cartQualifiedBody}</p>
              </>
            ) : (
              <>
                {cartNonQualifiedTitle !== '' && <p className="title">{cartNonQualifiedTitle}</p>}
                <p className="non-qualified-copy">
                  {replacePlaceholders(
                    cartNonQualifiedBody,
                    ['%%GWP_remaining_spend%%'],
                    [
                      formatPrice(
                        parseFloat(minSpendValue) - parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100,
                        locale,
                      ).trim(),
                    ],
                  ).toString()}
                </p>
                {cartNonQualifiedCta?.map((button) => {
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
    </CartGWPStyles>
  );
};

export default CartGWP;
