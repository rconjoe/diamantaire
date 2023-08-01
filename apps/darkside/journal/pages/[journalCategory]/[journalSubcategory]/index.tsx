import { getAllJournalSubCategories } from '@diamantaire/darkside/data/api';
import { queries } from '@diamantaire/darkside/data/queries';
import { JournalSubCategoryEntry } from '@diamantaire/darkside/page/journal';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default JournalSubCategoryEntry;

export async function getStaticPaths() {
  const paths = await getAllJournalSubCategories();
  const updatedPaths = paths.map((path) => {
    const newPath = path.route.replace('https://www.vrai.com/journal', '');

    return newPath;
  });

  return {
    paths: updatedPaths,
    fallback: false,
  };
}

interface BlogConfiguration {
  categoriesToDisplay: {
    key: string;
    id: string;
    subcategories: {
      key: string;
      id: string;
    }[];
  }[];
}

export async function getStaticProps({
  locale,
  params,
}: {
  locale: string;
  params: {
    journalSubcategory: string;
    journalCategory: string;
  };
}) {
  const queryClient = new QueryClient();

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
  } = queryClient.getQueryData(configQueryParams.queryKey);

  const { categoriesToDisplay } = blogConfiguration;

  const parentCategory = categoriesToDisplay?.filter((cat) => cat.key === params.journalCategory)?.[0];
  const subCategory = parentCategory.subcategories?.filter((subcat) => subcat.key === params.journalSubcategory)?.[0];

  const subcatQueryParams = {
    ...queries.journal.journalsBySubcategory(locale, parentCategory.id, subCategory.id, 3, 0),
  };

  await queryClient.prefetchInfiniteQuery({
    ...subcatQueryParams,
  });

  await queryClient.prefetchQuery({
    ...queries.journal.journalHeader(locale),
  });

  return {
    props: {
      slug: params.journalSubcategory,
      parentCategorySlug: params.journalCategory,
      isSubCategory: true,
      locale,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
