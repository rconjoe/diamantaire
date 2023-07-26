import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches all the server-side dato data for a plp

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
    };
    breadcrumb: {
      id: string;
      name: string;
      link: {
        slug: string;
      };
    }[];
    hero: {
      title: string;
      copy: string;
      desktopImage: DatoImageType;
      textColor: {
        hex: string;
      };
    };
    creativeBlocks: {
      id: string;
    }[];
    promoCardCollection: {
      id: string;
    };
  };
};

export function usePlpDatoServerside(locale: string, slug: string): UseQueryResult<PlpDatoServersideProps, unknown> {
  return useQuery({
    ...queries.plp.serverSideDato(locale, slug),
  });
}

export default usePlpDatoServerside;
