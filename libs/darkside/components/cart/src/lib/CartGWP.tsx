import { DarksideButton, DatoImage } from '@diamantaire/darkside/components/common-ui';
import { addItemToCart, updateMultipleItemsQuantity } from '@diamantaire/darkside/data/api';
import { useCartData, useCartGwp } from '@diamantaire/darkside/data/hooks';
import { getCurrency, simpleFormatPrice } from '@diamantaire/shared/constants';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const CartGWPStyles = styled.div`
  padding: 0 0 2rem;
  .inner {
    display: flex;

    .image {
      flex: 0 0 12rem;
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

        .button-style--underline {
          a {
            button {
              font-size: var(--font-size-xxsmall);
            }
          }
        }
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

  const { data: checkout, refetch } = useCartData(locale);

  const gwpData = data?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    // cartQualifiedTitle,
    // cartNonQualifiedTitle,
    cartQualifiedBody,
    cartQualifiedBackgroundColor,
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

  const minSpendValue = minSpendByCurrencyCode?.[currencyCode].toString();
  const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  useEffect(() => {
    async function checkForGWP() {
      if (!checkout || !gwpData || !isWithinTimeframe) return null;
      // This is also the item (if it exists 👻)
      const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);
      const doesUserHaveGWPInCart =
        checkout?.lines?.find((line) => line?.merchandise?.id === `gid://shopify/ProductVariant/${giftProduct.variantId}`) ||
        false;

      if (hasUserQualified && !doesUserHaveGWPInCart) {
        const attributes = {
          _hiddenProduct: 'true',
        };
        const refinedAttributes = Object.keys(attributes)
          .map((key) => {
            return {
              key,
              value: attributes[key],
            };
          })
          .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

        const variantId = createShopifyVariantId(giftProduct.variantId);

        await addItemToCart({ variantId, customAttributes: refinedAttributes, locale }).then(() => refetch());
      } else if (!hasUserQualified && doesUserHaveGWPInCart) {
        await updateMultipleItemsQuantity({
          items: [
            {
              lineId: doesUserHaveGWPInCart.id,
              variantId: doesUserHaveGWPInCart.merchandise.id,
              quantity: 0,
              attributes: doesUserHaveGWPInCart.attributes,
            },
          ],
        }).then(() => refetch());
      }
    }

    checkForGWP();
  }, [gwpData, checkout]);

  if (!checkout || !gwpData) return null;
  if (!isCountrySupported(gwpSupportedCountries, countryCode) || !isWithinTimeframe) return null;

  if (!gwpData) return null;

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
                {/* {cartQualifiedTitle && <p className="title">{cartQualifiedTitle}</p>} */}
                <p>{cartQualifiedBody}</p>
              </>
            ) : (
              <>
                {/* {cartNonQualifiedTitle !== '' && <p className="title">{cartNonQualifiedTitle}</p>} */}
                <p className="non-qualified-copy">
                  {replacePlaceholders(
                    cartNonQualifiedBody,
                    ['%%GWP_remaining_spend%%'],
                    [
                      simpleFormatPrice(
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
