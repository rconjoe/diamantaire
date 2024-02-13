import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type HumanNameMapperProps = {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
      value: string;
    };
  };
};

export function useHumanNameMapper(locale: string): UseQueryResult<HumanNameMapperProps, unknown> {
  return useQuery({
    ...queries['human-name-mappers'].content(locale),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export default useHumanNameMapper;
