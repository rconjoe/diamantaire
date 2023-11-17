import { queries } from '@diamantaire/darkside/data/queries';
import { DiamondDataTypes } from '@diamantaire/shared/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface WishlistContentDataTypes {
  pageTitle: string;
  pageSubtitle: string;
  pageSeoTitle: string;
  pageSeoDescription: string;
  modalTitle: string;
  modalSubtitle: string;
  tabAll: string;
  tabJewelry: string;
  tabEngagement: string;
  buttonShare: string;
  buttonView: string;
  buttonRemove: string;
  buttonShop: string;
  shareWishlistModalTitle: string;
  shareWishlistModalSubtitle: string;
  sharedWishlistPageTitle: string;
  sharedWishlistPageSubtitle: string;
  sharedWishlistPageSeoTitle: string;
  sharedWishlistPageSeoDescription: string;
  noResult: string;
  noResultBlocks: {
    itemTitle: string;
    itemCaption: string;
    itemUrl: string;
    itemImage: {
      url: string;
    };
  }[];
}

interface WishlistContentDataProps {
  wishlist: WishlistContentDataTypes;
}

export function useWishlistContent(locale: string): UseQueryResult<WishlistContentDataProps, unknown> {
  return useQuery({ ...queries.wishlist.content(locale) });
}

interface WishlistProductDataTypes {
  diamond: { [key: string]: DiamondDataTypes }[];
  cfy: { [key: string]: DiamondDataTypes }[];
  product: { [key: string]: any }[];
  bundle: { [key: string]: [any, DiamondDataTypes] }[];
}

interface WishlistProductDataProps {
  wishlist: WishlistProductDataTypes;
}

export function useWishlistProduct(ids: string[], locale: string): UseQueryResult<WishlistProductDataProps, unknown> {
  return useQuery({ ...queries.wishlist.product(ids, locale) });
}
