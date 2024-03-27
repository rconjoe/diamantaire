import { getAllJournalCategories } from '@diamantaire/darkside/data/api';
import { queries } from '@diamantaire/darkside/data/queries';
import { JournalCategoryEntry } from '@diamantaire/darkside/page/journal';
import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default JournalCategoryEntry;

export async function getStaticPaths() {
  let slugs = await getAllJournalCategories();

  const includedLocales = ['en-US'];

  slugs = slugs.map((path) => path.replace('https://www.vrai.com/journal/', ''));
  slugs = slugs.filter((path) => !path.includes('in-the-media') && !path.includes('test-category'));

  const paths = slugs.flatMap((slug) => {
    return includedLocales.map((locale) => ({ locale, params: { journalCategory: slug } }));
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params,
  locale,
}: {
  locale: string;
  params: {
    journalCategory: string;
  };
}) {
  interface BlogConfiguration {
    categoriesToDisplay: {
      key: string;
      id: string;
    }[];
  }

  const isMobile = false;
  // geo -dev

  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);

  const queryClient = new QueryClient();

  // Header + Footer
  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(locale),
  });

  const configQueryParams = {
    ...queries.journal.config(locale),
  };

  await queryClient.prefetchQuery({ ...configQueryParams });

  const {
    blogConfiguration,
  }: {
    blogConfiguration: BlogConfiguration;
  } = await queryClient.getQueryData(configQueryParams.queryKey);

  const { categoriesToDisplay } = blogConfiguration;

  const activeCategory = categoriesToDisplay?.filter((cat) => cat.key === params.journalCategory)?.[0];
  const catId = activeCategory?.id;

  if (!catId) {
    return {
      notFound: true,
    };
  }

  const catQueryParams = {
    ...queries.journal.journalsByCategory(locale, catId, 3, 0),
  };

  await queryClient.prefetchInfiniteQuery({
    ...catQueryParams,
  });

  return {
    props: {
      slug: params.journalCategory,
      parentCategorySlug: params.journalCategory,
      isMobile,
      isSubCategory: false,
      currencyCode,
      countryCode,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
