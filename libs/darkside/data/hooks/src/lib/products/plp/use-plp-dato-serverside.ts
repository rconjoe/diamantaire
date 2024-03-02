import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches all the server-side dato data for a plp

// duplicate definition
type PlpBasicFieldSortOption = {
  id: string;
  label: string;
  field: string;
  isDescendingOrder: boolean;
};

type PlpDatoServersideProps = {
  listPage: {
    id: string;
    seo: {
      id: string;
      seoTitle: string;
      seoDescription: string;
      _seoMetaTags: {
        attributes: string;
        content: string;
      };
      canonicalOverride: string;
    };

    breadcrumb: {
      id: string;
      name: string;
      link: {
        slug: string;
        category: string;
        slugNew: string;
      };
    }[];
    showHeroWithBanner: boolean;
    subcategoryFilter: {
      data: {
        title: string;
        image: {
          responsiveImage: DatoImageType;
        };
        slug: string;
        link: string;
      }[];
    }[];
    hero: {
      title: string;
      copy: string;
      desktopImage: DatoImageType;
      mobileImage: DatoImageType;
      textColor: {
        hex: string;
      };
    };
    sortOptions?: PlpBasicFieldSortOption[];
    filterOptions: {
      filterLabel: string;
      filterValue: string;
    }[];
    creativeBlocks: {
      id: string;
    }[];
    promoCardCollection: {
      id: string;
    };
  };
};

export function usePlpDatoServerside(
  locale: string,
  slug: string,
  category: string,
): UseQueryResult<PlpDatoServersideProps, unknown> {
  return useQuery({
    ...queries.plp.serverSideDato(locale, slug, category),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export default usePlpDatoServerside;
