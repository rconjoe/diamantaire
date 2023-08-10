import { ParsedUrlQuery } from 'querystring';

import { Heading, ShowTabletAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import { DiamondTable, DiamondFilter, DiamondPromo } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondTableData, useDiamondsData, OptionsDataTypes } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import {
  DIAMOND_TABLE_DEFAULT_OPTIONS,
  DIAMOND_TABLE_FACETED_NAV,
  getCurrencyFromLocale,
} from '@diamantaire/shared/constants';
import { getDiamondOptionsFromUrl, getDiamondShallowRoute, getDiamondType } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState, useEffect, useContext } from 'react';

import { StyledDiamondPage } from './DiamondPage.style';

interface DiamondPageQueryParams extends ParsedUrlQuery {
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
  priceMax?: string;
  priceMin?: string;
  caratMax?: string;
  caratMin?: string;
}

interface DiamondPageProps {
  locale: string;
  options: OptionsDataTypes;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const DiamondPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { isMobile } = useContext(GlobalContext);
  const { locale, currencyCode } = props;
  const [options, setOptions] = useState(props.options);
  const [loading, setLoading] = useState(true);

  const {
    data: { diamonds, pagination, ranges },
  } = useDiamondsData({ ...options });

  const DiamondTableContent = useDiamondTableData(locale);

  const title = DiamondTableContent.data.diamondTable.title;
  const seo = DiamondTableContent.data.diamondTable.seo;
  const { seoTitle, seoDescription } = seo || {};
  const diamondTypeTitle = (options?.diamondType && getDiamondType(options?.diamondType).title) || '';
  const pageSeoTitle = seoTitle.replace(/%%(.*?)%%/g, diamondTypeTitle);

  const updateLoading = (newState) => {
    setLoading(newState);
  };
  const updateOptions = (newOptions) => {
    setOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions, ...newOptions };
      const keys = Object.keys(updatedOptions);

      keys.forEach((key) => {
        if (DIAMOND_TABLE_FACETED_NAV.includes(key)) {
          if (prevOptions[key] && prevOptions[key] === newOptions[key]) {
            delete updatedOptions[key];
          }
        }
      });

      return updatedOptions;
    });
  };
  const clearOptions = () => {
    setOptions(DIAMOND_TABLE_DEFAULT_OPTIONS);
  };
  const handleRadioFilterChange = (type: string, values: string[]) => {
    updateOptions({ [type]: values.join() });
  };
  const handleSliderFilterChange = (type: string, values: number[]) => {
    if (type === 'carat') {
      updateOptions({ caratMin: parseFloat(values[0].toFixed(2)), caratMax: parseFloat(values[1].toFixed(2)) });
    }

    if (type === 'price') {
      updateOptions({ priceMin: values[0], priceMax: values[1] });
    }
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('RESET_TABLE_PAGINATION'));
  }, [pagination?.pageCount, options.sortBy, options.sortOrder]);

  useEffect(() => {
    router.push(getDiamondShallowRoute(options), undefined, { shallow: true });

    // window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const tableProps = {
    initialDiamonds: diamonds,
    initialOptions: options,
    initialPagination: pagination,
    updateOptions,
    updateLoading,
    clearOptions,
    currencyCode,
    locale,
  };

  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <StandardPageSeo title={pageSeoTitle} description={seoDescription} />

      <StyledDiamondPage className="container-wrapper">
        {isMobile && (
          <div className="page-title">
            <Heading className="title">{title}</Heading>
          </div>
        )}

        <div className="page-aside">
          <DiamondFilter
            handleRadioFilterChange={handleRadioFilterChange}
            handleSliderFilterChange={handleSliderFilterChange}
            loading={loading}
            options={options}
            ranges={ranges}
            locale={locale}
            currencyCode={currencyCode}
          />

          <ShowTabletAndUpOnly>
            <DiamondPromo locale={locale} />
          </ShowTabletAndUpOnly>
        </div>

        <div className="page-main">
          {!isMobile && (
            <div className="page-title">
              <Heading className="title">{title}</Heading>
            </div>
          )}

          <DiamondTable {...tableProps} title={title} />
        </div>

        <ShowMobileOnly>
          <DiamondPromo locale={locale} />
        </ShowMobileOnly>
      </StyledDiamondPage>
    </>
  );
};

DiamondPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<DiamondPageQueryParams>,
): Promise<GetServerSidePropsResult<DiamondPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale, query } = context;
  const currencyCode = getCurrencyFromLocale(locale);

  const options = getDiamondOptionsFromUrl(query || {}, 'diamondTable');

  const diamondQuery = queries.diamonds.content(options);
  const diamondTableQuery = queries.diamondTable.content(locale);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(diamondQuery);
  await queryClient.prefetchQuery(diamondTableQuery);

  if (!queryClient.getQueryData(diamondQuery.queryKey) || !queryClient.getQueryData(diamondTableQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      locale,
      options,
      currencyCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { DiamondPage, getServerSideProps as getServerSidePropsDiamondPage };

export default DiamondPage;
