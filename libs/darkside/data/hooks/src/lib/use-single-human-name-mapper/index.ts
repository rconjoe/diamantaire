import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type SingleHumanNameMapperProps = {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
      value: string;
    };
  };
};

export function useSingleHumanNameMapper(
  locale: string,
  title: string,
): UseQueryResult<SingleHumanNameMapperProps, unknown> {
  return useQuery({
    ...queries['human-name-mappers'].single(locale, title),
  });
}

export default useSingleHumanNameMapper;
