import { ParsedUrlQuery } from 'querystring';

import { DarksideButton, Heading, ShowMobileOnly, ShowTabletAndUpOnly } from '@diamantaire/darkside/components/common-ui';
import { DiamondFilter, DiamondPromo, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { UIString } from '@diamantaire/darkside/core';
import { OptionsDataTypes, useDiamondTableData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_TABLE_DEFAULT_OPTIONS, getCurrencyFromLocale } from '@diamantaire/shared/constants';
import { getDiamondOptionsFromUrl, getDiamondShallowRoute, getDiamondType } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useContext, useEffect, useState } from 'react';

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

  const { title: pageTitle, dynamicTitle } = DiamondTableContent.data.diamondTable || {};

  const seo = DiamondTableContent.data.diamondTable.seo;
  const { seoTitle, seoDescription } = seo || {};
  const diamondTypeTitle = (options?.diamondType && getDiamondType(options?.diamondType).title) || '';
  const pageSeoTitle = seoTitle.replace(/%%(.*?)%%/g, diamondTypeTitle);
  const pageDynamicTitle = dynamicTitle.replace(/%%(.*?)%%/g, diamondTypeTitle);

  const updateLoading = (newState) => {
    setLoading(newState);
  };

  const updateOptions = (newOptions) => {
    setOptions((prevOptions) => {
      let updatedOptions = { ...prevOptions };

      const key = Object.keys(newOptions).pop();

      if (key === 'diamondType') {
        updatedOptions = { ...prevOptions, ...newOptions };

        if (prevOptions[key] && prevOptions[key] === newOptions[key]) {
          delete updatedOptions[key];
        }
      } else if (key === 'cut') {
        const oldOptionsArray = prevOptions[key]?.split(',') || [];
        const newOption = newOptions[key];

        if (oldOptionsArray.includes(newOption)) {
          updatedOptions[key] = oldOptionsArray.filter((v) => v !== newOption).join(',');
        } else {
          oldOptionsArray.push(newOption);
          updatedOptions[key] = oldOptionsArray.join(',');
        }

        if (!updatedOptions[key]) {
          delete updatedOptions[key];
        }
      } else if (key === 'color' || key === 'clarity') {
        let oldOptionsArray = prevOptions[key]?.split(',') || []; // [D,E,F,G,H,I]
        const newOptionsArray = newOptions[key].split(','); // [D,E,F]

        newOptionsArray.forEach((newOption) => {
          if (oldOptionsArray.includes(newOption)) {
            oldOptionsArray = oldOptionsArray.filter((v) => v !== newOption);
          } else {
            oldOptionsArray.push(newOption);
          }
          updatedOptions[key] = oldOptionsArray.join(',');
        });

        if (!updatedOptions[key]) {
          delete updatedOptions[key];
        }
      } else {
        updatedOptions = { ...prevOptions, ...newOptions };
      }

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
    ranges:
      (options.caratMin && options.caratMax && { ...ranges, carat: { min: options.caratMin, max: options.caratMax } }) ||
      ranges,
    locale,
  };

  const title = (
    <div className="page-title">
      <Heading className="title">{options?.diamondType ? pageDynamicTitle : pageTitle}</Heading>
    </div>
  );

  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <StandardPageSeo title={pageSeoTitle} description={seoDescription} />

      <StyledDiamondPage className="container-wrapper">
        {isMobile && title}

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

          {isMobile && (
            <DarksideButton type="underline" colorTheme="teal" className="vo-filter-clear-button" onClick={clearOptions}>
              <UIString>Clear filters</UIString>
            </DarksideButton>
          )}

          <ShowTabletAndUpOnly>
            <DiamondPromo locale={locale} />
          </ShowTabletAndUpOnly>
        </div>

        <div className="page-main">
          {!isMobile && title}

          <DiamondTable {...tableProps} />
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
