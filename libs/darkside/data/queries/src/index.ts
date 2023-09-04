import { inferQueryKeyStore, inferQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import { cart } from './cart';
import { diamondCfy, diamondCto, diamondInfo, diamondPdp, diamondTable, diamonds, infiniteDiamonds } from './diamonds';
import { footer } from './footer';
import { header } from './header';
import { humanNameMappers } from './human-names-mapper';
import { journal } from './journal';
import { plpListPage, productPage } from './products';
import { showrooms } from './showrooms';
import { standardPage } from './standard-page';

export const queries = mergeQueryKeys(
  header,
  footer,
  standardPage,
  journal,
  productPage,
  plpListPage,
  showrooms,
  humanNameMappers,
  diamonds,
  infiniteDiamonds,
  diamondCto,
  diamondCfy,
  diamondPdp,
  diamondInfo,
  diamondTable,
  cart,
);

export type DiamondCtoKeys = inferQueryKeys<typeof diamondCto>;
export type InfiniteDiamondsKeys = inferQueryKeys<typeof infiniteDiamonds>;
export type DiamondsKeys = inferQueryKeys<typeof diamonds>;
export type DiamondPdpKeys = inferQueryKeys<typeof diamondPdp>;
export type DiamondInfoKeys = inferQueryKeys<typeof diamondInfo>;
export type DiamondTableKeys = inferQueryKeys<typeof diamondTable>;
export type HeaderKeys = inferQueryKeys<typeof header>;
export type FooterKeys = inferQueryKeys<typeof footer>;
export type JournalKeys = inferQueryKeys<typeof journal>;
export type CartKeys = inferQueryKeys<typeof cart>;
export type StandardPageKeys = inferQueryKeys<typeof standardPage>;
export type ProductPageKeys = inferQueryKeys<typeof productPage>;
export type PLPPageKeys = inferQueryKeys<typeof plpListPage>;
export type ShowroomKeys = inferQueryKeys<typeof showrooms>;
export type HumanNameWrapperKeys = inferQueryKeys<typeof humanNameMappers>;
export type QueryKeys = inferQueryKeyStore<typeof queries>;
