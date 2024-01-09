import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

// This hook fetches all cart copy

export type CartProps = {
  cart: {
    certificates: CartCertProps[];
    pageCopy: CartCopyProps[];
    cartItemDetails: { [key: string]: string }[];
  };
};

export type CartCertProps = {
  title: string;
  copy: string;
  price: string;
};

export type CartCopyProps = {
  cartHeader: string;
  subtotalCopy: string;
  euSubtotalCopy: string;
  cartCtaCopy: string;
  termsAndConditionsCtaCopy: string;
  termsAndConditionsCtaRoute: string;
  addNoteOptionCta: string;
  emptyCartMainCopy: string;
  emptyCartMainCtaCopy: string;
  emptyCartMainCtaRoute: string;
  addNoteOptionCta: string;
  updateNoteOptionCta: string;
  removeNoteOptionCta: string;
  uniqueDiamondAlreadyInCartErrorMessage: string;
};

export function useCartInfo(locale: string): UseQueryResult<CartProps, unknown> {
  return useQuery({
    ...queries.cart.info(locale),
  });
}

export default useCartInfo;
