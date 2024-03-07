import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type InternalCheckoutProps = {
  internalCheckout: {
    salesReps: {
      salesId: string;
      name: string;
    }[];
    salesChannels: {
      name: string;
    }[];
    salesLocations: {
      name: string;
    }[];
  };
};

export function useInternalCheckout(): UseQueryResult<InternalCheckoutProps, unknown> {
  const { queryKey, queryFn } = queries.internalCheckout.content();
  const wrappedQueryFn = (context) => {
    const wrappedContext = { ...context, signal: new AbortController().signal, meta: {} };

    return queryFn(wrappedContext);
  };

  return useQuery(queryKey, wrappedQueryFn);
}
export default useInternalCheckout;
