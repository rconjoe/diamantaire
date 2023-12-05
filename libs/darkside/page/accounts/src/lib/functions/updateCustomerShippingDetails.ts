import { shopifyAdminRestApi } from '@diamantaire/darkside/data/api';

export type Address = {
  phone?: string;
  first_name?: string;
  last_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country_code?: {
    label: string;
    value: string;
  };
  province_code?: {
    label?: string;
    value: string;
  };
  zip?: string;
  id?: number;
};

export type AddressDetails = {
  customerId: number;
  address: Address;
};

export default async function updateCustomerShippingDetails({ customerId, address }: AddressDetails) {
  try {
    const addressData = address.phone
      ? {
          phone: address.phone,
        }
      : {
          ...address,
          country_code: address?.country_code?.value,
          country: address?.country_code?.label,
          ...(address?.province_code?.value
            ? {
                province_code: address.province_code.value,
                province: address.province_code.label,
              }
            : {}),
        };

    addressData['default'] = true;
    addressData['customer_id'] = customerId;
    const body = { customer_address: addressData };
    const bodyString = JSON.stringify(body);

    if (address?.id) {
      // EDIT ADDRESS
      const endPoint = `/customers/${customerId}/addresses/${address?.id}.json`;

      const data = await shopifyAdminRestApi(endPoint, 'PUT', bodyString);

      return data;
    } else {
      // CREATE NEW ADDRESS
      const endPoint = `/customers/${customerId}/addresses.json`;

      const data = await shopifyAdminRestApi(endPoint, 'POST', bodyString);

      return data;
    }
  } catch (error) {
    console.error('Error posting customer data:', error);

    throw error;
  }
}
