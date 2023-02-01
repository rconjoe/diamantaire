import pickCustomerDetails from './pickCustomerDetails';

describe('pickCustomerDetails', () => {
  it('returns undefined if a required field is missing', () => {
    const missingCookie = {
      cookie: undefined,
      hostname: 'http://localhost:3000',
      userSessionData: {},
    };
    const missingHostname = {
      cookie: {},
      hostname: undefined,
      userSessionData: {},
    };
    const missingUserSessionData = {
      cookie: {},
      hostname: 'http://localhost:3000',
      userSessionData: undefined,
    };

    [missingCookie, missingHostname, missingUserSessionData].forEach(
      async ({ cookie, hostname, userSessionData }) => {
        const customerDetails = await pickCustomerDetails(
          cookie,
          hostname,
          userSessionData
        );

        expect(customerDetails).toBe(undefined);
      }
    );
  });
  it('returns expected data structure', async () => {
    const validParams = {
      cookie: {},
      hostname: 'http://localhost:3000',
      userSessionData: {},
    };
    const mockSuccessResponseDetails = {};
    const mockJsonPromiseDetails = Promise.resolve(mockSuccessResponseDetails);
    const mockFetchPromiseDetails = Promise.resolve({
      json: () => mockJsonPromiseDetails,
    });
    const spyFnDetails = jest.fn().mockReturnValue(mockFetchPromiseDetails);
    const mockResponseReminders = [];
    const mockJsonPromiseReminders = Promise.resolve(mockResponseReminders);
    const mockFetchPromiseReminders = Promise.resolve({
      json: () => mockJsonPromiseReminders,
    });
    const spyFnReminders = jest.fn().mockReturnValue(mockFetchPromiseReminders);
    const customerDetails = await pickCustomerDetails(
      validParams.cookie,
      validParams.hostname,
      validParams.userSessionData,
      spyFnDetails,
      spyFnReminders
    );

    expect(customerDetails).toHaveProperty('customerDetails');
  });
  it('picks userSessionData if customer is not found', async () => {
    const validParams = {
      cookie: {},
      hostname: 'http://localhost:3000',
      userSessionData: {
        email: 'niko@vrai.com',
        firstName: 'niko',
        customerId: '12345',
      },
    };
    const mockSuccessResponseDetails = {
      isCustomerNotFound: true,
    };
    const mockJsonPromiseDetails = Promise.resolve(mockSuccessResponseDetails);
    const mockFetchPromiseDetails = Promise.resolve({
      json: () => mockJsonPromiseDetails,
    });
    const spyFnDetails = jest.fn().mockReturnValue(mockFetchPromiseDetails);
    const mockResponseReminders = [
      { occassion_type: 'Anniversary' },
      { occassion_type: 'Christmas' },
    ];
    const mockJsonPromiseReminders = Promise.resolve(mockResponseReminders);
    const mockFetchPromiseReminders = Promise.resolve({
      json: () => mockJsonPromiseReminders,
    });
    const spyFnReminders = jest.fn().mockReturnValue(mockFetchPromiseReminders);
    const customerDetails = await pickCustomerDetails(
      validParams.cookie,
      validParams.hostname,
      validParams.userSessionData,
      spyFnDetails,
      spyFnReminders
    );

    expect(customerDetails.customerDetails).toEqual({
      ...validParams.userSessionData,
      reminders: mockResponseReminders,
    });
  });
  it('picks fetched data if customer is found', async () => {
    const validParams = {
      cookie: {},
      hostname: 'http://localhost:3000',
      userSessionData: {
        email: 'niko@vrai.com',
        firstName: 'niko',
        customerId: '12345',
      },
    };
    const mockSuccessResponseDetails = {
      isCustomerNotFound: false,
      customerDetails: {
        email: 'andrew@vrai.com',
        firstName: 'andrew',
        customerId: '54321',
      },
    };
    const mockJsonPromiseDetails = Promise.resolve(mockSuccessResponseDetails);
    const mockFetchPromiseDetails = Promise.resolve({
      json: () => mockJsonPromiseDetails,
    });
    const spyFnDetails = jest.fn().mockReturnValue(mockFetchPromiseDetails);
    const mockResponseReminders = [
      { occassion_type: 'Anniversary' },
      { occassion_type: 'Christmas' },
    ];
    const mockJsonPromiseReminders = Promise.resolve(mockResponseReminders);
    const mockFetchPromiseReminders = Promise.resolve({
      json: () => mockJsonPromiseReminders,
    });
    const spyFnReminders = jest.fn().mockReturnValue(mockFetchPromiseReminders);
    const customerDetails = await pickCustomerDetails(
      validParams.cookie,
      validParams.hostname,
      validParams.userSessionData,
      spyFnDetails,
      spyFnReminders
    );

    expect(customerDetails.customerDetails).toEqual({
      ...mockSuccessResponseDetails.customerDetails,
      reminders: mockResponseReminders,
    });
  });
});
