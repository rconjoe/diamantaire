import getEnvConfig from '../env';
import { MAX_MOCK_RINGS_ALLOWED } from '../helpers/constants';

const {
  ENGRAVING_VARIANT_ID,
  GIA_CERT_VARIANT_ID,
  DIAMOND_BUYBACK_VAIRANT_ID,
} = getEnvConfig();

export const CART_MAP = {
  bar: {
    checkoutText: 'Checkout',
    shippingText: 'Complimentary Shipping and Returns',
    termsText: 'I agree to the ',
    termsLinkText: 'Terms & Conditions',
    termsPostLinkText: '.',
  },
  priceArea: [
    { title: 'Subtotal', subTitle: ' (tax excl.)' },
    { title: 'Shipping', subTitle: '', price: 'Free' },
  ],
  certificates: {
    df: {
      handle: 'df',
      hint: null,
      name: 'Diamond Certificate',
      price: 'Included',
      info:
        'Each of our diamonds is graded by a certified gemologist and ' +
        'is accompanied by a detailed graded report. We fully guarantee ' +
        'each diamond in the form of a diamond certificate.',
    },
    gia: {
      handle: 'gia',
      hint: '(2-3 weeks)',
      name: 'GIA Lab Report',
      price: '$375',
      info:
        'If you choose this option, we first send your diamond to a GIA ' +
        'laboratory. GIA conducts the same analysis we do in-house and issue ' +
        'a report. GIA provides an independent third party view but does not ' +
        'guarantee any information on its lab report.',
      variantId: GIA_CERT_VARIANT_ID,
    },
  },
  engraving: {
    variantId: ENGRAVING_VARIANT_ID,
  },
  buyback: {
    variantId: DIAMOND_BUYBACK_VAIRANT_ID,
  },
  productSubtitleText: {
    isDiamond: 'Diamond',
    isBuybackProduct: 'Diamond Guarantee',
    isGroupedEngagementItem: 'Setting',
  },
  error: {
    DIAMOND_UNAVAILABLE: {
      message: 'The diamond you selected is no longer available.',
      linkText: 'Select a similar diamond',
      route: 'builderDynamicDiamond',
    },
  },
  mock: {
    header: {
      title: ` of ${MAX_MOCK_RINGS_ALLOWED} Sample Rings Selected`,
      pricing: '$50 Deposit',
    },
    sizeTextMap: {
      'Mock Wedding Band': 'Ring Size:',
      'Mock Engagement Ring': 'Carat Weight:',
      engagementRingOneSize: 'Ring Size: 7 (One Size)',
    },
  },
};
