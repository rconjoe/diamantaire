import { ParsedUrlQuery } from 'querystring';

import {
  DarksideButton,
  Heading,
  HideTopBar,
  Markdown,
  StickyElementWrapper,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import { Diamond360, DiamondCfyAccordion, DiamondCfyGallery, DiamondHand } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondCfyData, useDiamondCtoData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { POPULAR_CFY_DIAMOND_TYPES, getFormattedCarat, getFormattedPrice } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getCFYResultOptionsFromUrl, getCountry, getDiamondType } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import clsx from 'clsx';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import Script from 'next/script';
import { useContext, useEffect, useState } from 'react';

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
  const { locale, options = {} } = props;

  const { isMobile } = useContext(GlobalContext);

  const { data: { ctoDiamondTable: diamondCfyData } = {} } = useDiamondCfyData(locale);

  const {
    ctoDiamondResultFoundTitle,
    ctoDiamondResultFinalSaleNote,
    ctoDiamondResultNote,
    ctoDiamondResultNeedItFaster,
    ctoDiamondResultShapeAndWeightTitle,
  } = diamondCfyData;

  const { title: seoTitle = '', description: seoDesc = '' } = diamondCfyData?.seo || {};

  const { _t } = useTranslations(locale);

  const diamondCtoData = useDiamondCtoData(options)?.data;

  const defaultProduct = diamondCtoData['diamond'];

  const [checkbox, setCheckbox] = useState([]);

  const [display, setDisplay] = useState('diamond');

  const [product, setProduct] = useState(defaultProduct);

  const { diamondType, carat, price } = product;

  const formattedPrice = getFormattedPrice(price, locale);

  const formattedDate = getFormattedShipppingDate(locale);

  const shouldRenderReturnPolicy = !isValidForReturn(diamondType, Number(carat));

  const lotIdPicker = `cfy-${diamondType}`;

  const media = getMedia({ product, diamondType, lotIdPicker });

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

  useEffect(() => {
    setProduct(diamondCtoData[display]);
  }, [display]);

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);
  }, []);

  const sliderOptions: EmblaOptionsType = {
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
            {isMobile && (
              <div className="title">
                <Heading>{ctoDiamondResultFoundTitle}</Heading>
              </div>
            )}
          </div>

          <div className="page-content">
            <div className="media">
              {diamondCtoData && (
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container carousel">{slides}</div>

                  <div className="pagination">
                    <ul>
                      <li>
                        <button
                          className={clsx({
                            active: activeSlideIndex === 0,
                          })}
                          onClick={() => emblaApi?.scrollTo(0)}
                        >
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
                        <button
                          className={clsx({
                            active: activeSlideIndex === 1,
                          })}
                          onClick={() => emblaApi?.scrollTo(1)}
                        >
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
            {isMobile && <WishlistLikeButton extraClass="cfy" productId={`cfy-${product.lotId}`} />}
          </div>

          <div className="page-aside">
            <div className="inner">
              <div className="title desktop-only">
                {!isMobile && (
                  <>
                    <Heading>{ctoDiamondResultFoundTitle}</Heading>
                    <WishlistLikeButton extraClass="cfy" productId={`cfy-${product.lotId}`} />
                  </>
                )}
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
                <p>
                  <UIString>Ships by</UIString> {formattedDate}
                </p>
              </div>

              <div className="policy">
                {shouldRenderReturnPolicy ? (
                  <Markdown>{ctoDiamondResultFinalSaleNote || ''}</Markdown>
                ) : (
                  <Markdown>{ctoDiamondResultNote || ''}</Markdown>
                )}
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

  const countryCode = getCountry(locale);

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

function getMedia({ product, diamondType, lotIdPicker }) {
  return [
    <Diamond360
      key={0}
      className="media-content-item"
      diamondType={diamondType}
      lotId={lotIdPicker}
      isCto={true}
      priority={true}
      width={500}
      height={500}
    />,
    <DiamondHand className="media-content-item" diamond={product} key={1} priority={true} width={500} height={500} />,
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

function getFormattedShipppingDate(locale) {
  const result = new Date();
  let days = 20;

  while (days > 0) {
    result.setDate(result.getDate() + 1); // Move to the next day

    // Check if the current day is not a Saturday (6) or Sunday (0)
    if (result.getDay() !== 6 && result.getDay() !== 0) {
      days--; // Subtract a day if it's a business day
    }
  }

  const formattedDate = result.toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate.replace(',', '');
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
