import qs from 'querystring';

import { range } from 'lodash';

const IMAGE_CDN_BASE = 'https://images.vraiandoro.com';

export const OG_IMAGE_SQUARE_SIZE = '1200';
export const SEARCH_HIT_IMAGE_WIDTH = '640';

export const IMAGE_URL_OPTIONS_ORDER = [
  'slug',
  'diamondOrientation',
  'bandWidth',
  'diamondType',
  'sideStoneCarat',
  'bandAccent',
  'metal',
  'color',
];
// THis is used in 2.0 cannot change
const ENGAGEMENT_CAROUSEL_IMAGES_AMOUNT = {
  'Engagement Ring': 5,
  'Wedding Band': 4,
  'Mock Wedding Band': 4,
  'Mock Engagement Ring': 5,
};

const OMEGA_ENGAGEMENT_CAROUSEL_IMAGES_AMOUNT = {
  'Engagement Ring': 4,
  'Wedding Band': 4,
};

const APPROVED_IMGIX_PARAMS = [
  'w',
  'h',
  'auto',
  'q',
  'blur',
  'fit',
  'fm',
  'ar',
];

export const imageLoader = ({ src, width, quality = 25 }) => {
  const queryString = makeQueryString({
    auto: 'format',
    fit: 'crop',
    crop: 'focalpoint',
    q: quality,
    w: width,
  });

  return `${src}${queryString}`;
};

export const makeMobileProductSlideImage = (s3Key, imageParams = {}) => {
  const { ext = 'jpg' } = imageParams;
  const queryString = makeQueryString(imageParams);

  return `${IMAGE_CDN_BASE}/${encodeURIComponent(
    s3Key
  )}.${ext}${makeQueryString(queryString)}`;
};

export const makeDatoImageUrl = (image, imageParams = {}) => {
  const queryString = makeQueryString(imageParams);

  if (typeof image === 'object') {
    const { url } = image;

    return `${url}${queryString}`;
  }

  if (typeof image === 'string') {
    return `${image}${queryString}`;
  }

  return null;
};

export const makeDatoProductImageUrl = (
  url,
  imageParams = { ar: '1:1', fit: 'crop', q: 50 }
) => {
  return makeDatoImageUrl(url, imageParams);
};

export const cdnImageUrl = section => (...nameSegments) => (
  imageParams = {}
) => {
  const name = nameSegments.join('-');
  const { ext = 'jpg' } = imageParams;
  const queryString = makeQueryString(imageParams);

  return `${IMAGE_CDN_BASE}/${encodeURIComponent(section)}/${encodeURIComponent(
    name
  )}.${ext}${queryString}`;
};

const getApprovedImgixParams = imageParams => {
  const paramKeys = Object.keys(imageParams);

  const approvedImgixParams = paramKeys.reduce((acc, cur) => {
    if (APPROVED_IMGIX_PARAMS.includes(cur)) {
      acc[cur] = imageParams[cur];
    }

    return acc;
  }, {});

  return approvedImgixParams;
};

const makeQueryString = ({ noParams = false, quality = 25, ...rest }) => {
  if (noParams) {
    return '';
  }

  const approvedImgxParams = getApprovedImgixParams(rest);
  const params = {
    q: quality,
    ...approvedImgxParams,
  };

  if (!approvedImgxParams.fm) {
    params.auto = 'format';
  }

  return '?' + qs.stringify(params);
};

// MOOD IMAGES
//
export const makeMoodImageUrl = ({ isHero, moodName }) => {
  const quality = isHero ? 45 : 55;

  return cdnImageUrl('mood-images')(moodName)({ quality });
};

// ICON IMAGES
//
export const makeIconImageUrl = (s3Slug, ext = 'png') => {
  return cdnImageUrl('icons')(s3Slug)({ ext });
};

// DIAMOND IMAGES
//
const diamondImageUrl = cdnImageUrl('diamond-images');
const diamondImageV3Url = cdnImageUrl('diamond-images-v3');

export const makeDiamondHandUrl = () => diamondImageUrl('hand')({ ext: 'jpg' });
// TODO: remove makeUpdatedDiamondHandUrl and use makeDiamondHandUrl once diamond on hand is removed from diamond table
export const makeUpdatedDiamondHandUrl = () =>
  diamondImageUrl('hand-transparent')({ ext: 'png' });
export const makeDiamondPDPImageUrl = type =>
  diamondImageUrl(type.toLowerCase())({ ext: 'png' });

export const makeNewDiamondOnHandImageUrl = type => {
  const trim = '&trim-color=transparent&trim=color';

  return `${cdnImageUrl('diamond-images')(type.toLowerCase())({
    ext: 'png',
    quality: 60,
  }) + trim}`;
};

export const makeDiamondVariantImageUrl = (
  type,
  directory = 'diamond-images-v3'
) => {
  const trim = '&trim-color=transparent&trim=color';

  return `${cdnImageUrl(directory)(type.toLowerCase())({
    ext: 'png',
    quality: 60,
  }) + trim}`;
};

export const makeDiamondCartImageUrl = type => {
  const trim = `&ar=1:1&fit=crop`;

  return (
    diamondImageV3Url(type.toLowerCase(), 'background')({ ext: 'jpg' }) + trim
  );
};

export const makeDiamondSpriteImgUrl = lotId => {
  return `https://videos.diamondfoundry.com/${lotId}-thumb.jpg`;
};

// TESTIMONIAL IMAGES
//
export const makeTestimonialImageUrl = index =>
  makeContentImageUrl('testimonial', index);

// CONTENT IMAGES
//
export const makeContentImageUrl = (...nameSections) => {
  return cdnImageUrl('content-images')(...nameSections)({ quality: 40 });
};

export const make4CImageUrl = (...nameSections) => {
  return cdnImageUrl('content-images')(...nameSections)({
    quality: 40,
    ext: 'png',
  });
};

export const makeDiamondBuybackImageUrl = () => {
  return cdnImageUrl('content-images')('buyback-warranty')({ ext: 'png' });
};

export const makeGiftWithPurchaseImageUrl = () => {
  return cdnImageUrl('content-images')('gift-with-purchase')();
};

// SCHEMA IMAGES
//
const schemaImageUrl = cdnImageUrl('product-images');

export const makeSchemaImages = slug => {
  const [baseHeight, baseWidth] = [9, 7];
  const desiredAspectRatios = [
    [1, 1],
    [4, 3],
    [16, 9],
  ];

  const schemaImages = desiredAspectRatios.map(aspect => {
    const [height, width] = aspect;
    const imageParams = {
      fit: 'crop',
      w: 1,
      h: 1,

      // we give the highest quality to google
      quality: '100',
    };

    if (height === 1 && width === 1) {
      const ratioOfDesiredWidth = baseWidth / baseHeight;

      imageParams.w = ratioOfDesiredWidth;
    } else {
      const desiredHeight = (width * baseHeight) / height;
      const ratioOfDesiredHeight = desiredHeight / baseWidth;

      imageParams.h = ratioOfDesiredHeight;
    }

    return schemaImageUrl(slug, 'yellow-gold', 1)(imageParams);
  });

  return schemaImages;
};

export const makeOmegaSchemaImages = options => {
  const [baseHeight, baseWidth] = [9, 7];
  const desiredAspectRatios = [
    [1, 1],
    [4, 3],
    [16, 9],
  ];
  const optionsInOrder = getConfiguredProductOptionsInOrder(options);

  const schemaImages = desiredAspectRatios.map(aspect => {
    const [height, width] = aspect;
    const imageParams = {
      fit: 'crop',
      w: 1,
      h: 1,

      // we give the highest quality to google
      quality: '100',
    };

    if (height === 1 && width === 1) {
      const ratioOfDesiredWidth = baseWidth / baseHeight;

      imageParams.w = ratioOfDesiredWidth;
    } else {
      const desiredHeight = (width * baseHeight) / height;
      const ratioOfDesiredHeight = desiredHeight / baseWidth;

      imageParams.h = ratioOfDesiredHeight;
    }

    return omegaProductImageUrl(...optionsInOrder, 1)(imageParams);
  });

  return schemaImages;
};

// PRODUCT IMAGES
//
const productImageUrl = cdnImageUrl('product-images');

/**
 * https://developers.facebook.com/docs/sharing/best-practices#images
 * 1:1 for ads, 1.91:1 for social sharing
 * We are lucky that our product images have a solid color background
 * We can upload a 1:1 and FB will crop 1200x1200
 * to 1200x628 to match 1.91:1 as needed
 *
 * The other reason we want to do 1:1 is that other social platforms
 * use square images :)
 *
 * 1200 is picked as the preferred min width for FB
 *
 * There is a bug where query params are not parsed properly for FB OG tags
 * https://images.vraiandoro.com/product-images/the-emerald-yellow-gold-1.jpg?q=100&amp;fm=jpg&amp;fit=crop&amp;w=1200&amp;h=1200
 * Notice &amp; instead of just &
 */
const ogImageParams = {
  fm: 'jpg',
  fit: 'crop',
  w: OG_IMAGE_SQUARE_SIZE,
  h: OG_IMAGE_SQUARE_SIZE,

  // we give the highest quality to zuck
  quality: '100',
};

export const makeOGImageUrl = slug => {
  return productImageUrl(slug, 'yellow-gold', 1)(ogImageParams);
};

export const makeDatoOGImageUrl = url => {
  const queryString = makeQueryString(ogImageParams);

  return `${url}${queryString}`;
};

export const makeOmegaProductSlideImage = (options, imageIndex) => {
  const optionsInOrder = getConfiguredProductOptionsInOrder(options);

  return omegaProductImageUrl(...optionsInOrder, imageIndex)();
};

export const makeOmegaOGImageUrl = options => {
  const optionsInOrder = getConfiguredProductOptionsInOrder(options);

  return omegaProductImageUrl(...optionsInOrder, 1)(ogImageParams);
};

export const imageBandWidthHelper = bandwidth => {
  return bandwidth.replace('mm', '').replace('.', '-');
};

export const makeCertSealImageUrl = handle =>
  productImageUrl(handle, 'certificate-seal-1')();

export const makeBlurPlaceholderImageUrl = () => {
  const imageOptions = {
    color: 'platinum',
    slug: 'signature-prong',
    bandAccent: 'plain',
    diamondType: 'round-brilliant',
  };
  const optionsInOrder = getConfiguredProductOptionsInOrder(imageOptions);

  const imageParams = {
    quality: '25',
    w: '.05',
    blur: '90',
    ar: '1:1',
    fit: 'crop',
  };

  return omegaProductImageUrl(...optionsInOrder, 1)(imageParams);
};

export const makeOmegaEngagementProductCarouselUrls = ({
  productType,
  ...options
}) => {
  const productTypeLength = getOmegaProductLength({
    productType,
  });
  const carouselUrls = getCarouselUrls({
    productTypeLength,
    ...options,
  });

  return carouselUrls;
};

export const makeOmegaEngagementProductSquareCarouselUrls = ({
  productType,
  ...options
}) => {
  const productTypeLength = getOmegaProductLength({
    productType,
  });
  const carouselUrls = getSquareCarouselUrls({
    productTypeLength,
    ...options,
  });

  return carouselUrls;
};

export const getCarouselUrls = ({ productTypeLength, ...options }) => {
  const includeEndRange = productTypeLength + 1;
  const carouselUrls = range(1, includeEndRange).map(carouselOrder => {
    const optionsInOrder = getConfiguredProductOptionsInOrder(options);

    return omegaProductImageUrl(...optionsInOrder, carouselOrder)();
  });

  return carouselUrls;
};

export const getSquareCarouselUrls = ({ productTypeLength, ...options }) => {
  const includeEndRange = productTypeLength + 1;
  const carouselUrls = range(1, includeEndRange).map(carouselOrder => {
    const optionsInOrder = getConfiguredProductOptionsInOrder(options);

    return omegaProductImageUrl(
      ...optionsInOrder,
      carouselOrder
    )({ ar: '1:1', fit: 'crop' });
  });

  return carouselUrls;
};

export const omegaCdnImageUrl = section => (...optionsInOrder) => (
  imageParams = {}
) => {
  const [slug] = optionsInOrder;

  const options = optionsInOrder.map(sanitizeOptions).join('-');
  const { ext = 'jpg' } = imageParams;
  const queryString = makeQueryString(imageParams);

  return (
    `${IMAGE_CDN_BASE}/` +
    `${encodeURIComponent(section)}/` +
    `${encodeURIComponent(slug)}/` +
    `${encodeURIComponent(options)}.` +
    `${ext}${queryString}`
  );
};

export const sanitizeOptions = option => {
  return `${option}`.replace('.', '-');
};

export const omegaProductImageUrl = omegaCdnImageUrl('product-images');

export const makeEngagementProductCarouselUrls = ({
  productHandle,
  productType,
  color,
}) => {
  // TODO: switch over the components that pass through productHandle to use slug instead
  const normalizedProductHandle = normalizeMockProductSlug(productHandle);
  const productTypeLength = getProductLength({ productHandle, productType });
  const carouselUrls = [];

  for (let i = 1; i <= productTypeLength; i++) {
    const carouselUrl = productImageUrl(normalizedProductHandle, color, i)();

    carouselUrls.push(carouselUrl);
  }

  return carouselUrls;
};

export const makeOmegaCartProductImageUrl = ({
  isDiamond,
  diamondData,
  omegaVariantData: { slug, options },
}) => {
  const imageCarouselIndex = '1';
  const optionsWithSlug = { slug, ...options };
  const cartProductImage = () => {
    if (isDiamond) {
      return makeDiamondCartImageUrl(diamondData.type);
    }

    const optionsInOrder = getConfiguredProductOptionsInOrder(optionsWithSlug);

    return omegaProductImageUrl(...optionsInOrder, imageCarouselIndex)();
  };

  return cartProductImage();
};

const getConfiguredProductOptionsInOrder = options => {
  return IMAGE_URL_OPTIONS_ORDER.map(optionName => {
    return options[optionName];
  }).filter(Boolean);
};

// the handles that come through to makeCartProductImageUrl already have metal baked in
export const makeCartProductImageUrl = ({
  slug,
  isDiamond,
  isBuybackProduct,
  metal,
  diamondData,
}) => {
  let imageUrl;
  // For the Ring Setting Cart image, we always use the first index product image (diamond facing towards us)
  const normalizedProductSlug = normalizeMockProductSlug(slug);

  const imageCarouselIndex = '1';

  // TODO: clean this logic up
  if (isDiamond) {
    imageUrl = makeDiamondCartImageUrl(diamondData.type);
  } else if (isBuybackProduct) {
    imageUrl = makeDiamondBuybackImageUrl();
  } else {
    imageUrl = productImageUrl(
      normalizedProductSlug,
      metal,
      imageCarouselIndex
    )();
  }

  return imageUrl;
};

// THis is used in 2.0 cannot change
const getProductLength = ({ productHandle, productType }) => {
  // TODO: talk to Creative to get the 3rd picture, infinity is missing 1
  const isInfinityBand =
    productHandle === 'the-infinity-diamond-unisex-wedding-band';

  return isInfinityBand ? 2 : ENGAGEMENT_CAROUSEL_IMAGES_AMOUNT[productType];
};

const getOmegaProductLength = ({ productType }) => {
  return OMEGA_ENGAGEMENT_CAROUSEL_IMAGES_AMOUNT[productType];
};

// the-oval-sample -> the-oval
// the-oval-sample-yellow-gold -> the-oval
const normalizeMockProductSlug = slug => {
  return slug.split('-sample')[0];
};

export const makeSearchHitImageUrl = slug => {
  return productImageUrl(slug, 'yellow-gold', 1)({ w: SEARCH_HIT_IMAGE_WIDTH });
};
