export type Address = {
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  province_code: string;
  country_code: string;
  zip: string;
  id: string;
};

export type AddressDetails = {
  customerId: string;
  address: Address;
};

// TODO: Finalize these functions to update customer shipping info via mutations - https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-208
// export default async function updateCustomerShippingDetails({ id }: { id: string; shippingInfo: string }) {
export default async function updateCustomerShippingDetails(customerId: string, address: Address) {
  console.log('update shipping info', customerId, address);

  if (address.id) {
    // handle update address
  } else {
    // handle create new address
  }
}
