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
  return useQuery({
    ...queries.internalCheckout.content(),
  });
}

export default useInternalCheckout;
