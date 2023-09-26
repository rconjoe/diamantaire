import { ParsedUrlQuery } from 'querystring';

import {
  DarksideButton,
  Heading,
  HideTopBar,
  Markdown,
  StickyElementWrapper,
  SwiperCustomPagination,
  SwiperStyles,
} from '@diamantaire/darkside/components/common-ui';
import { Diamond360, DiamondCfyAccordion, DiamondCfyGallery, DiamondHand } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondCfyData, useDiamondCtoData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { POPULAR_CFY_DIAMOND_TYPES, getCurrencyFromLocale } from '@diamantaire/shared/constants';
import { getCFYResultOptionsFromUrl, getCountry, getDiamondType, makeCurrency } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import Script from 'next/script';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  currencyCode: string;
  options?: CFYResultPageQueryParams;
}

const CFYResultPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, currencyCode, options = {} } = props;

  const { isMobile } = useContext(GlobalContext);

  const { data: { ctoDiamondTable: diamondCfyData } = {} } = useDiamondCfyData(locale);

  const {
    ctoDiamondResultFoundTitle,
    ctoDiamondResultFinalSaleNote,
    ctoDiamondResultNote,
    productIconList,
    ctoDiamondResultNeedItFaster,
    ctoDiamondResultShapeAndWeightTitle,
  } = diamondCfyData;

  const { title: seoTitle = '', description: seoDesc = '' } = diamondCfyData?.seo || {};

  const diamondCtoData = useDiamondCtoData(options)?.data;

  const defaultProduct = diamondCtoData['diamond'];

  const [display, setDisplay] = useState('diamond');

  const [product, setProduct] = useState(defaultProduct);

  const { diamondType, carat, price } = product;

  const formattedPrice = makeCurrency(price, locale, currencyCode);

  const { items: productIconListItems } = productIconList;

  const productIconListItem = productIconListItems?.[0] || {};

  const { cutForYouShippingBusinessDays } = productIconListItem;

  const formattedDate = getFormattedShipppingDate(locale, cutForYouShippingBusinessDays);

  const shouldRenderReturnPolicy = !isValidForReturn(diamondType, Number(carat));

  const swiperRef = useRef(null);

  const lotIdPicker = `cfy-${diamondType}`;

  const media = getMedia({ product, diamondType, lotIdPicker });

  const thumb = getThumb({ product, diamondType, lotIdPicker });

  const slides = media.map((mediaComponent, index) => <SwiperSlide key={`media${index}`}>{mediaComponent}</SwiperSlide>);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleUpgradeClick = (type: string) => {
    // display:  diamond, diamondCutUpgrade, diamondColorUpgrade
    // type: diamondCutUpgrade, diamondColorUpgrade

    if (type === `diamondCutUpgrade`) {
      if (display === `diamondCutUpgrade`) {
        setDisplay('diamond');
      } else {
        setDisplay('diamondCutUpgrade');
      }
    }

    if (type === `diamondColorUpgrade`) {
      if (display === `diamondColorUpgrade`) {
        setDisplay('diamond');
      } else {
        setDisplay('diamondColorUpgrade');
      }
    }

    return;
  };

  const diamondTypeTitle = getDiamondType(product?.diamondType)?.title || '';
  const caratValue = product?.carat?.toFixed(1) || '';
  const pageTitle = `${ctoDiamondResultShapeAndWeightTitle
    .replace('%%diamond_shape%%', diamondTypeTitle)
    .replace('%%diamond_carat%%', caratValue)}`;

  const [loadPagination, setLoadPagination] = useState(0);

  const isStandardShape = POPULAR_CFY_DIAMOND_TYPES.includes(diamondType);
  const diamondTableInventoryLink = `/diamonds/inventory/` + (isStandardShape ? diamondType : '');

  useEffect(() => {
    setProduct(diamondCtoData[display]);
  }, [display]);

  useEffect(() => {
    setTimeout(() => setLoadPagination(loadPagination + 1), 100);

    if (diamondCtoData['diamondColorUpgrade']) {
      setDisplay('diamondColorUpgrade');
    }
  }, []);

  return (
    <>
      <HideTopBar />

      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <StandardPageSeo title={seoTitle} description={seoDesc} />

      <StyledCFYResultPage className="container-wrapper">
        <div className="page-row">
          {isMobile && (
            <div className="page-head">
              <div className="title">
                <Heading>{ctoDiamondResultFoundTitle}</Heading>
              </div>
            </div>
          )}

          <div className="page-content">
            <div className="media">
              {diamondCtoData && (
                <SwiperStyles>
                  <Swiper
                    onSlideChange={(swiper) => {
                      setActiveSlideIndex(swiper.activeIndex);
                    }}
                    onSwiper={(swiper) => {
                      return (swiperRef.current = swiper);
                    }}
                    lazy={{ loadPrevNext: true }}
                    modules={[Pagination]}
                    className="carousel"
                  >
                    {slides}

                    <SwiperCustomPagination
                      reload={loadPagination}
                      swiper={swiperRef.current}
                      activeIndex={activeSlideIndex}
                      thumb={thumb}
                    />
                  </Swiper>
                </SwiperStyles>
              )}
            </div>
          </div>

          <div className="page-aside">
            <div className="inner">
              {!isMobile && (
                <div className="title">
                  <Heading>{ctoDiamondResultFoundTitle}</Heading>
                </div>
              )}
              <div className="subtitle">
                <p>{pageTitle}</p>
              </div>
              <div className="primary-price">
                <p>{formattedPrice}</p>
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

  const currencyCode = getCurrencyFromLocale(locale);

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
      currencyCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { CFYResultPage, getServerSideProps as getServerSidePropsCFYResultPage };

export default CFYResultPage;

function getMedia({ product, diamondType, lotIdPicker }) {
  return [
    <Diamond360 key={0} className="media-content-item" diamondType={diamondType} lotId={lotIdPicker} isCto={true} />,
    <DiamondHand className="media-content-item" diamondType={diamondType} product={product} lotId={lotIdPicker} key={1} />,
  ];
}

function getThumb({ product, diamondType, lotIdPicker }) {
  return [
    <Diamond360
      key={0}
      className="media-content-item diamond36"
      diamondType={diamondType}
      lotId={lotIdPicker}
      useImageOnly={true}
    />,
    <DiamondHand
      key={1}
      className="media-content-item"
      diamondType={diamondType}
      product={product}
      lotId={lotIdPicker}
      isThumb={true}
    />,
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

function getFormattedShipppingDate(locale, days = 21) {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + days);

  const formattedDate = currentDate.toLocaleDateString(locale, {
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
