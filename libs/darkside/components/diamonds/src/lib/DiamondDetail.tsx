import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { DarksideButton, Form, Heading, SwiperStyles, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext, GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { LooseDiamondProductCartItem, addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import {
  useCartData,
  useDiamondPdpData,
  useDiamondTableData,
  useDiamondsData,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { DIAMOND_VIDEO_BASE_URL, getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getDiamondType, specGenerator } from '@diamantaire/shared/helpers';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { Fragment, useContext } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

import Diamond360 from './Diamond360';
import StyledDiamondDetail from './DiamondDetail.style';
import DiamondDetailAccordion from './DiamondDetailAccordion';
import DiamondDetailIconList from './DiamondDetailIconList';
import DiamondDetailSpecs from './DiamondDetailSpecs';
import DiamondHand from './DiamondHand';

interface DiamondDetailDataTypes {
  handle?: string;
  diamondType?: string;
  locale?: string;
  countryCode?: string;
  currencyCode?: string;
}

const DiamondDetail = ({ handle, diamondType, locale, countryCode, currencyCode }: DiamondDetailDataTypes) => {
  const { isMobile, headerHeight } = useContext(GlobalContext);
  const { refetch } = useCartData(locale);
  const { _t } = useTranslations(locale);
  const { data: { diamond: product } = {} } = useDiamondsData({ handle, withAdditionalInfo: true });
  const { data: { diamondTable: DiamondTableData } = {} } = useDiamondTableData(locale);
  const { data: { diamondProduct: DiamondPdpData } = {} } = useDiamondPdpData(locale);
  const { specs } = DiamondTableData || {};
  const { productTitle, buttonTextDiamondFlow, quickCheckoutText } = DiamondPdpData || {};
  const { carat: productCarat, price: productPrice, lotId } = product || {};
  const getInfo = (arr, v) => arr.find((x) => x.key === v);
  const price = productPrice ? getFormattedPrice(productPrice, locale, true) : null;
  const diamondTitle = _t(getDiamondType(diamondType)?.slug);
  const formattedCarat = getFormattedCarat(productCarat, locale);
  const updateGlobalContext = useContext(GlobalUpdateContext);

  const media = [
    <Diamond360 key="0" className="media-content-item" diamondType={diamondType} diamond={product} />,
    <DiamondHand key="1" className="media-content-item" diamond={product} />,
  ];

  const { color, clarity, carat, cut } = product || {};
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

  console.log('specGen', specGen);

  function handleAddLooseDiamondToCart() {
    const mutatedLotId = lotId && getNumericalLotId(lotId);
    const diamondImage = `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`;

    const diamondAttributes: LooseDiamondProductCartItem = {
      _productTitle: product?.productTitle,
      productAsset: diamondImage,
      _productAssetObject: JSON.stringify({
        src: diamondImage,
        width: 200,
        height: 200,
      }),
      _dateAdded: Date.now().toString() + 100,
      caratWeight: product.carat.toString(),
      clarity: product.clarity,
      cut: product.cut,
      color: product.color,
      feedId: product.lotId,
      lotId: product.lotId,
      productGroupKey: uuidv4(),
      _specs: specGen,
      _productType: 'Diamond',
      _productTypeTranslated: _t('Diamond'),
      shippingText: _t('Made-to-order. Ships by'),
      productIconListShippingCopy: 'temp',
      shippingBusinessDays: 'temp',
      pdpUrl: window.location.href,
    };

    addLooseDiamondToCart({
      diamondVariantId: product?.variantId,
      diamondAttributes,
    })
      .then(() =>
        updateGlobalContext({
          isCartOpen: true,
        }),
      )
      .then(() => refetch());
  }

  return (
    <StyledDiamondDetail headerHeight={headerHeight}>
      <div className="body">
        <div className="main">
          {product?.lotId && (
            <div className="media">
              <div className="media-content">
                {(isMobile && (
                  <SwiperStyles className="carousel">
                    <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
                      {media.map((v, i) => {
                        return <SwiperSlide key={`media${i}`}>{v}</SwiperSlide>;
                      })}
                    </Swiper>
                  </SwiperStyles>
                )) ||
                  media.map((v) => v)}
              </div>
              {isMobile && <WishlistLikeButton extraClass="diamond-detail" productId={`diamond-${lotId}`} />}
            </div>
          )}
        </div>

        <div className="aside">
          <Heading className="title" type="h2">
            {formattedCarat} {getInfo(specs, 'carat')?.value} {diamondTitle} {productTitle}
          </Heading>
          {price && (
            <div className="price">
              <span>{price}</span>

              {getIsUserInEu() && (
                <div className="price-text">
                  <UIString>incl. VAT</UIString>
                </div>
              )}
            </div>
          )}

          {lotId && <DiamondDetailAccordion lotId={lotId} locale={locale} />}

          <div className="cta">
            {(product?.available_inventory && (
              <>
                <DarksideButton type="solid" colorTheme="black" href={`/customize/diamond-to-setting/${lotId}`}>
                  {buttonTextDiamondFlow}
                </DarksideButton>

                <DarksideButton onClick={() => handleAddLooseDiamondToCart()} type="underline" colorTheme="teal">
                  {quickCheckoutText}
                </DarksideButton>
              </>
            )) || (
              <UniLink route={`/diamonds/inventory/${diamondType}`}>
                <DarksideButton type="outline" colorTheme="black">
                  <UIString>Sold: Browse other diamonds</UIString>
                </DarksideButton>
              </UniLink>
            )}
          </div>

          <DiamondDetailIconList locale={locale} />

          <div className="mail">
            <strong className="title">
              <UIString>Need more time to think?</UIString>
            </strong>

            <p>
              <UIString>Email this diamond to yourself or drop a hint.</UIString>
            </p>

            <Form
              ctaCopy={_t('Submit')}
              onSubmit={(e) => e.preventDefault()}
              emailPlaceholderText={_t('Enter your email')}
            />
          </div>

          <DiamondDetailSpecs handle={handle} locale={locale} />

          {!isMobile && <WishlistLikeButton extraClass="diamond-detail" productId={`diamond-${lotId}`} />}
        </div>
      </div>

      <div className="foot">
        {DiamondPdpData.content.map((v, i) => {
          return (
            <Fragment key={`${v._modelApiKey}_${i}`}>
              <BlockPicker
                _modelApiKey={v._modelApiKey}
                modularBlockData={{ ...v, additionalClass: 'container-wrapper' }}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={true}
              />
            </Fragment>
          );
        })}
      </div>
    </StyledDiamondDetail>
  );
};

export { DiamondDetail };

export default DiamondDetail;
