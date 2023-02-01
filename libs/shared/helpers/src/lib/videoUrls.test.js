import {
  makeOmegaProductVideoSlug,
  addVideoSettings,
  getVideoAttributes,
} from './videoUrls';

describe('videoUrls', () => {
  describe('makeOmegaProductVideoSlug', () => {
    it('makes an omega engagement ring video slug', () => {
      const signatureProngVideoProps = {
        slug: 'signature-prong',
        bandAccent: 'pave',
        diamondType: 'round-brilliant',
      };

      const expectedVideoSlug =
        'signature-prong-round-brilliant-pave-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(
        signatureProngVideoProps
      );

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });

    it('makes an omega wedding band video slug', () => {
      const domedBandVideoProps = {
        slug: 'domed-band',
        bandWidth: '1.5mm',
      };

      const expectedVideoSlug = 'domed-band-1-5mm-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(domedBandVideoProps);

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });

    it('knows how to handle three stone edge case with sideStoneCarat', () => {
      const threeStoneVideoProps = {
        slug: 'three-stone',
        bandWidth: undefined,
        bandAccent: 'pave',
        diamondType: 'round-brilliant',
        sideStoneCarat: '0.25ct',
      };

      const expectedVideoSlug =
        'three-stone-round-brilliant-0-25ct-pave-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(threeStoneVideoProps);

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });

    it('always adds metal:yellow-gold and order:1 to product video url', () => {
      const twistBandVideoPropsWithMetalAndOrder = {
        slug: 'twist',
        bandWidth: undefined,
        bandAccent: 'plain',
        diamondType: 'round-brilliant',
        metal: 'someone-passed-in-a-metal-for-some-reason',
        order: 'oh-no-not-an-order-toooo!',
      };

      const expectedVideoSlug = 'twist-round-brilliant-plain-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(
        twistBandVideoPropsWithMetalAndOrder
      );

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });

    it('ignores undefined omega product options being passed in', () => {
      const infinityBaguetteVideoProps = {
        slug: 'infinity-baguette-band',
        bandWidth: undefined,
        bandAccent: undefined,
        diamondType: undefined,
      };

      const expectedVideoSlug = 'infinity-baguette-band-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(
        infinityBaguetteVideoProps
      );

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });

    it('ignores unrelated video props being passed in', () => {
      const infinityBaguetteVideoProps = {
        slug: 'infinity-baguette-band',
        productHandle: 'who-passed-a-product-handle-into-here?!',
        productType: 'who-passed-a-product-type-into-here?!',
      };

      const expectedVideoSlug = 'infinity-baguette-band-yellow-gold-1';
      const actualVideoSlug = makeOmegaProductVideoSlug(
        infinityBaguetteVideoProps
      );

      expect(expectedVideoSlug).toEqual(actualVideoSlug);
    });
  });
  describe('addVideoSettings without crop', () => {
    const mockParams = {
      dpr: '5.0',
      height: '300',
      width: '300',
      crop: false,
    };

    const settings = `${addVideoSettings(mockParams)}`;
    const expectedString =
      'dpr_5.0,f_auto,fl_force_strip.lossy.progressive:semi,h_300,q_62:qmax_32,vc_auto,w_300';

    expect(settings).toEqual(expectedString);
  });

  describe('addVideoSettings with crop', () => {
    const mockParams = {
      dpr: '5.0',
      height: '300',
      width: '300',
      crop: true,
    };

    const settings = `${addVideoSettings(mockParams)}`;
    const expectedString =
      'c_crop,dpr_5.0,f_auto,fl_force_strip.lossy.progressive:semi,h_300,q_62:qmax_32,vc_auto,w_300';

    expect(settings).toEqual(expectedString);
  });

  describe('getVideoAttributes returns desktop values', () => {
    const videoSettings = {
      desktop: { crop: false, dpr: '5.0', height: '300', width: '300' },
      mobile: { no: true },
    };
    const windowWidth = 420;
    const attributes = getVideoAttributes(videoSettings, windowWidth);
    const expetectedAttributes = {
      crop: false,
      dpr: '5.0',
      height: '300',
      width: '300',
    };

    expect(attributes).toEqual(expetectedAttributes);
  });

  describe('getVideoAttributes returns mobile values', () => {
    const videoSettings = {
      mobile: { crop: false, dpr: '5.0', height: '300', width: '300' },
      desktop: { no: true },
    };
    const windowWidth = 300;
    const attributes = getVideoAttributes(videoSettings, windowWidth);
    const expetectedAttributes = {
      crop: false,
      dpr: '5.0',
      height: '300',
      width: '300',
    };

    expect(attributes).toEqual(expetectedAttributes);
  });

  describe('getVideoAttributes returns default desktop values', () => {
    const videoSettings = undefined;
    const windowWidth = 420;
    const attributes = getVideoAttributes(videoSettings, windowWidth);
    const expetectedAttributes = {
      crop: true,
      dpr: 'auto',
      height: '540',
      width: '960',
    };

    expect(attributes).toEqual(expetectedAttributes);
  });

  describe('getVideoAttributes returns default mobile values', () => {
    const videoSettings = undefined;
    const windowWidth = 300;
    const attributes = getVideoAttributes(videoSettings, windowWidth);
    const expetectedAttributes = {
      crop: true,
      dpr: '3.0',
      height: '210',
      width: '375',
    };

    expect(attributes).toEqual(expetectedAttributes);
  });

  describe('getVideoAttributes returns default crop value if missing in videoSettings', () => {
    const videoSettings = {
      mobile: { dpr: '5.0', height: '300', width: '300' },
      desktop: { no: true },
    };
    const windowWidth = 300;
    const attributes = getVideoAttributes(videoSettings, windowWidth);
    const expetectedAttributes = {
      crop: true,
      dpr: '5.0',
      height: '300',
      width: '300',
    };

    expect(attributes).toEqual(expetectedAttributes);
  });
});
