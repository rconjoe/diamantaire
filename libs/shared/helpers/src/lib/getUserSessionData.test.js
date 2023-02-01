import getUserSessionData from './getUserSessionData';

describe('getUserSessionData', () => {
  it('returns undefined if require param is missing', async () => {
    const context = undefined;
    const mockSuccessResponse = {
      user: {
        email: 'niko@vrai.com',
      },
    };

    const spyFn = jest.fn().mockReturnValue(mockSuccessResponse);

    const result = await getUserSessionData(context, spyFn);

    expect(result).toEqual(undefined);
  });

  it('returns expected data structure', async () => {
    const context = {};
    const mockSuccessResponse = {
      user: {
        email: 'niko@vrai.com',
      },
    };

    const spyFn = jest.fn().mockReturnValue(mockSuccessResponse);

    const result = await getUserSessionData(context, spyFn);

    expect(result).toEqual({
      isUserSignedIn: true,
      userSessionData: mockSuccessResponse.user,
    });
  });
});
