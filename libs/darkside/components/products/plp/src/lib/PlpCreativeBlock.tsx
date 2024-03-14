import { DarksideButton, Heading, MobileDesktopImage, SlideOut } from '@diamantaire/darkside/components/common-ui';
import { useCartData, usePlpGWP, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import PlpCreativeSlideOut from './PlpCreativeSlideout';

const PlpCreativeBlockStyles = styled.div`
  grid-column: 1/3;

  @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
    margin: 0 -1rem;
    display: block;
    border: 0;
  }

  ${media.medium`
    grid-column: 1/3; grid-area: 2 / 1 / 4 / 3;
  `}

  &.creative-block--right {
    ${media.medium`
      grid-area: 5 / 3 / 7 / 5;
    `}
  }

  .creative-block__image {
    position: relative;

    .creative-block__content {
      border: 0;

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
        position: relative;
        max-width: 31rem;
        padding: 2.4rem 2.8rem;
        margin: -8rem auto 0;
        bottom: auto;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          max-width: 42rem;
          position: absolute;
          margin: auto;
          right: -0.1rem;
          bottom: 4rem;
          left: auto;
        }
      }

      &.with-shop-the-look .creative-block__content-inner {
        left: 50%;
        width: 25rem;
        margin-left: -12.5rem;

        button {
          border-width: 0.2rem;
        }
      }
    }
  }
`;

const PlpCreativeBlock = ({ block, plpTitle }) => {
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
        <MobileDesktopImage shouldLazyLoad={true} desktopImage={desktopImage} mobileImage={mobileImage} alt={title} />

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

                {desktopCopy && <p className="tablet-and-up">{desktopCopy}</p>}

                {mobileCopy && <p className="mobile-only">{mobileCopy}</p>}

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
                    >
                      <PlpCreativeSlideOut
                        configurationsInOrder={configurationsInOrder}
                        locale={locale}
                        plpTitle={plpTitle}
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

export default PlpCreativeBlock;
