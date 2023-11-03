import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Cart } from 'shopify-buy';

export function useCartData(locale: string): UseQueryResult<Cart, unknown> {
  return useQuery({
    ...queries.cart.checkout(locale),
  });
}

export default useCartData;
