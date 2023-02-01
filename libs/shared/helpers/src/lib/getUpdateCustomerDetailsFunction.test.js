import getUpdateCustomerDetailsFunction from './getUpdateCustomerDetailsFunction';

describe('getUpdateCustomerDetailsFunction', () => {
  it('returns undefined if required param is missing', () => {
    const missingCookie = {
      cookie: undefined,
      hostname: 'http://localhost:3000',
      customerId: '54321',
    };

    const missingHostname = {
      cookie: {},
      hostname: undefined,
      customerId: '54321',
    };

    const missingCustomerId = {
      cookie: {},
      hostname: 'http://localhost:3000',
      customerId: undefined,
    };

    [missingCookie, missingHostname, missingCustomerId].forEach(
      async ({ cookie, hostname, customerId }) => {
        const updateCustomerDetailsFunction = await getUpdateCustomerDetailsFunction(
          cookie,
          hostname,
          customerId
        );

        expect(updateCustomerDetailsFunction).toBe(undefined);
      }
    );
  });
});
