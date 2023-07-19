import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type JournalConfigProps = {
  blogConfiguration: {
    title: string;
    postsPerPage: number;
    latestStoriesTitle: string;
    blogHomeSeoTitle?: string;
    blogHomeSeoDescription?: string;
    categoriesToDisplay: {
      id: string;
      key: string;
      route: string;
      copy: string;
      seoTitle: string;
      seoDescription: string;
      subcategories: {
        copy: string;
        id: string;
        key: string;
        route: string;
        seoTitle: string;
        seoDescription: string;
      }[];
    }[];
    heroPost: {
      id: string;
      title: string;
      author: string;
      slug: string;
      excerpt: string;
      seoDescription: string;
      seoTitle: string;
      _publishedAt: string;
      _updatedAt: string;
      sortByDate: string;
      featuredImage: DatoImageType;
    };
  };
};

export function useJournalConfig(locale: string): UseQueryResult<JournalConfigProps, unknown> {
  return useQuery({
    ...queries.journal.config(locale),
  });
}

export default useJournalConfig;
