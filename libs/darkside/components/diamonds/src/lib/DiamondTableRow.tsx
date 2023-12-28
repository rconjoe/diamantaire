import { GTM_EVENTS, useAnalytics } from '@diamantaire/analytics';
import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_VIDEO_BASE_URL, getCurrency, getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { diamondRouteAppointment, diamondRoutePdp } from '@diamantaire/shared/routes';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Diamond360 from './Diamond360';
import StyledDiamondTableRow from './DiamondTableRow.style';
import DiamondtableRowAccordion from './DiamondTableRowAccordion';

const DiamondTableRow = ({
  product,
  locale,
  isBuilderFlowOpen = false,
  settingSlugs,
}: {
  product?: DiamondDataTypes;
  locale: string;
  isBuilderFlowOpen?: boolean;
  settingSlugs?: {
    [key: string]: string;
  };
}) => {
  const { emitDataLayer } = useAnalytics();
  const router = useRouter();
  const { handle, lotId, diamondType } = product;
  const { data: checkout } = useCartData(locale);

  const { updateFlowData } = useContext(BuilderProductContext);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { refetch } = useCartData(locale);

  const { _t } = useTranslations(locale);

  const { isMobile } = useContext(GlobalContext);
  const { builderProduct } = useContext(BuilderProductContext);

  console.log('builderProduct?.product', settingSlugs);

  const diamondDetailRoute = `${diamondRoutePdp}/${handle}${
    settingSlugs?.collectionSlug ? '?collectionSlug=' + settingSlugs?.collectionSlug : ''
  }${settingSlugs?.productSlug ? '&productSlug=' + settingSlugs?.productSlug : ''}`;

  const diamondExpertRoute = diamondRouteAppointment;

  const ToastErrorStyles = styled.div`
    p {
      font-size: 1.6rem;
    }
  `;

  const ToastError = () => {
    return (
      <ToastErrorStyles>
        <p>This diamond is already in your cart</p>
      </ToastErrorStyles>
    );
  };

  console.log('router.query', router.query);

  const handleSelectDiamond = () => {
    const { carat, color, clarity, cut, price } = product;

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

    updateFlowData('ADD_DIAMOND', product);

    if (!router.query.flowType) {
      router.push(`/customize/diamond-to-setting/${product.lotId}`);
    } else if (router.query.flowType === 'setting-to-diamond') {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });
      router.push(
        `/customize/setting-to-diamond/summary/${`/${settingSlugs?.collectionSlug}/${settingSlugs?.productSlug}`}/${product?.lotId}`,
      );
    } else {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });
      router.push(
        `/customize/diamond-to-setting/${router.asPath.includes('/summary/') ? '/summary/' : ''}${product.lotId}${
          builderProduct?.product ? `/${settingSlugs?.collectionSlug}/${settingSlugs?.productSlug}` : ''
        }`,
      );
    }
  };

  const handleInitBuilderFlow = () => {
    handleSelectDiamond();
  };

  const handlePurchase = () => {
    // TODO: add handler
    console.log(`handlePurchase`, product);

    // Check if diamond is in the cart
    const isDiamondInCart = checkout?.lines?.find((item) => item.merchandise.id === product?.variantId);

    if (isDiamondInCart) {
      return toast.error(ToastError, {
        autoClose: 3000,
      });
    }

    const mutatedLotId = getNumericalLotId(product?.lotId);

    const diamondImage = JSON.stringify({
      src: `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`,
      alt: product?.productTitle,
      width: 150,
      height: 150,
    });

    const diamondAttributes = {
      _productTitle: `Loose Diamond (${_t(product?.diamondType)})`,
      productAsset: diamondImage,
      _dateAdded: Date.now().toString(),
      caratWeight: product.carat.toString(),
      clarity: product.clarity,
      cut: product.cut,
      color: product.color,
      // feedId: settingVariantId,
      lotId: product.lotId,
      productGroupKey: uuidv4(),
      _productType: 'Diamond',
      shippingText: _t('Made-to-order. Ships by'),
      productIconListShippingCopy: 'temp',
      shippingBusinessDays: 'temp',
      pdpUrl: window.location.href,
    };

    addLooseDiamondToCart({ diamondVariantId: product?.variantId, diamondAttributes, locale }).then(() => refetch());

    updateGlobalContext({ isCartOpen: true });
  };

  return (
    <StyledDiamondTableRow>
      <div className="row-container">
        <div className="row-media">
          <div className="row-media-content">
            <WishlistLikeButton extraClass="diamond-table" productId={`diamond-${lotId}`} />
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
