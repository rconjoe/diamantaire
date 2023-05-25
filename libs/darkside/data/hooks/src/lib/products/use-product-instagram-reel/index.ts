import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type InstagramReelProps = {
  instagramReelBlock: {
    id: string;
    content: {
      title: string;
      subtitle: string;
      headingType: string;
      headingAdditionalClass: string;
      blocks: {
        id: string;
        image: {
          url: string;
          alt: string;
          responsiveImage: DatoImageType;
        };
        postLink: string;
        productLink: string;
        shouldLinkToVraiInstagram: boolean;
      }[];
    };
  };
};

export function useProductInstagramReel(id: string, locale: string): UseQueryResult<InstagramReelProps, unknown> {
  return useQuery({
    ...queries.products.productInstagramReel(id, locale),
  });
}

export default useProductInstagramReel;
