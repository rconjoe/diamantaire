import {
  shopifyStoreUrl,
  storePdpUrl,
  SHOPIFY_ROOT_URL,
  getPathSpecsFromProductDetails,
} from './storeUrl';
import {
  VO_ROOT_URL,
  WEDDING_BAND_PRODUCT_TYPE,
  ENGAGEMENT_RING_PRODUCT_TYPE,
} from '@diamantaire/shared/constants';

describe('shopifyStoreUrls', () => {
  describe('getPathSpecsFromProductType()', () => {
    it('by default returns the 1.5 site product path specs', () => {
      const pathSpecs = getPathSpecsFromProductDetails(
        'any-product-type-except-wedding-products',
        []
      );

      expect(pathSpecs).toEqual({
        origin: SHOPIFY_ROOT_URL,
        root: 'products',
      });
    });

    it('works when an engagement ring product type is passed in', () => {
      const pathSpecs = getPathSpecsFromProductDetails(
        WEDDING_BAND_PRODUCT_TYPE
      );

      expect(pathSpecs).toEqual({
        origin: VO_ROOT_URL,
        root: 'wedding-bands',
      });
    });
    it('works when a wedding band product type is passed in', () => {
      const pathSpecs = getPathSpecsFromProductDetails(
        ENGAGEMENT_RING_PRODUCT_TYPE
      );

      expect(pathSpecs).toEqual({
        origin: VO_ROOT_URL,
        root: 'engagement-rings',
      });
    });
  });

  describe('shopifyStoreUrl()', () => {
    it('works when the path has a leading slash', () => {
      const route = shopifyStoreUrl({
        path: '/traffic/for-funds',
        origin: VO_ROOT_URL,
      });

      expect(route).toEqual('https://www.vrai.com/traffic/for-funds');
    });

    it('works when the path does not have a leading slash', () => {
      const route = shopifyStoreUrl({
        path: 'traffic/for-funds',
        origin: SHOPIFY_ROOT_URL,
      });

      expect(route).toEqual('https://vrai.com/traffic/for-funds');
    });

    it('works when origin has a trailing slash and path has a leading slash', () => {
      const route = shopifyStoreUrl({
        path: '/beef',
        origin: 'https://roast.com/',
      });

      expect(route).toEqual('https://roast.com/beef');
    });
  });

  describe('storePdpUrl()', () => {
    it('generates the correct url', () => {
      const defaultProductRoute = storePdpUrl({
        productHandle: 'sparkly-earrings',
        productType: 'sparkly-product-type',
        tags: [],
      });

      expect(defaultProductRoute).toEqual(
        'https://vrai.com/products/sparkly-earrings'
      );

      const engagementProductRoute = storePdpUrl({
        productHandle: 'sparkly-earrings',
        productType: ENGAGEMENT_RING_PRODUCT_TYPE,
      });

      expect(engagementProductRoute).toEqual(
        'https://www.vrai.com/engagement-rings/sparkly-earrings'
      );

      const weddingProductRoute = storePdpUrl({
        productHandle: 'sparkly-earrings',
        productType: WEDDING_BAND_PRODUCT_TYPE,
      });

      expect(weddingProductRoute).toEqual(
        'https://www.vrai.com/wedding-bands/sparkly-earrings'
      );
    });
  });
});
