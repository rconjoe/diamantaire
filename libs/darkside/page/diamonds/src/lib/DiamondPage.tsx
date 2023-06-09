import { ParsedUrlQuery } from 'querystring';

import { DiamondTable, DiamondFilter } from '@diamantaire/darkside/components/diamonds-table';
import { useDiamondsData, OptionsDataTypes } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_TABLE_DEFAULT_OPTIONS, DIAMOND_TABLE_FACETED_NAV } from '@diamantaire/shared/constants';
import { getDiamondsOptionsFromUrl, getDiamondsOptionsRoute } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const DiamondPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { locale, currencyCode, countryCode } = props;
  const [options, setOptions] = useState(props.options);
  const [loading, setLoading] = useState(true);
  const query = useDiamondsData({ ...options });
  const {
    data: { diamonds, pagination, ranges },
  } = query;
  const updateLoading = (newState) => {
    setLoading(newState);
  };
  const updateOptions = (newOptions) => {
    const keys = Object.keys(newOptions);

    keys.forEach((key) => {
      if (DIAMOND_TABLE_FACETED_NAV.includes(key)) {
        if (options[key] && options[key] === newOptions[key]) {
          delete options[key];
          delete newOptions[key];
        }
      }
    });

    setOptions({ ...options, ...newOptions });
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
    router.push(getDiamondsOptionsRoute(options), undefined, { shallow: true });
    window.scrollTo(0, 0);
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
    countryCode,
    locale,
  };

  return (
    <StyledDiamondPage className="container-emotion">
      <DiamondFilter
        handleRadioFilterChange={handleRadioFilterChange}
        handleSliderFilterChange={handleSliderFilterChange}
        loading={loading}
        options={options}
        ranges={ranges}
        locale={locale}
        countryCode={countryCode}
        currencyCode={currencyCode}
      />

      <DiamondTable {...tableProps} />
    </StyledDiamondPage>
  );
};

DiamondPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<DiamondPageQueryParams>,
): Promise<GetServerSidePropsResult<DiamondPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const locale = 'en_US';
  const countryCode = 'US';
  const currencyCode = 'USD';
  const { query } = context;
  const options = getDiamondsOptionsFromUrl(query || {});
  const dataQuery = queries.diamonds.content(options);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(dataQuery);

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
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

export { DiamondPage, getServerSideProps };

export default DiamondPage;
