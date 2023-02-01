import unfetch from 'isomorphic-unfetch';

export default async function pickCustomerDetails(
  cookie,
  hostname,
  userSessionData,
  fetchDetails = unfetch,
  fetchReminders = unfetch
) {
  if (!cookie || !hostname || !userSessionData) {
    // eslint-disable-next-line
    console.error(`missing required field: {
      cookie: ${Boolean(cookie)},
      hostname: ${Boolean(hostname)},
      userSessionData: ${Boolean(userSessionData)},
    }`);

    return undefined;
  }

  const response = await fetchDetails(`${hostname}/api/account/details`, {
    method: 'POST',
    headers: { cookie },
  });

  let { customerDetails, isCustomerNotFound } = await response.json();

  if (isCustomerNotFound) {
    const { email, firstName, customerId } = userSessionData;
    const isNewlyRegisteredUser = firstName && customerId;

    if (isNewlyRegisteredUser) {
      customerDetails = { email, firstName, customerId };
    }
  }

  const url = encodeURI(
    `${hostname}/diamondFoundry/reminders?customer_email=${encodeURIComponent(
      customerDetails?.email
    )}`
  );

  const remindersResponse = await fetchReminders(url, {
    method: 'GET',
  });

  const reminders = await remindersResponse.json();

  return { customerDetails: { ...customerDetails, reminders } };
}
