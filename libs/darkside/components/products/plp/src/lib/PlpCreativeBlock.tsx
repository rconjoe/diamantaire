import { DarksideButton, Heading, MobileDesktopImage, SlideOut } from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useCartData, usePlpGWP, useProductShopTheLook, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { PlpProductItem } from './PlpProductItem';

const PlpCreativeBlockStyles = styled.div`
  grid-column: 1/3;
  border: 0.1rem solid var(--color-light-grey);

  ${media.medium`
    grid-column: 1/3; grid-area: 2 / 1 / 4 / 3;
  `}

  &.creative-block--right {
    ${media.medium`
      grid-area: 5 / 3 / 7 / 5;
    `}
  }

  .closing-animation {
    background: red;
  }

  .creative-block__image {
    position: relative;

    .creative-block__content {
      .creative-block__content-inner {
        position: absolute;
        bottom: 4rem;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
      }

      &.with-copy-content .creative-block__content-inner {
        display: flex;
        flex-direction: column;
        background-color: var(--color-white);
        gap: 1rem;
        position: absolute;
        max-width: 42rem;
        right: -0.1rem;
        bottom: 4rem;
        padding: 2rem;
        left: auto;
      }

      &.with-shop-the-look .creative-block__content-inner {
        left: 50%;
        width: 25rem;
        margin-left: -12.5rem;

        button {
          border: 0.1rem solid var(--color-white);
          color: var(--color-white);

          &:focus,
          &:hover {
            background: var(--color-black);
            border: 0.1rem solid var(--color-black);
          }
        }
      }
    }
  }
`;

const ShopTheLookSlideOutStyles = styled.div`
  .product-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin: 2rem 0;
    padding: 0;
  }

  .plp-variant__image {
    min-height: auto;
  }
`;

const PlpCreativeBlock = ({ block, plpTitle, selectSetting }) => {
  const {
    configurationsInOrder,
    desktopImage,
    mobileImage,
    desktopCopy,
    mobileCopy,
    title,
    className,
    darksideButtons,
    enableGwp,
    openInNewTab,
  } = block || {};

  const router = useRouter();

  const { locale } = router || {};

  const { _t } = useTranslations(locale);

  const { data: gwp } = usePlpGWP(locale);

  const { data: checkout } = useCartData(locale);

  const gwpData = gwp?.allGwpDarksides?.[0]?.tiers?.[0];

  const { isMobile } = useContext(GlobalContext);

  const {
    supportedCountries,
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

  const minSpendValue = minSpendByCurrencyCode?.[currencyCode].toString();

  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  const gwpText = hasUserQualified ? creativeBlockQualifiedCopy : creativeBlockNonQualifiedCopy;

  const areSettingsValid = isWithinTimeframe && isCountrySupported(supportedCountries, countryCode) && minSpendValue;

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

  const isShopTheLook = configurationsInOrder && Array.isArray(configurationsInOrder);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [showShopTheLookSlideout, setShowShopTheLookSlideout] = useState(false);

  const handleOpenShopTheLook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowShopTheLookSlideout(true);
  };

  const handleCloseShopTheLook = () => {
    setShowShopTheLookSlideout(false);
  };

  useEffect(() => {
    if (showShopTheLookSlideout) {
      const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

      setScrollPosition(currentScrollPosition);
    }
  }, [showShopTheLookSlideout]);

  return (
    <PlpCreativeBlockStyles className={className}>
      <div className="creative-block__image">
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />

        <div
          className={`creative-block__content${
            title || desktopCopy || mobileCopy ? ' with-copy-content' : isShopTheLook ? ' with-shop-the-look' : ''
          }`}
        >
          <div className="creative-block__content-inner">
            {enableGwp && areSettingsValid ? (
              <p>{replacedGwpText}</p>
            ) : (
              <>
                {title && (
                  <Heading type="h2" className="primary">
                    {title}
                  </Heading>
                )}

                {desktopCopy && <p>{desktopCopy}</p>}

                {mobileCopy && <p>{mobileCopy}</p>}

                {darksideButtons?.map((button) => {
                  return (
                    <DarksideButton
                      mobileColorTheme={button.ctaButtonMobileColorTheme}
                      colorTheme={button.ctaButtonColorTheme}
                      type={button.ctaButtonType}
                      href={button.ctaLinkUrl}
                      key={button.id}
                      onClick={(e) => {
                        isShopTheLook && handleOpenShopTheLook(e);
                      }}
                      openUrlInNewWindow={openInNewTab}
                    >
                      {button.ctaCopy}
                    </DarksideButton>
                  );
                })}

                {showShopTheLookSlideout &&
                  createPortal(
                    <SlideOut
                      className="slideout--shop-the-look"
                      title={_t('Shop the look')}
                      scrollPosition={scrollPosition}
                      onClose={handleCloseShopTheLook}
                      width={isMobile ? '100%' : '55rem'}
                    >
                      <PlpCreativeSlideOutContent
                        configurationsInOrder={configurationsInOrder}
                        locale={locale}
                        plpTitle={plpTitle}
                        selectSetting={selectSetting}
                      />
                    </SlideOut>,
                    document.getElementById('vrai-site'),
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </PlpCreativeBlockStyles>
  );
};

const PlpCreativeSlideOutContent = ({ configurationsInOrder, locale, plpTitle, selectSetting }) => {
  const ids = useMemo(
    () => configurationsInOrder.reduce((a, v) => [...a, v.variantId || v.shopifyProductHandle], []),
    [configurationsInOrder],
  );

  const { data: { products } = {} } = useProductShopTheLook(ids, locale);

  console.log(`PlpCreativeSlideOutContent:`, products);

  // create new endpoint to get valid data that can be used in PlpProductGrid.tsx

  return (
    <ShopTheLookSlideOutStyles>
      <ul className="product-list">
        {products?.length > 0 &&
          products?.map((product, gridItemIndex) => {
            if (!product) {
              return null;
            }

            return (
              <PlpProductItem
                key={`${gridItemIndex}-${product.productTitle}`}
                product={product}
                plpTitle={plpTitle}
                position={gridItemIndex}
                selectSettingForBuilderFlow={() => {
                  return selectSetting({
                    collectionSlug: product.variants[product.defaultId]?.collectionSlug,
                    productSlug: product.variants[product.defaultId]?.productSlug,
                  });
                }}
                useProductTitleOnly={true}
              />
            );
          })}
      </ul>
    </ShopTheLookSlideOutStyles>
  );
};

export default PlpCreativeBlock;
