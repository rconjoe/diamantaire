import redirectToLoginPage from './redirectToLoginPage';

describe('redirectToLoginPage', () => {
  describe('server', () => {
    const req = {}; // req value only exist in server

    it('sets correct values to res and returns props', () => {
      const res = {
        statusCode: null,
        setHeader: jest.fn(),
        end: jest.fn(),
      };

      const result = redirectToLoginPage({ res, req });

      expect(res.setHeader).toBeCalledWith('location', '/account/login');
      expect(res.statusCode).toBe(302);
      expect(res.end).toHaveBeenCalled();
      expect(result).toEqual({
        props: {},
      });
    });
  });

  describe('client-side', () => {
    const req = undefined; // req value will be undefined in client

    it('returns props', () => {
      const res = {
        statusCode: null,
        setHeader: jest.fn(),
        end: jest.fn(),
      };

      const result = redirectToLoginPage({ res, req });

      expect(res.setHeader).not.toBeCalled();
      expect(res.statusCode).toBeNull();
      expect(res.end).not.toBeCalled();
      expect(result).toEqual({
        props: {
          shouldRedirectToLogin: true,
        },
      });
    });
  });
});
