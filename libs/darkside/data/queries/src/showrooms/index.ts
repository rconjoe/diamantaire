import { fetchShowroomNav } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const showrooms = createQueryKeys('showrooms', {
  nav: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchShowroomNav(locale),
  }),
});
