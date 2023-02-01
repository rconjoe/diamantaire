import { cleanProductionCheckoutUrl } from './goToCheckoutUrl';

describe('cleanProductionCheckoutUrl()', () => {
  it('replaces the hostname portion of the url if it detects a shopify hostname', () => {
    const originalCheckoutUrl =
      'https://vo-live.myshopify.com/foo/foo?key=yadda';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(originalCheckoutUrl);

    return expect(cleanedCheckoutUrl).toStartWith(
      'https://vrai.com/foo/foo?key=yadda'
    );
  });

  it('does not modify the main part of the url if it does not detect a shopify hostname', () => {
    const originalCheckoutUrl = 'https://some-test.url/foo/bar/baz?chirp=123';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(originalCheckoutUrl);

    return expect(cleanedCheckoutUrl).toStartWith(originalCheckoutUrl);
  });

  it('adds a `source=vo20` query param to a url with existing query params', () => {
    const originalCheckoutUrl =
      'https://vo-live.myshopify.com/foo/foo?key=yadda';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(originalCheckoutUrl);

    return expect(cleanedCheckoutUrl).toEqual(
      'https://vrai.com/foo/foo?key=yadda&source=vo20&locale=en-US'
    );
  });

  it('adds a `source=vo20` query param to a url without existing query params', () => {
    const originalCheckoutUrl = 'https://some-test.url/foo';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(originalCheckoutUrl);

    return expect(cleanedCheckoutUrl).toEqual(
      'https://some-test.url/foo?source=vo20&locale=en-US'
    );
  });

  it('adds a `flow=<flow>` param to a url if flow exists', () => {
    const originalCheckoutUrl = 'https://some-test.url/foo';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(
      originalCheckoutUrl,
      'elon'
    );

    return expect(cleanedCheckoutUrl).toEqual(
      'https://some-test.url/foo?source=vo20&checkoutFlow=elon&locale=en-US'
    );
  });

  it('does not add a `flow=<flow>` param to a url if flow does not exist', () => {
    const originalCheckoutUrl = 'https://some-test.url/foo';
    const cleanedCheckoutUrl = cleanProductionCheckoutUrl(originalCheckoutUrl);

    return expect(cleanedCheckoutUrl).toEqual(
      'https://some-test.url/foo?source=vo20&locale=en-US'
    );
  });
});
