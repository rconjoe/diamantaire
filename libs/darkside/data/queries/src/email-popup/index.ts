import { fetchEmailPopupData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const emailPopup = createQueryKeys('emailPopup', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchEmailPopupData(locale),
  }),
});
