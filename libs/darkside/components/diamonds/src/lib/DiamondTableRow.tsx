import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { GTM_EVENTS, useAnalytics } from '@diamantaire/darkside/context/analytics';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { UIString } from '@diamantaire/darkside/core';
import { getCurrency, getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { updateUrlParameter } from '@diamantaire/shared/helpers';
import { diamondRouteAppointment, diamondRoutePdp } from '@diamantaire/shared/routes';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Diamond360 from './Diamond360';
import StyledDiamondTableRow from './DiamondTableRow.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

const DiamondTableRow = ({
  product,
  locale,
  isBuilderFlowOpen = false,
}: {
  product?: DiamondDataTypes;
  locale?: string;
  isBuilderFlowOpen?: boolean;
}) => {
  const { emitDataLayer } = useAnalytics();
  const router = useRouter();
  const { handle, lotId, diamondType } = product;

  const { updateFlowData, builderProduct } = useContext(BuilderProductContext);
  const { addItemToCart, setIsCartOpen } = useContext(CartContext);
  const { isMobile } = useContext(GlobalContext);

  console.log(`isMobile`, isMobile);
  const diamondDetailRoute = `${diamondRoutePdp}/${handle}`;

  const diamondExpertRoute = diamondRouteAppointment;

  const handleSelectDiamond = () => {
    const { carat, color, clarity, cut, price } = product;
    const { locale } = router || {};
    const { countryCode } = parseValidLocale(locale) || {};

    const currencyCode = getCurrency(countryCode);
    const formattedPrice = getFormattedPrice(price, locale, true, true);

    emitDataLayer({
      event: GTM_EVENTS.selectDiamond,
      eventCategory: 'engagement_ring_creation',
      eventAction: GTM_EVENTS.selectDiamond,
      eventLabel: `${diamondType}, ${carat}, ${color}, ${clarity}, ${cut}`,
      shape: diamondType,
      // eslint-disable-next-line camelcase
      diamond_type: diamondType,
      carat,
      colour: color,
      clarity,
      cut,
      price: formattedPrice,
      currencyCode,
    });

    updateUrlParameter('lotId', product.lotId);
    updateFlowData('ADD_DIAMOND', product, builderProduct.step + 1);
  };

  const handleInitBuilderFlow = () => {
    handleSelectDiamond();
    router.push(`/customize?lotId=${product.lotId}`);
  };

  const handlePurchase = () => {
    // TODO: add handler
    console.log(`handlePurchase`, product);

    // const cartAttributesForDiamond = [
    //   {
    //     key: 'productTitle',
    //     value: 'Loose Diamond',
    //   },
    //   {
    //     key: '_image',
    //     value: JSON.stringify(image),
    //   },
    //   {
    //     key: '_dateAdded',
    //     value: Date.now().toString(),
    //   },
    //   {
    //     key: 'diamondType',
    //     value: product.diamondType,
    //   },
    // ];

    addItemToCart(product?.variantId);
    setIsCartOpen(true);
  };

  return (
    <StyledDiamondTableRow>
      <div className="row-container">
        <div className="row-media">
          <div className="row-media-content">
            <Diamond360 lotId={lotId} diamondType={diamondType} />
          </div>
        </div>
        <div className="row-aside">
          <div className="row-cta">
            {!isMobile && (
              <DarksideButton href={diamondDetailRoute} type="underline" colorTheme="teal" className="button-details">
                <UIString>View More Details</UIString>
              </DarksideButton>
            )}
            {isBuilderFlowOpen ? (
              <DarksideButton type="solid" colorTheme="black" className="button-select" onClick={handleSelectDiamond}>
                <UIString>Select</UIString>
              </DarksideButton>
            ) : (
              <DarksideButton type="solid" colorTheme="black" className="button-select" onClick={handleInitBuilderFlow}>
                <UIString>Select</UIString>
              </DarksideButton>
            )}

            <DarksideButton href={diamondExpertRoute} type="underline" colorTheme="teal" className="button-expert">
              <UIString>Speak to a diamond expert</UIString>
            </DarksideButton>

            <DarksideButton type="underline" colorTheme="teal" className="button-purchase" onClick={handlePurchase}>
              <UIString>Purchase without setting</UIString>
            </DarksideButton>
          </div>

          <div className="row-accordion">
            <DiamondtableRowAccordion product={product} locale={locale} />

            {isMobile && (
              <DarksideButton href={diamondDetailRoute} type="underline" colorTheme="teal" className="button-details">
                <UIString>View More Details</UIString>
              </DarksideButton>
            )}
          </div>
        </div>
      </div>
    </StyledDiamondTableRow>
  );
};

export { DiamondTableRow };

export default DiamondTableRow;
