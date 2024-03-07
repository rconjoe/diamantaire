import { ParsedUrlQuery } from 'querystring';

import {
  DarksideButton,
  Heading,
  HideTopBar,
  Markdown,
  ProductAppointmentCTA,
  StickyElementWrapper,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import {
  Diamond360,
  DiamondCfyAccordion,
  DiamondCfyGallery,
  DiamondHand,
  DiamondPlan,
  DiamondRough,
} from '@diamantaire/darkside/components/diamonds';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { LooseDiamondAttributeProps, addLooseDiamondToCart } from '@diamantaire/darkside/data/api';
import {
  humanNamesMapperType,
  useCartData,
  useDiamondCfyData,
  useDiamondCtoData,
  useProduct,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import {
  DIAMOND_VIDEO_BASE_URL,
  STANDARD_CFY_DIAMOND_TYPES,
  getFormattedCarat,
  getFormattedPrice,
  parseValidLocale,
} from '@diamantaire/shared/constants';
import { shouldDisplayVat } from '@diamantaire/shared/geolocation';
import {
  capitalizeFirstLetter,
  generateDiamondSpriteImage,
  getCFYResultOptionsFromUrl,
  getDiamondType,
  getShipByDateCopy,
  specGenerator,
} from '@diamantaire/shared/helpers';
import { DiamondCtoDataTypes } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { StyledCFYResultPage } from './CFYResultPage.style';

interface CFYResultPageQueryParams extends ParsedUrlQuery {
  carat?: string;
  diamondType?: string;
  product?: string;
}

interface CFYResultPageProps {
  dehydratedState: DehydratedState;
  options?: CFYResultPageQueryParams;
}

const CFYResultPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { options = {} } = props;
  const router = useRouter();
  const { locale } = router;
  const { countryCode } = parseValidLocale(locale);

  const { data: { ctoDiamondTable: diamondCfyData } = {} } = useDiamondCfyData(locale);

  const {
    ctoDiamondResultFoundTitle,
    ctoDiamondResultFinalSaleNote,
    ctoDiamondResultNote,
    ctoDiamondResultNeedItFaster,
    ctoDiamondResultShapeAndWeightTitle,
    ctoDiamondResultPolishedByDateCopy,
    ctoDiamondResultPolishedDiamondImageCaption: caption360,
    productIconList,
    nonStandardShapeAppointmentsBody,
    scheduleAnAppointment,
  } = diamondCfyData;

  const { title: seoTitle = '', description: seoDesc = '' } = diamondCfyData?.seo || {};

  const { _t } = useTranslations(locale, [
    humanNamesMapperType.DIAMOND_SHAPES,
    humanNamesMapperType.DIAMOND_SPECS,
    humanNamesMapperType.OPTION_NAMES,
  ]);

  const diamondCtoData = useDiamondCtoData(options)?.data;

  const defaultProduct = diamondCtoData['diamond'];

  const [checkbox, setCheckbox] = useState<('cut' | 'color' | 'clarity')[]>([]);

  const [product, setProduct] = useState<DiamondCtoDataTypes>(defaultProduct);

  const [display, setDisplay] = useState<string>('diamond');

  const { diamondType, carat, price } = product;

  const formattedPrice = getFormattedPrice(price, locale);

  const shouldRenderReturnPolicy = !isValidForReturn(diamondType, Number(carat));

  const lotIdPicker = `cfy-${diamondType}`;

  const media = getMedia({ product, diamondType, lotIdPicker, caption360 });

  const slides = media.map((mediaComponent, index) => (
    <div className="embla__slide" key={`media${index}`}>
      {mediaComponent}
    </div>
  ));

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleUpgradeClick = (type: string) => {
    const checkboxArray = updateCheckboxSelection(type, checkbox);

    const checkboxArrayLen = checkboxArray.length;

    const selectedDisplay =
      checkboxArrayLen > 0
        ? `${checkboxArray.reduce((a, v, i) => {
            return a + (i > 0 ? 'And' : '') + capitalizeFirstLetter(v);
          }, 'diamond')}Upgrade`
        : 'diamond';

    setCheckbox(checkboxArray);

    setDisplay(selectedDisplay);
  };

  const diamondTypeTitle = _t(getDiamondType(product?.diamondType)?.slug || '');

  const caratValue = parseFloat(product?.carat?.toFixed(1) || '');

  const formattedCaratValue = getFormattedCarat(caratValue, locale, 1);

  const pageTitle = `${ctoDiamondResultShapeAndWeightTitle
    .replace('%%diamond_shape%%', diamondTypeTitle)
    .replace('%%diamond_carat%%', formattedCaratValue)}`;

  const [loadPagination, setLoadPagination] = useState(0);

  const isStandardShape = STANDARD_CFY_DIAMOND_TYPES.includes(diamondType);

  const diamondTableInventoryLink = `/diamonds/inventory/` + (isStandardShape ? diamondType : '');

  const {
    cutForYouShippingBusinessDays: cutForYouShippingBusinessDaysUS,
    cutForYouShippingBusinessDaysCountryMap: cutForYouShippingBusinessDaysEverywhereElse,
    shippingText,
  } = productIconList?.items?.[0] || {};

  const businessDaysCfy =
    countryCode === 'US'
      ? cutForYouShippingBusinessDaysUS
      : cutForYouShippingBusinessDaysEverywhereElse?.[countryCode]
      ? cutForYouShippingBusinessDaysEverywhereElse?.[countryCode]
      : cutForYouShippingBusinessDaysEverywhereElse?.['International'];

  const formattedDate = getFormattedShipppingDate(
    locale,
    productIconList?.items?.find((v) => v.cutForYouShippingBusinessDays) || {},
    ctoDiamondResultPolishedByDateCopy,
    countryCode,
  );

  useEffect(() => {
    setProduct(diamondCtoData[display]);
  }, [display]);

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);
  }, []);

  const sliderOptions: any = {
    loop: false,
    dragFree: false,
    align: 'start',
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlideIndex(emblaApi.selectedScrollSnap());
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

  const { refetch } = useCartData(locale);

  const updateGlobalContext = useContext(GlobalUpdateContext);

  function handleAddLooseDiamondToCart() {
    const { color, clarity, cut, carat, lotId } = product || {};
    const mutatedLotId = lotId && getNumericalLotId(lotId);
    const diamondImage = `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`;

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

    const spriteImageUrl = generateDiamondSpriteImage({ diamondType });

    const diamondAttributes: LooseDiamondAttributeProps = {
      _productTitle: `${_t('Loose Diamond')} (${_t(diamondType)})`,
      productAsset: diamondImage,
      _productAssetObject: JSON.stringify({
        src: spriteImageUrl,
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
      shippingBusinessDays: businessDaysCfy?.toString(),
      shippingText: shippingText,
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

  const { collectionSlug, productSlug } = router.query;

  const isSettingFirstFlow = collectionSlug && productSlug;

  const continueLink = {
    url: isSettingFirstFlow
      ? `/customize/setting-to-diamond/${collectionSlug}/${productSlug}/${product.lotId}/summary`
      : `/customize/diamond-to-setting/${product.lotId}`,

    // Translated in jsx
    text: isSettingFirstFlow ? 'Complete & Review Your Ring' : 'Choose & Add a setting',
  };

  const productQuery = useProduct({ collectionSlug: collectionSlug?.toString(), productSlug: productSlug?.toString() });

  const { data: { productType = '' } = {} } = productQuery || {};

  console.log(`productQuery`, productQuery);

  const appointmentEl = useRef(null);

  const getToAppointment = (e) => {
    e.preventDefault();

    const appointmentElement = appointmentEl.current?.querySelector('.appointment-button');

    appointmentElement.click();
  };

  return (
    <>
      <HideTopBar />

      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <NextSeo title={seoTitle} description={seoDesc} nofollow={true} noindex={true} />

      <StyledCFYResultPage className="container-wrapper">
        <div className="page-row">
          <div className="page-head mobile-only">
            <div className="title">
              <Heading>{ctoDiamondResultFoundTitle}</Heading>
            </div>
          </div>

          <div className="page-content">
            <div className="media">
              {diamondCtoData && (
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container carousel">{slides}</div>

                  <div className="pagination">
                    <ul>
                      <li>
                        <button className={clsx({ active: activeSlideIndex === 0 })} onClick={() => emblaApi?.scrollTo(0)}>
                          <DiamondRough extraClass="media-content-item" width={60} height={60} priority={true} />
                        </button>
                      </li>
                      <li>
                        <button className={clsx({ active: activeSlideIndex === 1 })} onClick={() => emblaApi?.scrollTo(1)}>
                          <DiamondPlan
                            extraClass="media-content-item"
                            diamondType={diamondType}
                            width={60}
                            height={60}
                            priority={true}
                          />
                        </button>
                      </li>
                      <li>
                        <button className={clsx({ active: activeSlideIndex === 2 })} onClick={() => emblaApi?.scrollTo(2)}>
                          <Diamond360
                            key={0}
                            className="media-content-item diamond36"
                            diamondType={diamondType}
                            lotId={lotIdPicker}
                            useImageOnly={true}
                            width={60}
                            height={60}
                            priority={true}
                          />
                        </button>
                      </li>
                      <li>
                        <button className={clsx({ active: activeSlideIndex === 3 })} onClick={() => emblaApi?.scrollTo(3)}>
                          <DiamondHand
                            key={1}
                            className="media-content-item"
                            diamond={product}
                            isThumb={true}
                            width={60}
                            height={60}
                            priority={true}
                          />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="mobile-only">
              <WishlistLikeButton extraClass="cfy" productId={`cfy-${product.lotId}`} />
            </div>
          </div>

          <div className="page-aside">
            <div className="inner">
              <div className="title desktop-only">
                <Heading>{ctoDiamondResultFoundTitle}</Heading>
                <WishlistLikeButton extraClass="cfy" productId={`cfy-${product.lotId}`} />
              </div>

              <div className="subtitle">
                <p>{pageTitle}</p>
              </div>

              <div className="primary-price">
                <p>{formattedPrice}</p>

                {shouldDisplayVat(locale) && (
                  <small>
                    <UIString>incl. VAT</UIString>
                  </small>
                )}
              </div>

              <div className="accordion">
                <DiamondCfyAccordion
                  handleUpgradeClick={handleUpgradeClick}
                  diamondCtoData={diamondCtoData}
                  defaultProduct={defaultProduct}
                  checkbox={checkbox}
                  product={product}
                  display={display}
                  locale={locale}
                />
              </div>

              {isStandardShape ? (
                <>
                  <div className="date">
                    <p>{formattedDate}</p>
                  </div>

                  <div className="links">
                    <Markdown
                      options={{
                        overrides: getOverrides(diamondTableInventoryLink, 'mkt-need-it-faster'),
                      }}
                    >
                      {ctoDiamondResultNeedItFaster}
                    </Markdown>
                  </div>

                  <div className="cta">
                    <StickyElementWrapper>
                      <DarksideButton href={continueLink?.url}>
                        <UIString>{continueLink?.text}</UIString>
                      </DarksideButton>
                    </StickyElementWrapper>

                    <DarksideButton type="outline" onClick={() => handleAddLooseDiamondToCart()}>
                      <UIString>Purchase without setting</UIString>
                    </DarksideButton>
                  </div>

                  <div className="policy">
                    {shouldRenderReturnPolicy ? (
                      <Markdown>{ctoDiamondResultFinalSaleNote || ''}</Markdown>
                    ) : (
                      <Markdown>{ctoDiamondResultNote || ''}</Markdown>
                    )}
                  </div>
                </>
              ) : (
                <div className="section-non-standard-shape">
                  <div className="info">
                    <strong>{nonStandardShapeAppointmentsBody}</strong>
                  </div>

                  <div className="cta">
                    <StickyElementWrapper>
                      <DarksideButton onClick={getToAppointment}>{scheduleAnAppointment}</DarksideButton>
                    </StickyElementWrapper>
                  </div>

                  <div ref={appointmentEl} className="appointment">
                    <ProductAppointmentCTA withHiddenButton={true} productType={productType} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="page-row">
          <DiamondCfyGallery locale={locale} diamondType={diamondType} />
        </div>
      </StyledCFYResultPage>
    </>
  );
};

CFYResultPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYResultPageQueryParams>,
): Promise<GetServerSidePropsResult<CFYResultPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { query, locale } = context;

  const options = getCFYResultOptionsFromUrl(query || {});

  const globalQuery = queries.template.global(locale);

  const diamondCfyQuery = queries.diamondCfy.content(locale);

  const diamondTableQuery = queries.diamondTable.content(locale);

  const diamondCtoQuery = queries.diamondCto.content({ ...options });

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(globalQuery);

  await queryClient.prefetchQuery(diamondCfyQuery);

  await queryClient.prefetchQuery(diamondTableQuery);

  await queryClient.prefetchQuery(diamondCtoQuery);

  if (
    !queryClient.getQueryData(diamondCfyQuery.queryKey) ||
    !queryClient.getQueryData(diamondCtoQuery.queryKey) ||
    !queryClient.getQueryData(diamondTableQuery.queryKey)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      options,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { CFYResultPage, getServerSideProps as getServerSidePropsCFYResultPage };

export default CFYResultPage;

function getMedia({ product, diamondType, lotIdPicker, caption360 }) {
  return [
    <DiamondRough key={0} extraClass="media-content-item" withCaption={true} />,
    <DiamondPlan key={1} extraClass="media-content-item" diamondType={diamondType} withCaption={true} />,
    <Diamond360
      key={2}
      className="media-content-item"
      diamondType={diamondType}
      lotId={lotIdPicker}
      isCto={true}
      priority={true}
      width={500}
      height={500}
      caption={caption360}
    />,
    <DiamondHand key={3} className="media-content-item" diamond={product} priority={true} width={500} height={500} />,
  ];
}

function isValidForReturn(diamondType, caratWeight) {
  if (typeof diamondType !== 'string') {
    return;
  }

  if (typeof caratWeight !== 'number') {
    return;
  }

  const validDiamondTypes = [
    'round-brilliant',
    'oval',
    'emerald',
    'pear',
    'radiant',
    'cushion',
    'elongated-cushion',
    'trillion',
    'marquise',
    'asscher',
    'princess',
  ];

  const validCaratWeight = 5;

  return validDiamondTypes.includes(diamondType) && caratWeight <= validCaratWeight;
}

function getFormattedShipppingDate(locale, data, shippingText, countryCode) {
  const isUserInUs = countryCode === 'US';

  const defaultBusinessDaysCount = 20;

  const { cutForYouShippingBusinessDays = defaultBusinessDaysCount, cutForYouShippingBusinessDaysCountryMap = {} } =
    data || {};

  if (!isUserInUs && cutForYouShippingBusinessDaysCountryMap) {
    const localizedCutForYouShippingBusinessDays = cutForYouShippingBusinessDaysCountryMap[countryCode];

    // If a country specific buisness day is provided, then generate new shipping copy;
    if (localizedCutForYouShippingBusinessDays) {
      return getShipByDateCopy(localizedCutForYouShippingBusinessDays, shippingText, locale);
    }
  } else {
    // US override
    return getShipByDateCopy(cutForYouShippingBusinessDays, shippingText, locale);
  }
}

function getOverrides(href: string, classOverride?: string) {
  // Initialize the `props` object with the `href` value.
  const props: React.HTMLProps<HTMLAnchorElement> = { href };

  // If `classOverride` is provided, add it as a `className` property to `props`.
  if (classOverride !== undefined) {
    props.className = classOverride;
  }

  // Create an `overrides` object with an override for the `<a>` element.
  const overrides: { a: { component: string; props: React.HTMLProps<HTMLAnchorElement> } } = {
    a: {
      component: 'a',
      props,
    },
  };

  // Return the `overrides` object.
  return overrides;
}

function updateCheckboxSelection(value, checkboxArray) {
  const sortOrder = ['cut', 'color', 'clarity'];

  const array = checkboxArray.includes(value) ? checkboxArray.filter((v) => v !== value) : checkboxArray.concat(value);

  const sortedArray = array.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);

    const indexB = sortOrder.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;

    if (indexA !== -1) return -1;

    if (indexB !== -1) return 1;

    return 0;
  });

  return sortedArray;
}
