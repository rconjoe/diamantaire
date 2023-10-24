import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface WishlistContentDataTypes {
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
}

interface WishlistContentDataProps {
  wishlist: WishlistContentDataTypes;
}

export function useWishlistContent(locale: string): UseQueryResult<WishlistContentDataProps, unknown> {
  return useQuery({
    ...queries.wishlist.content(locale),
    meta: {
      locale,
    },
    staleTime: 300000, // Set the stale time to 5 minutes
  });
}

export default useWishlistContent;
