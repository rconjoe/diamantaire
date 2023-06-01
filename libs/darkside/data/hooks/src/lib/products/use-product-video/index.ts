import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type ProductVideoProps = {
  diamondContentBlock: {
    id: string;
    _modelApiKey: string;
    videoBlock: {
      copy: string;
      title: string;
      videoSources: {
        url: string;
        alt: string;
      };
      thumbnail: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    };
  };
};

export function useProductVideo(id: string, locale: string): UseQueryResult<ProductVideoProps, unknown> {
  return useQuery({
    ...queries.products.productVideoBlock(id, locale),
  });
}

export default useProductVideo;
