import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { useCartData, useCartGwp } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { getCountry, isCurrentTimeWithinInterval, replacePlaceholders } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const CartGWPStyles = styled.div`
  margin: 0;
  padding: 0 25px 50px;
  ${media.medium`margin: 0 30px 0 50px;`}
  .inner {
    display: flex;

    .image {
      flex: 0 0 100px;
    }

    .content {
      display: flex;
      align-items: center;
      background-color: ${({ bgColor }) => bgColor};
      .content__inner {
        padding: 0 20px;

        p {
          font-size: var(--font-size-xxxsmall);

          &.title {
            font-size: var(--font-size-xsmall);
            font-weight: bold;
            margin-bottom: 1rem;
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
    activeCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  if (!gwpData) return null;

  const isCountrySupported = activeCountries?.split(',')?.includes(countryCode) || activeCountries === '';

  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const minSpendValue = minSpendByCurrencyCode?.[currencyCode].toString();

  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  if (!isCountrySupported || !isWithinTimeframe) return null;

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
                <p>
                  {replacePlaceholders(
                    cartNonQualifiedBody,
                    ['%%GWP_remaining_spend%%'],
                    [
                      getFormattedPrice(
                        parseFloat(minSpendValue) - parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100,
                        locale,
                      ),
                    ],
                  ).toString()}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </CartGWPStyles>
  );
};

export default CartGWP;
