import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { LooseDiamondAttributeProps, addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo, useTranslations } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_VIDEO_BASE_URL } from '@diamantaire/shared/constants';
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
  isBuilderFlowOpen = false,
}: {
  product?: DiamondDataTypes;
  isBuilderFlowOpen?: boolean;
}) => {
  const router = useRouter();
  const { handle, lotId, diamondType } = product;
  const { locale } = router;

  const { builderProduct } = useContext(BuilderProductContext);

  const { data: { cart: cartData } = {} } = useCartInfo(router.locale);

  const { pageCopy: cartCopy } = cartData || {};
  const { uniqueDiamondAlreadyInCartErrorMessage } = cartCopy?.[0] || {};

  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { refetch } = useCartData(locale);

  const { _t } = useTranslations(locale);

  const { _t: translateDiamondShape } = useTranslations(locale, ['DIAMOND_SHAPES']);

  const { isMobile } = useContext(GlobalContext);

  const diamondDetailRoute = `${diamondRoutePdp}/${handle}${
    router?.query?.collectionSlug ? '?collectionSlug=' + router?.query?.collectionSlug : ''
  }${router?.query?.productSlug ? '&productSlug=' + router?.query?.productSlug : ''}`;

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

  function determineNextUrl() {
    const flowType = router.asPath.includes('setting-to-diamond') ? 'setting-to-diamond' : 'diamond-to-setting';
    let nextUrl = '';

    // Prepare the ringSize query parameter if it exists
    const ringSizeQueryParam = router.query.ringSize ? `?ringSize=${router.query.ringSize}` : '';

    if (flowType === 'diamond-to-setting' && !router.query.collectionSlug && !router.query.productSlug) {
      console.log('case 001');
      nextUrl = `${locale === 'en-US' ? '' : `/${locale}`}/customize/diamond-to-setting/${
        product.lotId
      }${ringSizeQueryParam}`;
    } else if (flowType === 'setting-to-diamond') {
      console.log('case 002');
      const productShapeId = builderProduct?.product?.optionConfigs?.diamondType?.find(
        (option) => option.value === diamondType,
      )?.id;

      nextUrl = `${locale === 'en-US' ? '' : `/${locale}`}/customize/setting-to-diamond/${router?.query
        ?.collectionSlug}/${productShapeId}/${product.lotId}/summary${ringSizeQueryParam}`;
    } else {
      // Assuming this is the default or fallback case
      console.log('default case');
      const productShapeId = builderProduct?.product?.optionConfigs?.diamondType?.find(
        (option) => option.value === diamondType,
      )?.id;

      nextUrl = `${locale === 'en-US' ? '' : `/${locale}`}/customize/diamond-to-setting/${product.lotId}/${
        router.query.collectionSlug
      }/${productShapeId}/summary${ringSizeQueryParam}`;
    }

    return nextUrl; // Just return the constructed URL string with ringSize appended if present
  }

  const nextUrl = determineNextUrl();

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
      locale,
    });

    const diamondAttributes: LooseDiamondAttributeProps = {
      _productTitle: `${_t('Loose Diamond')} (${translateDiamondShape(diamondType)})`,
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
              <DarksideButton type="solid" colorTheme="black" className="button-select" href={nextUrl}>
                <UIString>Select</UIString>
              </DarksideButton>
            ) : (
              <DarksideButton type="solid" colorTheme="black" className="button-select" href={nextUrl}>
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
            <DiamondtableRowAccordion product={product} />

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
