import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type ProductVideoProps = {
  diamondContentBlock: {
    id: string;
    _modelApiKey: string;
    videoBlock: {
      copy: string;
      title: string;
      video: {
        video: {
          streamingUrl: string;
          thumbnailUrl: string;
        };
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
