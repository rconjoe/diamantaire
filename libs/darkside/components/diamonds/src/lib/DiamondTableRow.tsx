import { GTM_EVENTS, useAnalytics } from '@diamantaire/analytics';
import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { LooseDiamondAttributeProps, addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo, useTranslations } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_VIDEO_BASE_URL, getCurrency, getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { specGenerator } from '@diamantaire/shared/helpers';
import { diamondRouteAppointment, diamondRoutePdp } from '@diamantaire/shared/routes';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { useRouter } from 'next/router';
import { useContext } from 'react';
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
  updateSettingSlugs,
}: {
  product?: DiamondDataTypes;
  locale: string;
  isBuilderFlowOpen?: boolean;
  settingSlugs?: {
    [key: string]: string;
  };
  updateSettingSlugs?: (_obj) => void;
}) => {
  const { emitDataLayer } = useAnalytics();
  const router = useRouter();
  const { handle, lotId, diamondType } = product;

  const { data: { cart: cartData } = {} } = useCartInfo(router.locale);

  const { pageCopy: cartCopy } = cartData || {};
  const { uniqueDiamondAlreadyInCartErrorMessage } = cartCopy?.[0] || {};

  const { updateFlowData } = useContext(BuilderProductContext);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { refetch } = useCartData(locale);

  const { _t } = useTranslations(locale);

  const { isMobile } = useContext(GlobalContext);
  const { builderProduct } = useContext(BuilderProductContext);

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
        <p>{uniqueDiamondAlreadyInCartErrorMessage}</p>
      </ToastErrorStyles>
    );
  };

  const handleSelectDiamond = async () => {
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

    await updateFlowData('ADD_DIAMOND', [product]);

    if (updateSettingSlugs) {
      updateSettingSlugs({
        lotIds: [product.lotId],
      });
    }

    if (!router.query.flowType) {
      console.log('case 001');
      router.push(`/customize/diamond-to-setting/${product.lotId}`);
    } else if (router.query.flowType === 'setting-to-diamond') {
      console.log('case 002');
      router.push(
        `/customize/setting-to-diamond/${
          router.asPath.includes('/pair/') ? '/pair/' : ''
        }summary/${`${settingSlugs?.collectionSlug}/${settingSlugs?.productSlug}`}/${product?.lotId}`,
        null,
      );
    } else {
      const nextUrl = `/customize/diamond-to-setting/${router.asPath.includes('summary/') ? 'summary/' : ''}${
        product.lotId
      }${builderProduct?.product ? `/${settingSlugs?.collectionSlug}/${settingSlugs?.productSlug}` : ''}`;

      console.log('case 003', nextUrl);

      return router.replace(nextUrl, null, { shallow: true, scroll: true });
    }
  };

  const handleInitBuilderFlow = () => {
    handleSelectDiamond();
  };

  function handleAddLooseDiamondToCart() {
    const mutatedLotId = lotId && getNumericalLotId(lotId);
    const diamondImage = `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`;
    const { color, clarity, cut, carat } = product || {};

    const specGen = specGenerator({
      configuration: {
        color,
        clarity,
        cut,
        caratWeight: carat,
      },
      productType: 'Diamond',
      _t,
    });

    const diamondAttributes: LooseDiamondAttributeProps = {
      _productTitle: `${_t('Loose Diamond')} (${_t(diamondType)})`,
      productAsset: diamondImage,
      _productAssetObject: JSON.stringify({
        src: diamondImage,
        width: 200,
        height: 200,
      }),
      _dateAdded: Date.now().toString() + 100,
      caratWeight: carat.toString(),
      clarity,
      cut,
      color,
      feedId: lotId,
      lotId,
      productGroupKey: uuidv4(),
      _specs: specGen,
      _productType: 'Diamond',
      _productTypeTranslated: _t('Diamond'),
      pdpUrl: window.location.href,
    };

    addLooseDiamondToCart({
      diamondVariantId: product?.variantId,
      diamondAttributes,
    })
      .then(() => refetch())
      .then(() =>
        updateGlobalContext({
          isCartOpen: true,
        }),
      );
  }

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

            <DarksideButton
              type="underline"
              colorTheme="teal"
              className="button-purchase"
              onClick={handleAddLooseDiamondToCart}
            >
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

            {false && <ToastError />}
          </div>
        </div>
      </div>
    </StyledDiamondTableRow>
  );
};

export { DiamondTableRow };

export default DiamondTableRow;
