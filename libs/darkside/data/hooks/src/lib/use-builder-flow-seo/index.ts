import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type BuilderFlowSeoProps = {
  builderFlow: {
    id: string;
    seoFields: {
      seoTitle: string;
      seoDescription: string;
      addNoindexNofollow: boolean;
    };
  };
};

export function useBuilderFlowSeo(locale: string): UseQueryResult<BuilderFlowSeoProps, unknown> {
  return useQuery({
    ...queries['builder-flow'].seo(locale),
  });
}

export default useBuilderFlowSeo;
