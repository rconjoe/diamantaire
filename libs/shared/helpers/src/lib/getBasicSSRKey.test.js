import getBasicSSRKey, {
  addOptionalOutsideUsPrefix,
  addOptionalLocalePrefix,
  createBaseKey,
} from './getBasicSSRKey';

import { LOCALE_COOKIE_NAME } from '../helpers/universalCookies';

describe('getBasicSSRKey', () => {
  const createReq = requestObject => {
    return requestObject;
  };

  test('In US with locale', () => {
    const req = createReq({
      url:
        'https://www.vrai.com/engagement-rings?utm_campaign=Black%20Friday%20engagement%20%28VFDKzM%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D',
      cookies: {
        [LOCALE_COOKIE_NAME]: 'en_US',
      },
    });

    const overrideGeoIpDataForTest = { country: 'US' };

    expect(getBasicSSRKey({ req }, overrideGeoIpDataForTest)).toBe(
      'en_US-https://www.vrai.com/engagement-rings'
    );
  });

  test('In EU with locale', () => {
    const req = createReq({
      url:
        'https://www.vrai.com/engagement-rings?utm_campaign=Black%20Friday%20engagement%20%28VFDKzM%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D',
      cookies: {
        [LOCALE_COOKIE_NAME]: 'en_US',
      },
    });

    const overrideGeoIpDataForTest = { country: 'GB' };

    expect(getBasicSSRKey({ req }, overrideGeoIpDataForTest)).toBe(
      '[EU]-en_US-https://www.vrai.com/engagement-rings'
    );
  });

  test('Outside US but not EU with locale', () => {
    const req = createReq({
      url:
        'https://www.vrai.com/engagement-rings?utm_campaign=Black%20Friday%20engagement%20%28VFDKzM%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D',
      cookies: {
        [LOCALE_COOKIE_NAME]: 'en_US',
      },
    });

    const overrideGeoIpDataForTest = { country: 'CA' };

    expect(getBasicSSRKey({ req }, overrideGeoIpDataForTest)).toBe(
      '[CA]-en_US-https://www.vrai.com/engagement-rings'
    );
  });

  describe('createBaseKey', () => {
    describe('Engagement Ring List Pages', () => {
      test('Advertisement URL', () => {
        const ER_LIST_PAGE_URLS = [
          'https://www.vrai.com/engagement-rings?utm_campaign=Black%20Friday%20engagement%20%28VFDKzM%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D',
          'https://www.vrai.com/engagement-rings',
        ];

        ER_LIST_PAGE_URLS.map(url => {
          const req = createReq({ url });

          expect(createBaseKey(req)).toBe(
            'https://www.vrai.com/engagement-rings'
          );
        });
      });

      test('Dynamic configured param URL', () => {
        const ER_WITH_WHITE_LIST_PARAMS =
          'https://www.vrai.com/engagement-rings?metal=yellow-gold&utm_campaign=Black%20Friday%20engagement%20%28VFDKzM%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D';

        const req = createReq({ url: ER_WITH_WHITE_LIST_PARAMS });

        expect(createBaseKey(req)).toBe(
          'https://www.vrai.com/engagement-rings?metal=yellow-gold'
        );
      });
    });

    describe('Holiday gift jewelry', () => {
      test('Advertisement URL', () => {
        const HOLIDAY_GIFT_LIST_PAGE_AD_URL =
          'https://www.vrai.com/holiday-gifts-jewelry?utm_campaign=Cyber%20Monday%20%28SDrB6n%29&utm_medium=email&utm_source=Klaviyo&_ke=eyJrbF9lbWFpbCI6ICJuaWtvQHZyYWkuY29tIiwgImtsX2NvbXBhbnlfaWQiOiAiSFloWFpwIn0%3D';

        const req = createReq({ url: HOLIDAY_GIFT_LIST_PAGE_AD_URL });

        expect(createBaseKey(req)).toBe(
          'https://www.vrai.com/holiday-gifts-jewelry'
        );
      });
    });
  });

  describe('addOptionalLocalePrefix', () => {
    test('Has locale cookies set', () => {
      const req = createReq({ cookies: { [LOCALE_COOKIE_NAME]: 'en_US' } });

      const key = 'https://www.vrai.com/engagement-rings';

      expect(addOptionalLocalePrefix(key, req)).toBe(
        `${req.cookies[LOCALE_COOKIE_NAME]}-${key}`
      );
    });

    test('No locale cookies', () => {
      const req = createReq({});

      const key = 'https://www.vrai.com/engagement-rings';

      expect(addOptionalLocalePrefix(key, req)).toBe(key);
    });
  });

  describe('addOptionalOutsideUsPrefix', () => {
    const key = 'https://www.vrai.com/engagement-rings';

    test('User is in US', () => {
      const req = createReq({});
      const overrideGeoIpDataForTest = { country: 'US' };

      expect(
        addOptionalOutsideUsPrefix(key, req, overrideGeoIpDataForTest)
      ).toBe(key);
    });

    test('User is in EU', () => {
      const req = createReq({});
      const overrideGeoIpDataForTest = { country: 'GB' };

      expect(
        addOptionalOutsideUsPrefix(key, req, overrideGeoIpDataForTest)
      ).toBe(`[EU]-${key}`);
    });

    test('User is outside US but NOT EU', () => {
      const req = createReq({});
      const overrideGeoIpDataForTest = { country: 'CA' };

      expect(
        addOptionalOutsideUsPrefix(key, req, overrideGeoIpDataForTest)
      ).toBe(`[CA]-${key}`);
    });
  });
});
