import { ParsedUrlQuery } from 'querystring';

import {
  DarksideButton,
  Heading,
  HideTopBar,
  Markdown,
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
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import {
  humanNamesMapperType,
  useDiamondCfyData,
  useDiamondCtoData,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { POPULAR_CFY_DIAMOND_TYPES, getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getCFYResultOptionsFromUrl, getDiamondType, getShipByDateCopy } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { StyledCFYResultPage } from './CFYResultPage.style';

interface CFYResultPageQueryParams extends ParsedUrlQuery {
  carat?: string;
  diamondType?: string;
  product?: string;
}

interface CFYResultPageProps {
  dehydratedState: DehydratedState;
  locale: string;
  countryCode: string;
  options?: CFYResultPageQueryParams;
}

const CFYResultPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, countryCode, options = {} } = props;

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
  } = diamondCfyData;

  const { title: seoTitle = '', description: seoDesc = '' } = diamondCfyData?.seo || {};

  const { _t } = useTranslations(locale, [humanNamesMapperType.DIAMOND_SHAPES]);

  const diamondCtoData = useDiamondCtoData(options)?.data;

  const defaultProduct = diamondCtoData['diamond'];

  const [checkbox, setCheckbox] = useState([]);

  const [display, setDisplay] = useState('diamond');

  const [product, setProduct] = useState(defaultProduct);

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
    let checkboxArray = [...checkbox];

    let selectedDisplay = 'diamond';

    const upgradeTypes = ['cut', 'color', 'clarity'];

    upgradeTypes.forEach((upgradeType) => {
      if (type === `diamond${capitalizeFirstLetter(upgradeType)}Upgrade`) {
        checkboxArray = updateCheckboxSelection(upgradeType, checkboxArray);
        selectedDisplay = checkboxArray.includes(upgradeType)
          ? `diamond${capitalizeFirstLetter(upgradeType)}Upgrade`
          : 'diamond';
      }
    });

    const combinations = ['cut', 'color', 'clarity'];

    combinations.forEach((combo) => {
      if (combinations.every((item) => checkboxArray.includes(item))) {
        selectedDisplay = `diamond${combo.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}And${capitalizeFirstLetter(
          combo,
        )}Upgrade`;
      }
    });

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

  const isStandardShape = POPULAR_CFY_DIAMOND_TYPES.includes(diamondType);

  const diamondTableInventoryLink = `/diamonds/inventory/` + (isStandardShape ? diamondType : '');

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

  return (
    <>
      <HideTopBar />

      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <StandardPageSeo title={seoTitle} description={seoDesc} />

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

                {getIsUserInEu() && (
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
                  product={product}
                  display={display}
                  locale={locale}
                />
              </div>

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
                  <DarksideButton>
                    <UIString>Select and add a setting</UIString>
                  </DarksideButton>
                </StickyElementWrapper>

                <DarksideButton type="outline">
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

  const { geo } = context.req.cookies;

  const geoCookieData = JSON.parse(geo);

  const countryCode = geoCookieData?.country || 'US';

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
      locale,
      options,
      countryCode,
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateCheckboxSelection(value, checkboxArray) {
  return checkboxArray.includes(value) ? checkboxArray.filter((v) => v !== value) : checkboxArray.concat(value);
}
