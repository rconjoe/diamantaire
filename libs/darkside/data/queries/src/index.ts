import { mergeQueryKeys, inferQueryKeys, inferQueryKeyStore } from '@lukemorales/query-key-factory';

import { diamonds } from './diamonds';
import { footer } from './footer';
import { header } from './header';
import { humanNameMappers } from './human-names-mapper';
import { journal } from './journal';
import { productPage } from './products';
import { showrooms } from './showrooms';
import { standardPage } from './standard-page';

export const queries = mergeQueryKeys(
  header,
  footer,
  standardPage,
  journal,
  productPage,
  showrooms,
  humanNameMappers,
  diamonds,
);

export type DiamondsKeys = inferQueryKeys<typeof diamonds>;
export type HeaderKeys = inferQueryKeys<typeof header>;
export type FooterKeys = inferQueryKeys<typeof footer>;
export type JournalKeys = inferQueryKeys<typeof journal>;
export type StandardPageKeys = inferQueryKeys<typeof standardPage>;
export type ProductPageKeys = inferQueryKeys<typeof productPage>;
export type ShowroomKeys = inferQueryKeys<typeof showrooms>;
export type HumanNameWrapperKeys = inferQueryKeys<typeof humanNameMappers>;
export type QueryKeys = inferQueryKeyStore<typeof queries>;
