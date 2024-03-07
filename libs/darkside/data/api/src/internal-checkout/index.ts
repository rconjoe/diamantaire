import { queryDatoGQL } from '../clients';

const INTERNAL_CHECKOUT_QUERY = `
query InternalCheckout {
  internalCheckout {
    salesReps {
      salesId
      name
    }
    salesChannels {
      name
    }
    salesLocations {
      name
    }
  }
}
  `;

export async function fetchInternalCheckoutData() {
  const internalCheckoutData = await queryDatoGQL({
    query: INTERNAL_CHECKOUT_QUERY,
  });

  return internalCheckoutData;
}
