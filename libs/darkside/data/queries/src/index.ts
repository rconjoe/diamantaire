import { inferQueryKeyStore, inferQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';

import { cart } from './cart';
import { cookieBanner } from './cookie-banner';
import { diamondCfy, diamondCto, diamondInfo, diamondPdp, diamondTable, diamonds, infiniteDiamonds } from './diamonds';
import { emailPopup } from './email-popup';
import { humanNameMappers } from './human-names-mapper';
import { journal } from './journal';
import { plpListPage, productBlocks, productPage } from './products';
import { showrooms } from './showrooms';
import { standardPage } from './standard-page';
import { template } from './template';
import { topBar } from './top-bar';
import { wishlist } from './wishlist';

export const queries = mergeQueryKeys(
  topBar,
  standardPage,
  journal,
  productPage,
  productBlocks,
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
  template,
  cookieBanner,
  emailPopup,
  wishlist,
);

export type DiamondCtoKeys = inferQueryKeys<typeof diamondCto>;
export type InfiniteDiamondsKeys = inferQueryKeys<typeof infiniteDiamonds>;
export type DiamondsKeys = inferQueryKeys<typeof diamonds>;
export type DiamondPdpKeys = inferQueryKeys<typeof diamondPdp>;
export type DiamondInfoKeys = inferQueryKeys<typeof diamondInfo>;
export type DiamondTableKeys = inferQueryKeys<typeof diamondTable>;
export type TopBarKeys = inferQueryKeys<typeof topBar>;
export type JournalKeys = inferQueryKeys<typeof journal>;
export type CartKeys = inferQueryKeys<typeof cart>;
export type StandardPageKeys = inferQueryKeys<typeof standardPage>;
export type ProductPageKeys = inferQueryKeys<typeof productPage>;
export type ProductBlocksKeys = inferQueryKeys<typeof productBlocks>;
export type PLPPageKeys = inferQueryKeys<typeof plpListPage>;
export type ShowroomKeys = inferQueryKeys<typeof showrooms>;
export type HumanNameWrapperKeys = inferQueryKeys<typeof humanNameMappers>;
export type QueryKeys = inferQueryKeyStore<typeof queries>;
export type TemplateKeys = inferQueryKeys<typeof template>;
export type CookieBannerKeys = inferQueryKeys<typeof cookieBanner>;
export type EmailPopupKeys = inferQueryKeys<typeof emailPopup>;
export type wishlistKeys = inferQueryKeys<typeof wishlist>;
