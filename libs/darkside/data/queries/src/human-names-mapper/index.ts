import { fetchHumanMapperData, fetchSingleHumanNameMapper } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const humanNameMappers = createQueryKeys('human-name-mappers', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchHumanMapperData(locale),
  }),
  single: (locale: string, title: string) => ({
    queryKey: [locale, title],
    queryFn: () => fetchSingleHumanNameMapper(locale, title),
  }),
});
