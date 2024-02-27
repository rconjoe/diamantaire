import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { DarksideButton, Form, Heading, UIString, UniLink } from '@diamantaire/darkside/components/common-ui';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { LooseDiamondAttributeProps, addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import {
  humanNamesMapperType,
  useCartData,
  useDiamondPdpData,
  useDiamondsData,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { DIAMOND_VIDEO_BASE_URL, getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { shouldDisplayVat } from '@diamantaire/shared/geolocation';
import { getDiamondType, specGenerator } from '@diamantaire/shared/helpers';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
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
  const { refetch } = useCartData(locale);
  const { _t } = useTranslations(locale);
  const { _t: getDiamondTitle } = useTranslations(locale, [humanNamesMapperType.DIAMOND_SHAPES]);
  const { data: { diamond: product } = {} } = useDiamondsData({ handle, withAdditionalInfo: true });
  const { data: { diamondProduct: DiamondPdpData } = {} } = useDiamondPdpData(locale);
  const { fullProductTitle, buttonTextDiamondFlow, quickCheckoutText } = DiamondPdpData || {};
  const { carat: productCarat, price: productPrice, lotId } = product || {};
  const price = productPrice ? getFormattedPrice(productPrice, locale, true) : null;
  const diamondTypeSlug = getDiamondType(diamondType)?.slug;
  const diamondTitle = getDiamondTitle(diamondTypeSlug);
  const formattedCarat = getFormattedCarat(productCarat, locale);
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const [activeSlide, setActiveSlide] = useState(0);

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
    locale,
  });

  function handleAddLooseDiamondToCart() {
    const mutatedLotId = lotId && getNumericalLotId(lotId);
    const diamondImage = `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`;

    const diamondAttributes: LooseDiamondAttributeProps = {
      _productTitle: `${_t('Loose Diamond')} (${_t(diamondType)})`,
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

  const { query } = useRouter();

  const selectYourSettingLink =
    query?.collectionSlug && query.productSlug
      ? `/customize/setting-to-diamond/${query?.collectionSlug}/${query?.productSlug}/${lotId}/summary`
      : `/customize/diamond-to-setting/${lotId}`;

  const sliderOptions: any = {
    loop: false,
    dragFree: false,
    align: 'center',
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    // Initialize the active slide
    updateActiveSlide();

    // Add event listeners to track the active slide
    emblaApi.on('select', updateActiveSlide);

    // Clean up the event listeners when the component unmounts
    return () => {
      emblaApi.off('select', updateActiveSlide);
    };
  }, [emblaApi]);

  const isBuilderFlowInProgress = query?.collectionSlug && query.productSlug;

  return (
    <StyledDiamondDetail>
      <div className="body">
        <div className="main">
          {product?.lotId && (
            <div className="media">
              <div className="media-content">
                <div className="desktop-media-slider">{media.map((v) => v)}</div>

                <div className="mobile-media-slider">
                  <div className="embla carousel" ref={emblaRef}>
                    <div className="embla__container">
                      {media.map((v, i) => {
                        return (
                          <div className="embla__slide" key={`media${i}`}>
                            {v}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="slider-dots">
                    <ul>
                      {media?.map((_asset, index) => {
                        return (
                          <li key={`review-build-dot-${index}`}>
                            <button
                              className={activeSlide === index ? 'active' : ''}
                              onClick={() => emblaApi?.scrollTo(index)}
                            ></button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="wishlist-button--mobile">
                <WishlistLikeButton extraClass="diamond-detail" productId={`diamond-${lotId}`} />
              </div>
            </div>
          )}
        </div>

        <div className="aside">
          <Heading className="title" type="h2">
            {fullProductTitle.replace('%%carat%%', formattedCarat).replace('%%diamondType%%', diamondTitle)}
          </Heading>

          {price && (
            <div className="price">
              <span>{price}</span>

              {shouldDisplayVat(locale) && (
                <div className="price-text">
                  <UIString>incl. VAT</UIString>
                </div>
              )}
            </div>
          )}

          {lotId && <DiamondDetailAccordion lotId={lotId} locale={locale} />}

          <div className="cta">
            {(product?.availableForSale && (
              <>
                <DarksideButton type="solid" colorTheme="black" href={selectYourSettingLink}>
                  {isBuilderFlowInProgress ? <UIString>Complete & Review Your Ring</UIString> : buttonTextDiamondFlow}
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

          <div className="wishlist-button--desktop">
            <WishlistLikeButton extraClass="diamond-detail" productId={`diamond-${lotId}`} />
          </div>
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
