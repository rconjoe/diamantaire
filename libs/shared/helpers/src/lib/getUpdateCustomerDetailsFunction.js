import unfetch from 'isomorphic-unfetch';

export default function getUpdateCustomerDetailsFunction(
  cookie,
  hostname,
  customerId
) {
  if (!cookie || !hostname || !customerId) {
    // eslint-disable-next-line
    console.error(`missing required field: {
      cookie: ${Boolean(cookie)},
      hostname: ${Boolean(hostname)},
      customerId: ${Boolean(customerId)},
    }`);

    return undefined;
  }

  return async payload => {
    const response = await unfetch(`${hostname}/api/account/details/edit`, {
      method: 'POST',
      headers: { cookie, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, customerId }),
    });

    const { updatedCustomerDetails, errors } = await response.json();

    if (errors.length) {
      return { errors };
    }

    return updatedCustomerDetails;
  };
}
