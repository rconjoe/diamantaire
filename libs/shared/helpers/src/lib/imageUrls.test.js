import {
  cdnImageUrl,
  makeCertSealImageUrl,
  makeBlurPlaceholderImageUrl,
  makeCartProductImageUrl,
  makeEngagementProductCarouselUrls,
  makeDiamondPDPImageUrl,
  makeTestimonialImageUrl,
  makeContentImageUrl,
  makeOGImageUrl,
  makeOmegaOGImageUrl,
  OG_IMAGE_SQUARE_SIZE,
  omegaCdnImageUrl,
  makeOmegaEngagementProductCarouselUrls,
  makeOmegaCartProductImageUrl,
  makeDatoImageUrl,
  makeDatoProductImageUrl,
} from './imageUrls';

describe('imageUrls', () => {
  describe('cdnImageUrl', () => {
    it('is a curried function that generates the correct urls', () => {
      const imageUrl = cdnImageUrl('a-section')('foo', 'bar-baz', 'chirp', 1)({
        ext: 'gif',
        quality: '1000',
        extra: 'ignored',
      });

      expect(imageUrl).toBe(
        'https://images.vraiandoro.com/a-section/foo-bar-baz-chirp-1.gif?q=1000&auto=format'
      );
    });

    it('uri encodes sections and name segments correctly', () => {
      const imageUrl = cdnImageUrl('space the')('final frontier', 'M&Ms?')({
        noParams: true,
      });

      expect(imageUrl).toBe(
        'https://images.vraiandoro.com/space%20the/final%20frontier-M%26Ms%3F.jpg'
      );
    });
  });

  it('does not add an auto=format query parameter if fm=X param is available', () => {
    const imageUrl = cdnImageUrl('a-section')('foo', 'bar-baz', 'chirp', 1)({
      ext: 'gif',
      quality: '1000',
      extra: 'ignored',
      fm: 'jpg',
    });

    expect(imageUrl).toBe(
      'https://images.vraiandoro.com/a-section/foo-bar-baz-chirp-1.gif?q=1000&fm=jpg'
    );
  });

  describe('OGImageUrl tests', () => {
    it('makes a correct OGImageUrl', () => {
      const imageUrl = makeOGImageUrl('awesome-slug');

      expect(imageUrl).toBe(
        cdnImageUrl('product-images')('awesome-slug', 'yellow-gold', 1)({
          fm: 'jpg',
          fit: 'crop',
          w: OG_IMAGE_SQUARE_SIZE,
          h: OG_IMAGE_SQUARE_SIZE,
          quality: '100',
        })
      );
    });

    it('makes a correct omegaOGImageUrl', () => {
      const imageUrl = makeOmegaOGImageUrl({
        color: 'yellow-gold',
        slug: 'my-slug',
        bandWidth: undefined,
        bandAccent: 'pave',
        diamondType: 'round-brilliant',
        sideStoneCarat: '0.25ct',
      });

      expect(imageUrl).toBe(
        omegaCdnImageUrl('product-images')(
          'my-slug',
          'round-brilliant',
          '0.25ct',
          'pave',
          'yellow-gold',
          1
        )({
          fm: 'jpg',
          fit: 'crop',
          w: OG_IMAGE_SQUARE_SIZE,
          h: OG_IMAGE_SQUARE_SIZE,
          quality: '100',
        })
      );
    });
  });

  it('generates a correct certificate seal url', () => {
    const imageUrl = makeCertSealImageUrl('df');

    expect(imageUrl).toBe(
      cdnImageUrl('product-images')('df', 'certificate-seal-1')()
    );
  });

  it('generates a correct testimonial Image url', () => {
    const imageUrl = makeTestimonialImageUrl(1);

    expect(imageUrl).toBe(
      cdnImageUrl('content-images')('testimonial', 1)({ quality: 40 })
    );
  });

  it('makes correct content image url that has an index', () => {
    const imageUrl = makeContentImageUrl('hola', 0);

    expect(imageUrl).toBe(
      cdnImageUrl('content-images')('hola', 0)({ quality: 40 })
    );
  });

  it('makes correct content image url that does not have an index', () => {
    const imageUrl = makeContentImageUrl('hola');

    expect(imageUrl).toBe(
      cdnImageUrl('content-images')('hola')({ quality: 40 })
    );
  });

  it('generates a correct blur placeholder url', () => {
    const imageUrl = makeBlurPlaceholderImageUrl();

    expect(imageUrl).toBe(
      'https://images.vraiandoro.com/product-images/signature-prong/signature-prong-round-brilliant-plain-platinum-1.jpg?q=25&w=.05&blur=90&ar=1%3A1&fit=crop&auto=format'
    );
  });

  describe('makeEngagementProductCarouselUrls Wedding Band', () => {
    it('generates the correct set of image urls', () => {
      const urls = makeEngagementProductCarouselUrls({
        productHandle: 'the-band',
        productType: 'Wedding Band',
        color: 'iridium',
      });

      expect(urls).toEqual([
        cdnImageUrl('product-images')('the-band', 'iridium', 1)(),
        cdnImageUrl('product-images')('the-band', 'iridium', 2)(),
        cdnImageUrl('product-images')('the-band', 'iridium', 3)(),
        cdnImageUrl('product-images')('the-band', 'iridium', 4)(),
      ]);
    });
  });

  describe('makeEngagementProductCarouselUrls Engagement Ring', () => {
    it('generates the correct set of image urls', () => {
      const urls = makeEngagementProductCarouselUrls({
        productHandle: 'chain-link',
        productType: 'Engagement Ring',
        color: 'mithril',
      });

      expect(urls).toEqual([
        cdnImageUrl('product-images')('chain-link', 'mithril', 1)(),
        cdnImageUrl('product-images')('chain-link', 'mithril', 2)(),
        cdnImageUrl('product-images')('chain-link', 'mithril', 3)(),
        cdnImageUrl('product-images')('chain-link', 'mithril', 4)(),
        cdnImageUrl('product-images')('chain-link', 'mithril', 5)(),
      ]);
    });

    it('strips "-sample" from a sample product handle', () => {
      const urls = makeEngagementProductCarouselUrls({
        productHandle: 'chain-link-fence-sample',
        productType: 'Engagement Ring',
        color: 'mithril',
      });

      expect(urls).toEqual([
        cdnImageUrl('product-images')('chain-link-fence', 'mithril', 1)(),
        cdnImageUrl('product-images')('chain-link-fence', 'mithril', 2)(),
        cdnImageUrl('product-images')('chain-link-fence', 'mithril', 3)(),
        cdnImageUrl('product-images')('chain-link-fence', 'mithril', 4)(),
        cdnImageUrl('product-images')('chain-link-fence', 'mithril', 5)(),
      ]);
    });
  });

  describe('makeEngagementProductCarouselUrls Special Infinity Band Case', () => {
    it('generates the correct set of image urls (only 2 instead of 3)', () => {
      const urls = makeEngagementProductCarouselUrls({
        productHandle: 'the-infinity-diamond-unisex-wedding-band',
        productType: 'Wedding Band',
        color: 'mithril',
      });

      expect(urls).toEqual([
        cdnImageUrl('product-images')(
          'the-infinity-diamond-unisex-wedding-band',
          'mithril',
          1
        )(),
        cdnImageUrl('product-images')(
          'the-infinity-diamond-unisex-wedding-band',
          'mithril',
          2
        )(),
      ]);
    });
  });

  describe('makeCartProductImageUrl', () => {
    it('creates the correct diamond image url if the product is a diamond ', () => {
      const diamondimageUrl = makeCartProductImageUrl({
        slug: 'blahHandle-blueGold',
        isDiamond: true,
        diamondData: {
          type: 'blahDiamondType',
        },
      });
      const trim = `&ar=1:1&fit=crop`;

      expect(diamondimageUrl).toEqual(
        cdnImageUrl('diamond-images-v3')('blahdiamondtype', 'background')({
          ext: 'jpg',
        }) + trim
      );
    });
    it('creates the correct setting image url if the product is a not a diamond ', () => {
      const settingImageUrl = makeCartProductImageUrl({
        isDiamond: false,
        slug: 'blahHandle',
        metal: 'blueGold',
      });

      expect(settingImageUrl).toEqual(
        cdnImageUrl('product-images')('blahHandle', 'blueGold', 1)()
      );
    });
  });

  it('creates the correct setting image url if the mock product is a not a diamond ', () => {
    const settingImageUrl = makeCartProductImageUrl({
      isDiamond: false,
      slug: 'blahHandle-sample-yellow-gold',
      metal: 'blueGold',
    });

    expect(settingImageUrl).toEqual(
      cdnImageUrl('product-images')('blahHandle', 'blueGold', 1)()
    );
  });

  describe('makeDiamondPDPImageUrl', () => {
    it('creates the correct diamond pdp image url (with .png extension) if the product is a diamond ', () => {
      const diamondimageUrl = makeDiamondPDPImageUrl('blahDiamondType');

      expect(diamondimageUrl).toEqual(
        cdnImageUrl('diamond-images')('blahdiamondtype')({ ext: 'png' })
      );
    });
  });

  describe('makeOmegaEngagementProductCarouselUrls()', () => {
    it('creates a correct url for an omega engagement ring', () => {
      const urls = makeOmegaEngagementProductCarouselUrls({
        productHandle: 'my-handle',
        productType: 'Engagement Ring',
        slug: 'my-slug',
        color: 'brown',
        bandAccent: 'pave',
        diamondType: 'round-brilliant',
      });

      expect(urls).toEqual([
        omegaCdnImageUrl('product-images')(
          'my-slug',
          'round-brilliant',
          'pave',
          'brown',
          '1'
        )(),
        omegaCdnImageUrl('product-images')(
          'my-slug',
          'round-brilliant',
          'pave',
          'brown',
          '2'
        )(),
        omegaCdnImageUrl('product-images')(
          'my-slug',
          'round-brilliant',
          'pave',
          'brown',
          '3'
        )(),
        omegaCdnImageUrl('product-images')(
          'my-slug',
          'round-brilliant',
          'pave',
          'brown',
          '4'
        )(),
      ]);
    });
  });

  describe('makeOmegaCartProductImageUrl', () => {
    const productImageParams = {
      omegaVariantData: {
        options: {
          bandWidth: '1.5mm',
          ringSize: '3',
          metal: 'platinum',
        },
        slug: 'domed-band',
      },
      diamondData: {
        type: '',
      },
      isDiamond: false,
      slug: 'slug',
      isBuybackProduct: false,
    };

    const diamondImageParams = {
      ...productImageParams,
      isDiamond: true,
    };

    it('it returns a product-images url', () => {
      const assertion = makeOmegaCartProductImageUrl(
        productImageParams
      ).includes('product-images');

      expect(assertion).toBeTrue();
    });

    it('it returns a diamond-images url', () => {
      const assertion = makeOmegaCartProductImageUrl(
        diamondImageParams
      ).includes('diamond-images');

      expect(assertion).toBeTrue();
    });

    it('returns a valid image url', () => {
      const valid = `https://images.vraiandoro.com/product-images/domed-band/domed-band-1-5mm-platinum-1.jpg?q=25&auto=format`;

      expect(makeOmegaCartProductImageUrl(productImageParams)).toBe(valid);
    });
  });

  test('makeDatoImageUrl', () => {
    const valid =
      'https://www.datocms-assets.com/25216/1589842492-er-plp-hero-desktop.jpg?q=25&auto=format';

    expect(
      makeDatoImageUrl(
        'https://www.datocms-assets.com/25216/1589842492-er-plp-hero-desktop.jpg'
      )
    ).toBe(valid);
  });

  test('makeDatoProductImageUrl', () => {
    const expected =
      'https://www.datocms-assets.com/25216/1589842492-er-plp-hero-desktop.jpg?q=50&ar=1%3A1&fit=crop&auto=format';
    const actual = makeDatoProductImageUrl(
      'https://www.datocms-assets.com/25216/1589842492-er-plp-hero-desktop.jpg'
    );

    expect(actual).toEqual(expected);
  });
});
