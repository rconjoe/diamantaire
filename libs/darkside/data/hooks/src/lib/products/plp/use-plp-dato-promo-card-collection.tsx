import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches plp collection card data from dato - client-side

type PlpDatoPromoCardCollectionProps = {
  plpPromoCardCollection: {
    id: string;
    data: {
      title: string;
      link: string;
      route: string;
      image: DatoImageType;
      plpPosition: number;
      plpPositionMobile: number;
    }[];
  };
};

export function usePlpDatoPromoCardCollection(
  locale: string,
  id: string,
): UseQueryResult<PlpDatoPromoCardCollectionProps, unknown> {
  return useQuery({
    ...queries.plp.promoCardCollection(locale, id),
  });
}

export default usePlpDatoPromoCardCollection;
