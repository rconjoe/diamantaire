import { mergeQueryKeys, inferQueryKeys, inferQueryKeyStore } from '@lukemorales/query-key-factory';

import { footer } from './footer';
import { header } from './header';
import { journal } from './journal';
import { productPage } from './products';
import { standardPage } from './standard-page';

export const queries = mergeQueryKeys(header, footer, standardPage, journal, productPage);

export type HeaderKeys = inferQueryKeys<typeof header>;
export type FooterKeys = inferQueryKeys<typeof footer>;
export type JournalKeys = inferQueryKeys<typeof journal>;
export type StandardPageKeys = inferQueryKeys<typeof standardPage>;
export type ProductPageKeys = inferQueryKeys<typeof productPage>;
export type QueryKeys = inferQueryKeyStore<typeof queries>;
